import { createServerClient } from "@supabase/ssr";

export function createServerClient(request: Request) {
  return createServerClient(
    import.meta.env.SUPABASE_URL!,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("Cookie") || "";
          return cookieHeader.split(";").filter(Boolean).map((c) => {
            const [name, ...rest] = c.split("=");
            return { name: name.trim(), value: rest.join("=").trim() };
          });
        },
        setAll(cookies) {
          // no-op on server, cookies managed by middleware
        },
      },
    },
  );
}

export function createServiceClient() {
  return createServerClient(
    import.meta.env.SUPABASE_URL!,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
