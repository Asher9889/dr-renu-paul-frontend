"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  resolveAuthRedirect,
  withoutQuery,
} from "@/lib/auth-redirect";
import { authContent } from "../content/auth-content";
import { useCurrentUser } from "../hooks/use-current-user";
import { buildGoogleSignInHref } from "../lib/google-sign-in-href";
import { GoogleMark } from "./google-mark";
import { SignInFallback } from "./sign-in-fallback";

export function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isPending } = useCurrentUser();

  const copy = authContent.signIn;
  const redirectParam = searchParams.get("redirect");
  const redirectTo = resolveAuthRedirect(redirectParam);
  const hasReturnPath = Boolean(redirectParam) && redirectTo !== "/";
  const backHref = hasReturnPath ? withoutQuery(redirectTo) : "/books";
  const backLabel = hasReturnPath
    ? copy.backToReaderLabel
    : copy.browseBooksLabel;
  const oauthError = searchParams.get("error");

  useEffect(() => {
    if (user) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router, user]);

  if (isPending || user) {
    return <SignInFallback />;
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 md:py-24">
      <div className="w-full max-w-md border border-border bg-card p-8 md:p-10">
        <p className="text-micro uppercase tracking-[0.14em] text-gold">
          {copy.eyebrow}
        </p>
        <h1 className="mt-5 font-display text-subheading leading-tight text-balance">
          {copy.title}
        </h1>
        <p className="mt-3 text-caption leading-relaxed text-muted-foreground">
          {copy.description}
        </p>

        {oauthError ? (
          <p
            className="mt-6 border border-destructive/40 bg-destructive/5 px-3 py-2 text-caption text-destructive"
            role="alert"
          >
            {copy.errorDescription}
          </p>
        ) : null}

        <Button
          asChild
          className="mt-8 h-12 w-full text-micro uppercase"
          size="lg"
        >
          <a href={buildGoogleSignInHref(redirectTo)}>
            <GoogleMark className="size-4" />
            {copy.googleLabel}
          </a>
        </Button>

        <div className="mt-4 flex items-start gap-3 border border-gold/35 bg-gold/5 p-3">
          <LockKeyhole
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-gold"
          />
          <p className="text-caption text-muted-foreground">{copy.note}</p>
        </div>

        <Separator className="my-6" />

        <Link
          className="inline-flex items-center gap-2 text-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
          href={backHref}
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          {backLabel}
        </Link>
      </div>
    </main>
  );
}
