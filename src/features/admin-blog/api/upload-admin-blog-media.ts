import { apiEndpoints, buildApiPath } from "@/config/apiEndPoints";
import apiClient from "@/config/axios";
import { adminBlogMediaResponseSchema } from "@/features/admin-blog/schema/blog-entities.schema";
import type { AdminBlogMedia } from "@/features/admin-blog/types/blog";

export async function uploadAdminBlogMedia(
  file: File,
): Promise<AdminBlogMedia> {
  const endpoint = apiEndpoints.adminBlog.media.upload;
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.request({
    method: endpoint.method,
    url: buildApiPath(endpoint.path),
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return adminBlogMediaResponseSchema.parse(response.data).data;
}
