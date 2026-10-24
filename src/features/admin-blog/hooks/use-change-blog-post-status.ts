"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminBlogQueryKeys } from "@/features/admin-blog/api/admin-blog-query-keys";
import { changeAdminBlogPostStatus } from "@/features/admin-blog/api/change-admin-blog-post-status";
import type {
  AdminBlogPostDetail,
  BlogPostStatusAction,
} from "@/features/admin-blog/types/blog";

type ChangeBlogPostStatusVariables = {
  id: string;
  action: BlogPostStatusAction;
};

export function useChangeBlogPostStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    AdminBlogPostDetail,
    unknown,
    ChangeBlogPostStatusVariables
  >({
    mutationFn: ({ id, action }) => changeAdminBlogPostStatus(id, action),
    onSuccess: (post) => {
      queryClient.setQueryData(adminBlogQueryKeys.detail(post.id), post);
      queryClient.invalidateQueries({
        queryKey: adminBlogQueryKeys.lists(),
      });
    },
  });
}
