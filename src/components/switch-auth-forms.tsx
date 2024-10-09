"use client";
import { useState } from "react";

import LoginPage from "@/components/signin-form";
import SignUpPage from "@/components/signup-form";

export default function SwitchAuthForms() {
  const [page, setPage] = useState("sign-in");

  return (
    <>
      {page === "sign-in" ? <LoginPage setPage={setPage} /> : null}
      {page === "sign-up" ? <SignUpPage setPage={setPage} /> : null}
    </>
  );
}
