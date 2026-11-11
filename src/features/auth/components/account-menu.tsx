"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogIn, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SIGN_IN_PATH, buildSignInHref } from "@/lib/auth-redirect";
import { cn } from "@/lib/utils";
import { authContent } from "../content/auth-content";
import { useCurrentUser } from "../hooks/use-current-user";
import { useSignOut } from "../hooks/use-sign-out";

type AccountMenuProps = {
  align?: "start" | "end";
  className?: string;
};

/**
 * Shows the reader who is signed in and lets them sign out. Signed-out
 * visitors get a quiet "Sign in" link that returns them to this page after
 * the Google handshake.
 */
export function AccountMenu(props: AccountMenuProps) {
  // The header lives in the root layout, so the pathname is not known while a
  // dynamic route is prerendered. The boundary keeps the rest of the shell
  // static and streams the control in once the URL is resolved.
  return (
    <Suspense fallback={<AccountMenuPlaceholder className={props.className} />}>
      <AccountMenuContent {...props} />
    </Suspense>
  );
}

function AccountMenuPlaceholder({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block h-11 w-10 md:w-24", className)}
    />
  );
}

function AccountMenuContent({ align = "end", className }: AccountMenuProps) {
  const pathname = usePathname();
  const { user, isPending } = useCurrentUser();
  const signOut = useSignOut();
  const copy = authContent.account;

  if (pathname === SIGN_IN_PATH) return null;

  // Reserve the control's footprint while the session check runs so the
  // header does not jump between signed-out and signed-in layouts.
  if (isPending) {
    return <AccountMenuPlaceholder className={className} />;
  }

  if (!user) {
    return (
      <Button
        asChild
        className={cn(
          "h-11 px-3 text-micro uppercase text-foreground/80",
          className,
        )}
        size="lg"
        variant="ghost"
      >
        <Link href={buildSignInHref(pathname)}>
          <LogIn aria-hidden className="size-3.5" />
          {copy.signInLabel}
        </Link>
      </Button>
    );
  }

  const initial = (user.name?.trim() || user.email).charAt(0).toUpperCase();
  const displayName = user.name?.trim() || user.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("h-11 max-w-full gap-2 px-2.5", className)}
          size="lg"
          variant="ghost"
        >
          {user.avatarUrl ? (
            <Image
              alt=""
              aria-hidden
              className="size-7 shrink-0 rounded-full object-cover"
              height={28}
              src={user.avatarUrl}
              unoptimized
              width={28}
            />
          ) : (
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-caption uppercase text-gold"
            >
              {initial}
            </span>
          )}
          <span className="sr-only">{copy.accountLabel}</span>
          <span className="hidden max-w-[11rem] truncate text-micro uppercase text-foreground/80 lg:inline">
            {displayName}
          </span>
          <ChevronDown
            aria-hidden
            className="size-3.5 shrink-0 text-muted-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-64">
        <DropdownMenuLabel className="text-micro uppercase tracking-[0.14em]">
          {copy.signedInAsLabel}
        </DropdownMenuLabel>
        <div className="px-1.5 pb-1.5">
          {user.name ? (
            <p className="truncate text-caption text-foreground">{user.name}</p>
          ) : null}
          <p
            className={cn(
              "truncate text-caption",
              user.name ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={signOut.isPending}
          onSelect={(event) => {
            event.preventDefault();
            signOut.mutate();
          }}
          variant="destructive"
        >
          <LogOut aria-hidden />
          {signOut.isPending ? copy.signingOutLabel : copy.signOutLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
