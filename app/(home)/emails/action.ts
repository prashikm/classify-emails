"use server";

import { gmail_v1, google } from "googleapis";
import { auth } from "@/auth";
import { generateText } from "ai";
import { getPlainTextBody } from "@/lib/helpers/get-plain-text-body";
import { extractSenderName } from "@/lib/helpers/extract-sender-name";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Session } from "next-auth";

interface UserSession extends Session {
  accessToken: string;
}

interface Mail {
  id: string;
  body: string;
  sender: string;
  snippet: string;
  tag: string | null;
}

export async function getMails(limit: number) {
  if (!limit || limit < 1 || limit > 14) {
    throw new Error("Invalid limit: limit must be between 1 and 14");
  }

  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const googleAuth = new google.auth.OAuth2();
  googleAuth.setCredentials({
    access_token: (session as UserSession).accessToken,
  });
  const gmail = google.gmail({ version: "v1", auth: googleAuth });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: limit,
    });

    if (!response.data.messages) {
      return [];
    }

    const mails = fetchMails(gmail, response.data);
  } catch (error) {
    throw new Error("Error getting mails");
  }
}

async function fetchMails(
  gmail: gmail_v1.Gmail,
  data: gmail_v1.Schema$ListMessagesResponse
): Promise<Mail[]> {
  if (!data.messages) {
    throw new Error("messages is not set");
  }

  let mails: Mail[] = [];

  for (const message of data.messages) {
    const mail = await gmail.users.messages.get({
      userId: "me" as string,
      id: message.id!,
    });

    const plainTextBody = getPlainTextBody(mail.data);
    const senderName = extractSenderName(mail.data);

    mails.push({
      id: message.id!,
      body: plainTextBody,
      sender: senderName,
      snippet: mail.data.snippet!,
      tag: null,
    });
  }

  return mails;
}

export async function classifyMails(
  GEMINI_API_KEY: string,
  mails: Mail[]
): Promise<Mail[]> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  if (!mails.length) {
    throw new Error("mails is not set");
  }

  const google = createGoogleGenerativeAI({
    apiKey: GEMINI_API_KEY,
  });

  const classifiedMails: Mail[] = [];

  for (const mail of mails) {
    const cleanText = mail.body.replace(/\s+/g, " ").trim();

    const { text } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      system: `Email Classification Instructions:
    1. Important: Emails that are personal or work-related and require immediate attention.
    2. Promotions: Emails related to sales, discounts, and marketing campaigns.
    3. Social: Emails from social networks, friends, and family.
    4. Marketing: Emails related to marketing, newsletters, and notifications.
    5. Spam: Unwanted or unsolicited emails.
    6. General: If none of the above categories are matched, classify the email as General.

    Classes: ['important', 'promotions', 'social', 'marketing', 'spam', 'general']

    Task: Classify the given email text into one of the above classes. Return only the class name.
    `,
      prompt: `Text: ${cleanText}`,
      maxTokens: 64,
    });

    classifiedMails.push({
      ...mail,
      tag: text.trim(),
    });
  }

  return classifiedMails;
}
