import { apiEndpoints } from "@/config/apiEndPoints";
import envConfig from "@/config/envConfig";

/**
 * Full-page address for the backend Google handshake. The backend stores the
 * return path in a signed state cookie and redirects back after consent.
 */
export function buildGoogleSignInHref(returnTo: string): string {
  const baseURL = envConfig.baseURL.replace(/\/+$/, "");
  const params = new URLSearchParams({ redirect: returnTo });

  return `${baseURL}${apiEndpoints.auth.google.path}?${params.toString()}`;
}
