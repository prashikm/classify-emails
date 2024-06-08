"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signInWithGoogle } from "../app/actions";
import { Loader2Icon } from "lucide-react";

export default function GetStarted() {
  const [aiKey, setAiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localApiKey = localStorage.getItem("geminiKey");
    if (localApiKey) {
      setAiKey(localApiKey);
    }
  }, []);

  async function handleSignIn() {
    if (!aiKey.length) {
      return toast.error("Please add your Gemini API Key");
    } else {
      localStorage.setItem("geminiKey", aiKey);
    }

    setIsLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error("Error signing in with Google");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="aiKey">Gemini API Key</Label>
        <Input
          type="password"
          id="aiKey"
          placeholder="Your Gemini API Key"
          className="mt-1 w-full"
          defaultValue={aiKey}
          onChange={(e) => setAiKey(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          className="w-full"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading && <Loader2Icon className="animate-spin h-4 w-4 mr-2" />}
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
