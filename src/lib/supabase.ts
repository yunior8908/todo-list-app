import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_PROJECT_ORGANIZATION_URL = process.env
  .SUPABASE_PROJECT_ORGANIZATION_URL as string;

const SUPABASE_PROJECT_ORGANIZATION_TOKEN = process.env
  .SUPABASE_PROJECT_ORGANIZATION_TOKEN as string;

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    SUPABASE_PROJECT_ORGANIZATION_URL,
    SUPABASE_PROJECT_ORGANIZATION_TOKEN,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
