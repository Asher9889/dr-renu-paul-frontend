"use client";

import { useMutation } from "@tanstack/react-query";

import { uploadAdminBlogMedia } from "@/features/admin-blog/api/upload-admin-blog-media";
import type { AdminBlogMedia } from "@/features/admin-blog/types/blog";

export function useUploadBlogMedia() {
  return useMutation<AdminBlogMedia, unknown, File>({
    mutationFn: (file) => uploadAdminBlogMedia(file),
  });
}
