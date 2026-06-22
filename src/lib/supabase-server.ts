import { createServerClient as createSSRClient } from "@supabase/ssr";

export function createServerClient(request: Request) {
  return createSSRClient(
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
        setAll() {
          // no-op on server
        },
      },
    },
  );
}

export function createServiceClient() {
  return createSSRClient(
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
