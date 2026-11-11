import { Loader2 } from "lucide-react";

import { authContent } from "../content/auth-content";

/**
 * Quiet loading state shared by the route fallback and the session check on
 * the sign-in screen.
 */
export function SignInFallback() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <p className="flex items-center gap-3 text-caption text-muted-foreground">
        <Loader2 aria-hidden className="size-4 animate-spin text-gold" />
        {authContent.signIn.sessionLabel}
      </p>
    </main>
  );
}
