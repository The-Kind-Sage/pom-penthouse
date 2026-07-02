import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { LocalBusinessJsonLd, WebsiteJsonLd } from "@/components/pom/JsonLd";

import appCss from "../styles.css?url";
import logoUrl from "../favicon/logo.png?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      { name: "description", content: "Premium serviced apartments in Lakeside, Pokhara. Daily, weekly and monthly stays with hotel comfort and home privacy — overlooking Phewa Lake and the Annapurnas." },
      { name: "author", content: "POM'S Penthouse" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#C9A86C" },
      { name: "geo.region", content: "NP-03" },
      { name: "geo.placename", content: "Pokhara" },
      { name: "geo.position", content: "28.2096;83.9856" },
      { name: "ICBM", content: "28.2096, 83.9856" },
      { property: "og:title", content: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      { property: "og:description", content: "Premium serviced apartments in Lakeside, Pokhara. Daily, weekly and monthly stays with hotel comfort and home privacy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app" },
      { property: "og:image", content: "https://pom-penthouse.vercel.app/favicon/logo.png" },
      { property: "og:site_name", content: "POM'S Penthouse" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara" },
      { name: "twitter:description", content: "Premium serviced apartments in Lakeside, Pokhara. Daily, weekly and monthly stays." },
      { name: "twitter:image", content: "https://pom-penthouse.vercel.app/favicon/logo.png" },
      { name: "twitter:site", content: "@poms_penthouse" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: logoUrl },
      { rel: "apple-touch-icon", href: logoUrl },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://pom-penthouse.vercel.app" },
      { rel: "alternate", hrefLang: "en", href: "https://pom-penthouse.vercel.app" },
      { rel: "alternate", hrefLang: "ne", href: "https://pom-penthouse.vercel.app" },

      // ── Performance: preconnect to font origins ──────────────────────────
      // Establishes TCP+TLS connections to Google Fonts CDN before the
      // browser discovers the @import — shaves ~150–300 ms off font load time.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },

      // ── Load the display + body fonts ───────────────────────────────────
      // Using a single combined stylesheet request (fewer round trips).
      // display=swap is baked into the URL so the browser renders fallback
      // text immediately and swaps in the web font when it arrives —
      // preventing invisible text (FOIT) which hurts LCP.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Defer the third-party reviews widget until after hydration is complete.
  // Loading it in <head> scripts blocks the render pipeline on every page
  // load. This useEffect approach means it only runs client-side, after
  // React has hydrated and the page is already interactive.
  useEffect(() => {
    // Guard: don't add a duplicate script if it somehow ran already
    if (document.querySelector('script[src*="sociablekit"]')) return;
    const s = document.createElement("script");
    s.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      // Clean up on unmount (dev HMR cycles)
      s.remove();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
