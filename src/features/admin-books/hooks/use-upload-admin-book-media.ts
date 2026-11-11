import { useMutation } from "@tanstack/react-query";
import { uploadAdminBookMedia } from "../api/upload-admin-book-media";

export function useUploadAdminBookMedia() {
  return useMutation({
    mutationFn: ({ kind, file }: { kind: "cover" | "ebook"; file: File }) =>
      uploadAdminBookMedia(kind, file),
  });
}
