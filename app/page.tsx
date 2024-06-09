import { auth } from "@/auth";
import GetStarted from "@/components/GetStarted";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/emails");
  }

  return (
    <main className="max-w-md mx-auto mt-20 px-4">
      <div className="border rounded-md shadow-sm px-6 py-10 bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to ClassifyEmails!</h1>
          <p className="mt-2 text-slate-600">
            To get started add your Gemini AI API key, if already added then no
            worries, just sign in with Google.
          </p>
        </div>

        <GetStarted />
      </div>
    </main>
  );
}
