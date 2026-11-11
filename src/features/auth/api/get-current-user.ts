import axios from "axios";

import { apiEndpoints } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { authUserResponseSchema } from "../schema/session.schema";
import type { AuthUser } from "../types/auth";

/**
 * Resolves the reader behind the backend's httpOnly JWT cookies. A 401 simply
 * means the visitor is signed out, which is normal on the public site.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const endpoint = apiEndpoints.auth.me;

  try {
    const response = await apiClient.request({
      method: endpoint.method,
      url: endpoint.path,
    });
    return authUserResponseSchema.parse(response.data).data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}
