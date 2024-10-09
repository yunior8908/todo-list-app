import LogoutForm from "@/components/logout-form";
import { createClient } from "@/lib/supabase";

import SwitchAuthForms from "@/components/switch-auth-forms";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const isNotAuthenticated = Boolean(!data?.user || error);

  return (
    <div>
      {!isNotAuthenticated ? (
        <LogoutForm username={data?.user?.email as string} />
      ) : null}

      <div className="max-w-screen-md mx-auto py-8 grid">
        <div className="w-[400px] mx-auto">
          {isNotAuthenticated ? <SwitchAuthForms /> : null}
        </div>
        {!isNotAuthenticated ? children : null}
      </div>
    </div>
  );
}
