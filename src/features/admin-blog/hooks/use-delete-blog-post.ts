"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminBlogQueryKeys } from "@/features/admin-blog/api/admin-blog-query-keys";
import { deleteAdminBlogPost } from "@/features/admin-blog/api/delete-admin-blog-post";

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (id) => deleteAdminBlogPost(id),
    onSuccess: (_result, id) => {
      queryClient.removeQueries({
        queryKey: adminBlogQueryKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: adminBlogQueryKeys.lists(),
      });
    },
  });
}
