import axios from "axios";

import { adminBlogMediaEndpoint } from "@/features/admin-blog/api/admin-blog-config";
import { adminBlogMediaResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type { AdminBlogMedia } from "@/features/admin-blog/types/blog";

export async function uploadAdminBlogMedia(
  file: File,
): Promise<AdminBlogMedia> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(adminBlogMediaEndpoint, formData);

  return adminBlogMediaResponseSchema.parse(response.data).data;
}
