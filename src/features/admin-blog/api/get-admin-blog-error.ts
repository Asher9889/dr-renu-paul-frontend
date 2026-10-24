import axios from "axios";
import { z } from "zod";

import { adminBlogApiErrorSchema } from "@/features/admin-blog/schema/blog-entities.schema";

export type AdminBlogError = {
  message: string;
  fieldErrors: Record<string, string>;
  issues: Array<{ field: string; message: string }>;
};

const fallbackMessage =
  "The journal service did not respond. Please try again.";

export function getAdminBlogError(error: unknown): AdminBlogError {
  if (error instanceof z.ZodError) {
    return {
      message: "The journal returned an unexpected response.",
      fieldErrors: {},
      issues: [],
    };
  }

  if (!axios.isAxiosError(error)) {
    return {
      message: fallbackMessage,
      fieldErrors: {},
      issues: [],
    };
  }

  const parsed = adminBlogApiErrorSchema.safeParse(error.response?.data);

  if (!parsed.success) {
    const status = error.response?.status;

    return {
      message: status
        ? `The request failed (${status}). Please try again.`
        : fallbackMessage,
      fieldErrors: {},
      issues: [],
    };
  }

  const issues = parsed.data.errors ?? [];
  const fieldErrors = issues.reduce<Record<string, string>>(
    (accumulator, issue) => {
      if (!accumulator[issue.field]) {
        accumulator[issue.field] = issue.message;
      }

      return accumulator;
    },
    {},
  );

  return {
    message: parsed.data.message ?? fallbackMessage,
    fieldErrors,
    issues,
  };
}
