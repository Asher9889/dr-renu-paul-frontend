import axios from "axios";

import type {
  AppointmentRequest,
  AppointmentResponse,
} from "@/features/home/types/appointment";

const appointmentsEndpoint = process.env.NEXT_PUBLIC_APPOINTMENTS_API_URL;

export async function createAppointment(request: AppointmentRequest): Promise<AppointmentResponse> {
  console.log("Creating appointment with request:", request);
  if (!appointmentsEndpoint) {
    return { ok: true };
  }

  const { data } = await axios.post<AppointmentResponse>(
    appointmentsEndpoint,
    request,
  );

  return data;
}
