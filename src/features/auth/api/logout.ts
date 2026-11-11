import { apiEndpoints } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";

export async function logout(): Promise<void> {
  const endpoint = apiEndpoints.auth.logout;

  await apiClient.request({
    method: endpoint.method,
    url: endpoint.path,
    data: {},
  });
}
