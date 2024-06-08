import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyRoundIcon, LogOutIcon, MoreHorizontal } from "lucide-react";
import { auth, signOut } from "@/auth";
import { DialogTrigger } from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import Modal from "@/components/Modal";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="max-w-2xl mx-auto mt-14 mb-32 px-4">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm">{session.user.email}</p>
          </div>
        </div>

        <div>
          <Modal>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <DialogTrigger>
                    <KeyRoundIcon className="h-4 w-4 mr-3" /> Gemini Key
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon className="h-4 w-4 mr-3" />
                  <form
                    action={async () => {
                      "use server";
                      await signOut({
                        redirectTo: process.env.SIGN_OUT_REDIRECT_URI,
                      });
                    }}
                  >
                    <button type="submit">Sign out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Modal>
        </div>
      </section>

      {children}
    </main>
  );
}
