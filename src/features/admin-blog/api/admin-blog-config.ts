const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4506/api/v1";

export const adminBlogApiBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

export const adminBlogPostsEndpoint = `${adminBlogApiBaseUrl}/admin/blog/posts`;
export const adminBlogMediaEndpoint = `${adminBlogApiBaseUrl}/admin/blog/media`;
