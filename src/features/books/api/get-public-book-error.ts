import axios from "axios";
import { z } from "zod";

import { bookApiErrorSchema } from "../schema/public-book.schema";

export type PublicBookError = {
  status: number | null;
  message: string;
};

const fallbackMessage = "The book service did not respond. Please try again.";

export function getPublicBookError(error: unknown): PublicBookError {
  if (error instanceof z.ZodError) {
    return {
      status: null,
      message: "The book service returned an unexpected response.",
    };
  }

  if (!axios.isAxiosError(error)) {
    return { status: null, message: fallbackMessage };
  }

  const status = error.response?.status ?? null;
  const parsed = bookApiErrorSchema.safeParse(error.response?.data);

  if (parsed.success && parsed.data.message) {
    return { status, message: parsed.data.message };
  }

  if (status === 409) {
    return {
      status,
      message: "This edition is still being prepared. Its pages will open shortly.",
    };
  }

  if (status === 404) {
    return { status, message: "This edition could not be found." };
  }

  if (status === 403) {
    return {
      status,
      message: "Purchase the complete edition to read this page.",
    };
  }

  return {
    status,
    message: status
      ? `The request failed (${status}). Please try again.`
      : fallbackMessage,
  };
}
