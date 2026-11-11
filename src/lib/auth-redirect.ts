export const SIGN_IN_PATH = "/login";

const fallbackRedirect = "/";

/**
 * Builds the sign-in address and remembers where the reader should return to.
 */
export function buildSignInHref(returnTo: string): string {
  return `${SIGN_IN_PATH}?redirect=${encodeURIComponent(returnTo)}`;
}

/**
 * Only same-origin paths are accepted after sign-in. Anything else (absolute
 * URLs, protocol-relative URLs, backslash tricks, the sign-in page itself)
 * falls back to the home page.
 */
export function resolveAuthRedirect(value: string | null | undefined): string {
  if (!value) return fallbackRedirect;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallbackRedirect;
  }
  if (value === SIGN_IN_PATH || value.startsWith(`${SIGN_IN_PATH}?`)) {
    return fallbackRedirect;
  }
  return value;
}

/**
 * Drops the query string from a return path so "go back" never re-triggers
 * the action that sent the reader to sign in.
 */
export function withoutQuery(path: string): string {
  const queryIndex = path.indexOf("?");
  return queryIndex === -1 ? path : path.slice(0, queryIndex);
}
