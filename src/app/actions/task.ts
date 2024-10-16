"use server";
import "server-only";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createTask(prevState: object, formData: FormData) {
  const description = formData.get("text") as string;
  const owner = formData.get("owner") as string;
  const parent = formData.get("parent") as string;

  const supabase = createClient();

  const { data, error } = await supabase.from("todo-tb").insert({
    description,
    completed: false,
    active: false,
    owner,
    parent: parent ? parent : null,
  });

  if (!error) {
    revalidatePath("/");
  }

  return {
    data: error ? null : data,
    error: error ? { general: error?.message } : null,
  };
}

export async function updateTask(prevState: object, formData: FormData) {
  const id = formData.get("id") as string;
  const completed = formData.get("completed") as string;
  const active = formData.get("active") as string;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("todo-tb")
    .update({
      completed: completed === "true" ? true : false,
      active: active === "true" ? true : false,
    })
    .eq("id", parseInt(id));

  if (!error) {
    revalidatePath("/");
  }

  return {
    data: error ? null : data,
    error: error ? { general: error?.message } : null,
  };
}

export async function deleteTask(prevState: object, formData: FormData) {
  const id = formData.get("id") as string;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("todo-tb")
    .update({ deprecated: true })
    .eq("id", parseInt(id));

  if (!error) {
    revalidatePath("/");
  }

  return {
    data: error ? null : data,
    error: error ? { general: error?.message } : null,
  };
}
