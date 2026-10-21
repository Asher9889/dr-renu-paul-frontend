"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


import { createAppointment } from "@/features/home/api/create-appointment";
import { appointmentFormSchema } from "@/features/home/schema/appointment-form.schema";
import type { AppointmentFormValues } from "@/features/home/types/appointment";

export function useAppointmentForm(successMessage: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      concern: "",
      message: "",
    },
  });

  async function onSubmit(values: AppointmentFormValues) {
    setIsSubmitting(true);

    try {
      await createAppointment(values);
      toast.success(successMessage);
      form.reset();
    } catch {
      toast.error("Something went wrong — please try again or call the clinic.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, isSubmitting, onSubmit };
}
