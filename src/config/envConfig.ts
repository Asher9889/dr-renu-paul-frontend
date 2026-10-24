const publicBaseURL = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";
const apiProxyTarget = process.env.API_PROXY_TARGET?.replace(/\/+$/, "");

const serverBaseURL = publicBaseURL.startsWith("http")
  ? publicBaseURL
  : `${apiProxyTarget ?? "http://localhost:4506"}${publicBaseURL}`;

const envConfig = {
  baseURL: publicBaseURL,
  serverBaseURL,
};

export default envConfig;
