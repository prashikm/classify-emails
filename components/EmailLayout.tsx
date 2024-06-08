"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";
import EmailCard from "./EmailCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { classifyMails, getMails } from "@/app/(home)/emails/action";

interface Mail {
  id: string;
  sender: string;
  snippet: string;
  body: string;
  tag: string | null;
}

export default function EmailLayout() {
  const [isClassifying, setIsClassifying] = useState(false);
  const [isMailFetching, setIsMailFetching] = useState(false);
  const [mails, setMails] = useState<Mail[]>([]);

  useEffect(() => {
    const mails = JSON.parse(localStorage.getItem("mails") ?? "[]");
    setMails(mails);
  }, []);

  async function fetchMails(limit: number) {
    if (isMailFetching) {
      return;
    }

    setIsMailFetching(true);

    try {
      const mails = await getMails(limit);
      localStorage.setItem("mails", JSON.stringify(mails));

      if (typeof mails !== "undefined") {
        setMails(mails);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsMailFetching(false);
    }
  }

  async function handleClassifyMails() {
    const apiKey = localStorage.getItem("geminiKey");

    if (!apiKey) {
      return toast.error("Gemini API key is not set");
    }

    if (!mails) {
      return toast.error("No mails to classify");
    }

    setIsClassifying(true);

    try {
      const classifiedMails = await classifyMails(apiKey, mails);

      localStorage.setItem("mails", JSON.stringify(classifiedMails));

      if (typeof classifiedMails !== "undefined") {
        setMails(classifiedMails);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsClassifying(false);
    }
  }

  if (isMailFetching) {
    return <div className="text-center mt-10">Fetching mails...</div>;
  }

  return (
    <div>
      <section className="mt-10 flex items-center justify-between">
        <div>
          <Select onValueChange={(value) => fetchMails(parseInt(value))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Emails" />
            </SelectTrigger>
            <SelectContent className="w-[140px]">
              <SelectItem value="3">last 3 emails</SelectItem>
              <SelectItem value="7">last 7 emails</SelectItem>
              <SelectItem value="14">last 14 emails</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={handleClassifyMails} disabled={isClassifying}>
            {isClassifying && (
              <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
            )}
            Classify
          </Button>
        </div>
      </section>
      <section className="mt-10 space-y-6">
        {!mails.length ? (
          isMailFetching ? (
            <p>Fetching mails...</p>
          ) : (
            <p>No mails found</p>
          )
        ) : null}

        {mails.length !== 0 && (
          <>
            {mails.map((mail, index) => (
              <EmailCard
                key={mail.id}
                id={mail.id}
                sender={mail.sender}
                snippet={mail.snippet}
                tag={mail.tag}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
