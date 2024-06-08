import { JSDOM } from "jsdom";

export function getPlainTextBody(message: any) {
  let plainTextBody = "";

  if (message.payload.parts) {
    message.payload.parts.forEach((part: any) => {
      if (part.mimeType === "text/plain") {
        plainTextBody = Buffer.from(part.body.data, "base64").toString("utf-8");
      } else if (part.mimeType === "text/html" && plainTextBody === "") {
        const html = Buffer.from(part.body.data, "base64").toString("utf-8");
        const root = new JSDOM(html);
        plainTextBody = root.window.document.body.textContent!;
      }
    });
  } else if (message.payload.body.data) {
    const mimeType = message.payload.mimeType;
    const data = message.payload.body.data;

    if (mimeType === "text/plain") {
      plainTextBody = Buffer.from(data, "base64").toString("utf-8");
    } else if (mimeType === "text/html") {
      const html = Buffer.from(data, "base64").toString("utf-8");
      const root = new JSDOM(html);
      plainTextBody = root.window.document.body.textContent!;
    }
  }

  return plainTextBody;
}
