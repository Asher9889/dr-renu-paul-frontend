import axios from "axios";

import envConfig from "@/config/envConfig";

const apiClient = axios.create({
  baseURL: envConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
