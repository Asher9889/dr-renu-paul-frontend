import type { z } from "zod";

import type {
  authUserResponseSchema,
  authUserSchema,
} from "../schema/session.schema";

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthUserResponse = z.infer<typeof authUserResponseSchema>;
