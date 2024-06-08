"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [aiKey, setAiKey] = useState("");

  useEffect(() => {
    const localApiKey = localStorage.getItem("geminiKey");
    if (localApiKey) {
      setAiKey(localApiKey);
    }
  }, []);

  function handleUpdateApiKey() {
    if (!aiKey.length) {
      return toast.error("Please add your Gemini API Key");
    }

    localStorage.setItem("geminiKey", aiKey);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogTitle>Your Gemini API Key</DialogTitle>
        <div>
          <Input
            type="password"
            id="aiKey"
            placeholder="Your Gemini API Key"
            className="mt-1 w-full"
            defaultValue={aiKey}
            onChange={(e) => setAiKey(e.target.value)}
          />
        </div>
        <div className="text-end">
          <Button onClick={handleUpdateApiKey}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
