import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const appointmentFormSchema = z.object({
  name: z.string().min(2, "Please share your full name."),
  phone: z
    .string()
    .refine(
      (value) => parsePhoneNumberFromString(value)?.isValid() === true,
      "Please enter a valid phone number.",
    ),
  email: z
    .email("Please enter a valid email address.")
    .or(z.literal(""))
    .optional(),
  concern: z.string().min(1, "Please choose a primary concern."),
  message: z.string(),
});
