import { z } from "zod";

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"]),
  accountStatus: z.enum([
    "ACTIVE",
    "INACTIVE",
    "BLOCKED",
    "PENDING_VERIFICATION",
  ]),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const authUserResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: authUserSchema,
});
