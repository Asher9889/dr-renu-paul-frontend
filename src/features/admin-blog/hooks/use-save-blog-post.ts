"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminBlogQueryKeys } from "@/features/admin-blog/api/admin-blog-query-keys";
import { createAdminBlogPost } from "@/features/admin-blog/api/create-admin-blog-post";
import { updateAdminBlogPost } from "@/features/admin-blog/api/update-admin-blog-post";
import type {
  CreateBlogPostPayload,
  AdminBlogPostDetail,
} from "@/features/admin-blog/types/blog";

type SaveBlogPostVariables = {
  id?: string;
  payload: CreateBlogPostPayload;
};

export function useSaveBlogPost() {
  const queryClient = useQueryClient();

  return useMutation<AdminBlogPostDetail, unknown, SaveBlogPostVariables>({
    mutationFn: ({ id, payload }) =>
      id ? updateAdminBlogPost(id, payload) : createAdminBlogPost(payload),
    onSuccess: (post) => {
      queryClient.setQueryData(adminBlogQueryKeys.detail(post.id), post);
      queryClient.invalidateQueries({
        queryKey: adminBlogQueryKeys.lists(),
      });
    },
  });
}
