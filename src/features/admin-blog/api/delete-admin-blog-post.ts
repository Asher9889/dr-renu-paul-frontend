import axios from "axios";

import { adminBlogPostsEndpoint } from "@/features/admin-blog/api/admin-blog-config";

export async function deleteAdminBlogPost(id: string): Promise<void> {
  await axios.delete(`${adminBlogPostsEndpoint}/${encodeURIComponent(id)}`);
}
