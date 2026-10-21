import { z } from "zod";

import { appointmentFormSchema } from "@/features/home/schema/appointment-form.schema";

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export type AppointmentRequest = AppointmentFormValues;

export type AppointmentResponse = {
  ok: boolean;
};
