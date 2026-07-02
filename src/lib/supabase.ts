import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const missing = [
  !url && "VITE_SUPABASE_URL",
  !key && "VITE_SUPABASE_ANON_KEY",
].filter(Boolean) as string[];

// Non-null when env vars are absent — AuthGate renders a blocking error screen.
export const supabaseConfigError: string | null =
  missing.length > 0
    ? `Missing environment variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`
    : null;

export const supabase = !supabaseConfigError
  ? createClient(url!, key!, {
      auth: {
        detectSessionInUrl: true,
        // Implicit flow: Supabase returns #access_token=… in the URL fragment
        // after the Google OAuth callback. No code_challenge is sent so there
        // is no PKCE state to lose — this fixes the "OAuth state parameter
        // missing" error caused by PKCE mode's code_challenge confusing GoTrue.
        flowType: "implicit",
      },
    })
  : null;

if (supabase) {
  console.log("[supabase] client created — url:", url, "| detectSessionInUrl: true | flowType: implicit");
} else {
  console.warn("[supabase] client NOT created — missing env vars:", missing);
}

export async function signOut() {
  await supabase?.auth.signOut();
}
