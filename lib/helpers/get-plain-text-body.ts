import { JSDOM } from "jsdom";

export function getPlainTextBody(message: any) {
  let plainTextBody = "";

  if (message.payload.parts) {
    // Message body is in multiple parts
    message.payload.parts.forEach((part) => {
      if (part.mimeType === "text/plain") {
        plainTextBody = Buffer.from(part.body.data, "base64").toString("utf-8");
      } else if (part.mimeType === "text/html" && plainTextBody === "") {
        // Extract text from HTML if no plain text part is found
        const html = Buffer.from(part.body.data, "base64").toString("utf-8");
        const root = new JSDOM(html);
        plainTextBody = root.window.document.body.textContent;
      }
    });
  } else if (message.payload.body.data) {
    // Message body is not in multiple parts
    const mimeType = message.payload.mimeType;
    const data = message.payload.body.data;

    if (mimeType === "text/plain") {
      plainTextBody = Buffer.from(data, "base64").toString("utf-8");
    } else if (mimeType === "text/html") {
      // Extract text from HTML
      const html = Buffer.from(data, "base64").toString("utf-8");
      const root = new JSDOM(html);
      plainTextBody = root.window.document.body.textContent;
    }
  }

  return plainTextBody;
}
