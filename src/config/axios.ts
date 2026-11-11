import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { apiEndpoints } from "@/config/apiEndPoints";
import envConfig from "@/config/envConfig";

const apiClient = axios.create({
  baseURL:
    typeof window === "undefined" ? envConfig.serverBaseURL : envConfig.baseURL,
  // Reader access and guest purchases are tied to httpOnly cookies, so the
  // browser must send credentials even when the API is on another origin.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  hasRetried?: boolean;
};

const sessionRequestPaths: string[] = [
  apiEndpoints.auth.login.path,
  apiEndpoints.auth.refresh.path,
  apiEndpoints.auth.logout.path,
  // A 401 from the session check means the visitor is signed out, not that an
  // access token expired, so refreshing would only fail again.
  apiEndpoints.auth.me.path,
];

let refreshRequest: Promise<void> | null = null;

/**
 * Exchanges the httpOnly refresh cookie for a fresh access cookie. A bare
 * axios call keeps this request out of the retry interceptor below.
 */
async function refreshAccessToken(): Promise<void> {
  const endpoint = apiEndpoints.auth.refresh;

  await axios.request({
    baseURL: apiClient.defaults.baseURL,
    method: endpoint.method,
    url: endpoint.path,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    data: {},
  });
}

function isSessionRequest(url?: string): boolean {
  return sessionRequestPaths.some((path) => url?.endsWith(path));
}

/**
 * Access tokens live for 15 minutes. When one expires mid-visit, refresh the
 * session once and replay the original request. Concurrent 401s share the same
 * refresh so the backend only sees one token exchange.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !config ||
      config.hasRetried ||
      typeof window === "undefined" ||
      isSessionRequest(config.url)
    ) {
      return Promise.reject(error);
    }

    config.hasRetried = true;

    try {
      refreshRequest ??= refreshAccessToken().finally(() => {
        refreshRequest = null;
      });

      await refreshRequest;
      return apiClient.request(config);
    } catch {
      return Promise.reject(error);
    }
  },
);

export default apiClient;
