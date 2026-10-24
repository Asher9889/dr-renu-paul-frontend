import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import type {
  AppointmentRequest,
  AppointmentResponse,
} from "@/features/home/types/appointment";

export async function createAppointment(
  request: AppointmentRequest,
): Promise<AppointmentResponse> {
  const endpoint = apiEndpoints.appointments.create;
  const { data } = await apiClient.request<AppointmentResponse>({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    data: request,
  });

  return data;
}
