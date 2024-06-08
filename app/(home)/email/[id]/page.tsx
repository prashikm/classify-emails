"use client";

import { getClass } from "@/lib/helpers/get-tag";
import { useEffect, useState } from "react";

export default function Email({ params }: { params: { id: string } }) {
  const [mail, setMail] = useState(null);

  useEffect(() => {
    const mails = JSON.parse(localStorage.getItem("mails"));
    const foundMail = mails.find((m) => m.id === params.id);
    setMail(foundMail);
  }, [params.id]);

  if (!mail) {
    return <div className="mt-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-semibold">{mail.sender}</h1>
      {getClass(mail.tag)}
      <p className="mt-4">{mail.body}</p>
    </div>
  );
}
