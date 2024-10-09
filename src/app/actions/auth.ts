"use server";

import "server-only";

import { createClient } from "@/lib/supabase";

const PAGE_URL = process.env.PAGE_URL as string;

export async function signUpNewUser(prevState: object, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return {
      data: null,
      error: {
        email: "Email is required",
        password: "Password is required",
        confirmPassword: "Confirm password is required",
      },
    };
  }

  if (password !== confirmPassword) {
    return {
      data: null,
      error: { password: "Passwords do not match" },
    };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: PAGE_URL },
  });

  return {
    data: error ? null : data,
    error: error ? { general: error?.message } : null,
  };
}

export async function signInWithEmail(prevState: object, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      data: null,
      error: {
        email: "Email is required",
        password: "Password is required",
      },
    };
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    data: error ? null : data,
    error: error ? { general: error?.message } : null,
  };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  return {
    error: error ? { general: error?.message } : null,
  };
}

// async function resetPassword() {
//   const supabase = createClient();
//   await supabase.auth.resetPasswordForEmail("hello@example.com", {
//     redirectTo: "http://example.com/account/update-password",
//   });

//   /// await supabase.auth.updateUser({ password: new_password })
// }
