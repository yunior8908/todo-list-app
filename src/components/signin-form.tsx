"use client";

import { useFormState } from "react-dom";

import { motion } from "framer-motion";

import { signInWithEmail } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { FORM_ACTION_RESULT } from "@/lib/constants";
import { SetStateType } from "@/lib/types";
import SubmitButton from "@/components/ui/submit-button";
export default function LoginPage({
  setPage,
}: {
  setPage: SetStateType<string>;
}) {
  const [, dispatch] = useFormState(signInWithEmail, FORM_ACTION_RESULT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form
        action={dispatch}
        className="grid gap-4 h-fit mb-8"
        autoComplete="off"
      >
        <h1 className="text-4xl font-bold text-gray-800">SignIn</h1>
        <Input
          type="email"
          placeholder="email"
          name="email"
          className="max-w-md"
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          className="max-w-md"
        />
        <div className="flex gap-4 justify-between">
          <SubmitButton
            type="submit"
            className="bg-black text-white font-bold py-2 px-4 w-fit rounded transition-all duration-300"
          >
            {(pending) => (pending ? "Loading..." : "Login")}
          </SubmitButton>

          <button
            className="underline text-sm h-fit underline-offset-2 text-blue-700"
            onClick={() => setPage("sign-up")}
          >
            <strong>Sign Up</strong>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
