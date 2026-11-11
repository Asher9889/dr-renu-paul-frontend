import { Suspense } from "react";

import { SignInFallback, SignInPage } from "@/features/auth";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInRoute() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInPage />
    </Suspense>
  );
}
