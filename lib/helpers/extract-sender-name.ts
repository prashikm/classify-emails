export function extractSenderName(message: any) {
  const fromHeader = message.payload.headers.find(
    (header: any) => header.name.toLowerCase() === "from"
  );

  if (fromHeader) {
    const fromValue = fromHeader.value;
    const emailRegex = /<(.+)>/;
    const match = fromValue.match(emailRegex);

    if (match) {
      const senderName = fromValue.replace(match[0], "").trim();
      return senderName;
    } else {
      return fromValue;
    }
  }

  return "Unknown";
}
