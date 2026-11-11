import apiClient from "@/config/axios";
import { apiEndpoints } from "@/config/apiEndPoints";
import { adminBookMediaResponseSchema } from "../schema/book-entities.schema";
import type { AdminBookMedia } from "../types/book";

export async function uploadAdminBookMedia(kind: "cover" | "ebook", file: File): Promise<AdminBookMedia> {
  const endpoint = kind === "cover" ? apiEndpoints.adminBooks.media.cover : apiEndpoints.adminBooks.media.ebook;
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.request({
    method: endpoint.method,
    url: endpoint.path,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return adminBookMediaResponseSchema.parse(response.data).data;
}
