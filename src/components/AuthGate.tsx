import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, supabaseConfigError } from "@/lib/supabase";

const ALLOWLIST = ["chprengaman@gmail.com", "chloeprengaman@gmail.com"];

type Status = "loading" | "authed" | "unauthed" | "denied";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;

    // ── mount diagnostics ────────────────────────────────────────────────────
    const href = typeof window !== "undefined" ? window.location.href : "(SSR)";
    const params =
      typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";

    const hasCode = params?.has("code") ?? false;
    // Implicit flow: Supabase returns tokens in the URL fragment, not query params
    const hasAccessToken = hash.includes("access_token");
    const oauthError = params?.get("error") ?? null;
    const oauthErrorDesc = params?.get("error_description") ?? null;

    console.log("[auth] AuthGate mounted");
    console.log("[auth] window.location.href:", href);
    console.log("[auth] URL contains ?code=:", hasCode);
    console.log("[auth] URL hash contains #access_token=:", hasAccessToken);

    if (oauthError) {
      console.error(
        "[auth] OAuth error param in URL — error:", oauthError,
        "| description:", oauthErrorDesc,
      );
    }

    function resolve(u: User | null) {
      const email = u?.email ?? null;
      const allowed = email ? ALLOWLIST.includes(email) : false;
      console.log("[auth] resolve — email:", email, "in allowlist:", allowed);
      setUser(u);
      setStatus(!u ? "unauthed" : allowed ? "authed" : "denied");
    }

    // getSession() returns the locally cached session immediately. On an OAuth
    // callback this is usually null until Supabase's detectSessionInUrl exchange
    // completes, at which point SIGNED_IN fires via onAuthStateChange below.
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log("[auth] getSession result — session:", !!session, "email:", session?.user?.email ?? null);
      if (error) console.error("[auth] getSession error:", error.message);
      resolve(session?.user ?? null);
    });

    // onAuthStateChange covers every transition including the automatic PKCE
    // code exchange that fires SIGNED_IN after detectSessionInUrl processes
    // the ?code= query param.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[auth] onAuthStateChange — event:", event, "session:", !!session, "email:", session?.user?.email ?? null);
      if (event === "SIGNED_IN" && typeof window !== "undefined") {
        // Implicit flow: clean up #access_token fragment from URL
        if (window.location.hash.includes("access_token")) {
          console.log("[auth] cleaning up #access_token from URL hash");
          window.history.replaceState({}, "", "/");
        }
        // PKCE flow (fallback): clean up ?code= query param
        if (window.location.search.includes("code=")) {
          console.log("[auth] cleaning up ?code= from URL");
          window.history.replaceState({}, "", "/");
        }
      }
      resolve(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (supabaseConfigError) return <ConfigErrorScreen message={supabaseConfigError} />;
  if (status === "loading") return <LoadingScreen />;
  if (status === "unauthed") return <SignInScreen />;
  if (status === "denied") return <DeniedScreen user={user!} />;
  return <>{children}</>;
}

// ── Config error (missing env vars) ──────────────────────────────────────────

function ConfigErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noir px-6">
      <div className="w-full max-w-[380px]">
        <p className="folio mb-8 flex items-center justify-center gap-4 text-bone-dim">
          <span className="h-px w-10 bg-saffron/50" />
          Configuration Error
          <span className="h-px w-10 bg-saffron/50" />
        </p>

        <h2 className="text-center font-display text-3xl font-medium text-bone">
          Auth not configured
        </h2>

        <p className="mt-4 text-center text-sm text-bone-dim">{message}</p>

        <div className="brass-rule mx-auto mt-8 h-px" />

        <div className="mt-6 rounded-xl border border-bone/10 bg-graphite px-4 py-3 font-mono text-xs leading-relaxed">
          <p className="mb-1 text-bone-dim/50"># .env.local</p>
          <p className="text-saffron">VITE_SUPABASE_URL<span className="text-bone-dim">=https://…supabase.co</span></p>
          <p className="text-saffron">VITE_SUPABASE_ANON_KEY<span className="text-bone-dim">=eyJ…</span></p>
        </div>

        <p className="mt-5 text-center text-xs text-bone-dim/50">
          Restart the dev server after adding variables.
        </p>
      </div>
    </div>
  );
}

// ── Loading ───────────────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-noir">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-saffron/20 border-t-saffron" />
    </div>
  );
}

// ── Sign-in ───────────────────────────────────────────────────────────────────

async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/`;
  console.log("[auth] signInWithOAuth — provider: google, redirectTo:", redirectTo);

  // skipBrowserRedirect: true lets us log the authorize URL before leaving.
  const { data, error } = await supabase!.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, skipBrowserRedirect: true },
  });

  if (error) {
    console.error("[auth] signInWithOAuth error:", error.message);
    return;
  }

  if (data?.url) {
    // Log safe parts of the authorize URL (no tokens — just structural params)
    try {
      const u = new URL(data.url);
      console.log("[auth] authorize URL host:", u.host);
      console.log("[auth] authorize URL pathname:", u.pathname);
      console.log("[auth] authorize URL params:", {
        provider: u.searchParams.get("provider"),
        has_redirect_to: u.searchParams.has("redirect_to"),
        redirect_to_value: u.searchParams.get("redirect_to"),
        has_code_challenge: u.searchParams.has("code_challenge"),
        has_response_type: u.searchParams.has("response_type"),
        response_type: u.searchParams.get("response_type"),
      });
    } catch {
      console.log("[auth] authorize URL (raw):", data.url.slice(0, 80) + "…");
    }
    console.log("[auth] redirecting to Supabase authorize...");
    window.location.assign(data.url);
  } else {
    console.warn("[auth] signInWithOAuth returned no URL");
  }
}

function SignInScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noir px-6">
      <div className="w-full max-w-[320px]">
        <p className="folio mb-10 flex items-center justify-center gap-4 text-bone-dim">
          <span className="h-px w-10 bg-saffron/50" />
          Private Collection
          <span className="h-px w-10 bg-saffron/50" />
        </p>

        <h1 className="text-center font-display text-[56px] font-medium leading-[0.9] tracking-[-0.025em] text-bone">
          Household
          <br />
          Library
        </h1>

        <p className="mt-5 text-center text-sm text-bone-dim">
          Chase & Chloe's personal food journal
        </p>

        <div className="brass-rule mx-auto mt-8 h-px" />

        <button
          onClick={signInWithGoogle}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-bone/15 bg-graphite px-5 py-4 font-medium text-bone transition-all hover:border-bone/30 hover:bg-slate active:scale-[0.98]"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-xs text-bone-dim/50">
          Access is restricted to household members
        </p>
      </div>
    </div>
  );
}

// ── Denied ────────────────────────────────────────────────────────────────────

async function signOut() {
  await supabase?.auth.signOut();
}

function DeniedScreen({ user }: { user: User }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noir px-6">
      <div className="w-full max-w-[320px] text-center">
        <p className="folio mb-8 flex items-center justify-center gap-4 text-bone-dim">
          <span className="h-px w-10 bg-saffron/50" />
          Access Denied
          <span className="h-px w-10 bg-saffron/50" />
        </p>

        <h2 className="font-display text-3xl font-medium text-bone">
          This household library is private.
        </h2>

        <p className="mt-4 text-sm text-bone-dim">
          Signed in as <span className="text-bone">{user.email}</span>
        </p>

        <div className="brass-rule mx-auto mt-8 h-px" />

        <button
          onClick={signOut}
          className="mt-8 flex w-full items-center justify-center rounded-2xl border border-bone/15 bg-graphite px-5 py-3.5 text-sm font-medium text-bone-dim transition-colors hover:text-bone"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Google G icon (official brand colors) ─────────────────────────────────────

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.124-.842 2.078-1.796 2.717v2.258h2.908C16.618 14.013 17.64 11.705 17.64 9.2z"
        fill="#4285F4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.861-3.048.861-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
