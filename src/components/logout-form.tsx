"use client";
import { useFormState } from "react-dom";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";

export default function LogoutForm({ username }: { username: string }) {
  const router = useRouter();

  const [, dispatch] = useFormState(async () => {
    await signOut();
    router.push("/");
  }, null);

  return (
    <form
      action={dispatch}
      className="sticky top-0 flex justify-between items-center mb-6 p-2 border-b shadow-sm bg-white z-10"
    >
      <h2 className="font-semibold text-gray-700">Welcome, {username}!</h2>
      <Button
        type="submit"
        variant="outline"
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </form>
  );
}
