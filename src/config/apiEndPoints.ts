export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export const apiEndpoints = {
  appointments: {
    create: {
      method: HTTP_METHOD.POST,
      path: "/appointments",
    },
  },
  contact: {
    create: {
      method: HTTP_METHOD.POST,
      path: "/contact-us",
    },
  },
  publicBlog: {
    posts: {
      method: HTTP_METHOD.GET,
      path: "/blog/posts",
    },
    post: {
      method: HTTP_METHOD.GET,
      path: "/blog/posts/:slug",
    },
    tags: {
      method: HTTP_METHOD.GET,
      path: "/blog/tags",
    },
    author: {
      method: HTTP_METHOD.GET,
      path: "/blog/author",
    },
    media: {
      method: HTTP_METHOD.GET,
      path: "/blog/media/:folder/:year/:month/:filename",
    },
  },
  adminBlog: {
    posts: {
      list: {
        method: HTTP_METHOD.GET,
        path: "/admin/blog/posts",
      },
      create: {
        method: HTTP_METHOD.POST,
        path: "/admin/blog/posts",
      },
      detail: {
        method: HTTP_METHOD.GET,
        path: "/admin/blog/posts/:id",
      },
      update: {
        method: HTTP_METHOD.PATCH,
        path: "/admin/blog/posts/:id",
      },
      publish: {
        method: HTTP_METHOD.POST,
        path: "/admin/blog/posts/:id/publish",
      },
      unpublish: {
        method: HTTP_METHOD.POST,
        path: "/admin/blog/posts/:id/unpublish",
      },
      archive: {
        method: HTTP_METHOD.POST,
        path: "/admin/blog/posts/:id/archive",
      },
      remove: {
        method: HTTP_METHOD.DELETE,
        path: "/admin/blog/posts/:id",
      },
    },
    media: {
      upload: {
        method: HTTP_METHOD.POST,
        path: "/admin/blog/media",
      },
    },
  },
  auth: {
    login: {
      method: HTTP_METHOD.POST,
      path: "/auth/login",
    },
    refresh: {
      method: HTTP_METHOD.POST,
      path: "/auth/refresh",
    },
    logout: {
      method: HTTP_METHOD.POST,
      path: "/auth/logout",
    },
    me: {
      method: HTTP_METHOD.GET,
      path: "/auth/me",
    },
  },
  users: {
    list: {
      method: HTTP_METHOD.GET,
      path: "/users",
    },
    create: {
      method: HTTP_METHOD.POST,
      path: "/users",
    },
    detail: {
      method: HTTP_METHOD.GET,
      path: "/users/:id",
    },
    update: {
      method: HTTP_METHOD.PATCH,
      path: "/users/:id",
    },
    remove: {
      method: HTTP_METHOD.DELETE,
      path: "/users/:id",
    },
  },
} as const;

export function buildApiPath(path: string, params: Record<string, string | number> = {}): string {
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(`:${key}`, encodeURIComponent(String(value))), path,
  );
}
