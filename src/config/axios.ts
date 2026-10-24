import axios from "axios";

import envConfig from "@/config/envConfig";

const apiClient = axios.create({
  baseURL:
    typeof window === "undefined" ? envConfig.serverBaseURL : envConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
