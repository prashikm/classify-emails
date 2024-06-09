"use client";

import { getClass } from "@/lib/helpers/get-tag";
import { useEffect, useState } from "react";

interface Mail {
  id: string;
  sender: string;
  subject: string;
  body: string;
  tag: string | null;
}

export default function Email({ params }: { params: { id: string } }) {
  const [mail, setMail] = useState<Mail | null>(null);

  useEffect(() => {
    const mails = JSON.parse(localStorage.getItem("mails") ?? "[]");
    const foundMail = mails.find((m: Mail) => m.id === params.id);
    setMail(foundMail || null);
  }, [params.id]);

  if (!mail) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-semibold">{mail.sender}</h1>
      {getClass(mail.tag)}
      <p className="mt-4" style={{ whiteSpace: "pre-line" }}>
        {mail.body}
      </p>
    </div>
  );
}
