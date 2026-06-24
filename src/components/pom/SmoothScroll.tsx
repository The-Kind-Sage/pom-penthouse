import { useEffect } from "react";

declare global {
  interface Window { __lenis?: { stop: () => void; start: () => void; destroy: () => void; raf: (t: number) => void; scrollTo: (target: string | number) => void } }
}

export function SmoothScroll() {
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    let raf = 0;
    (async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        lerp: 0.12,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }) as unknown as NonNullable<typeof window.__lenis>;
      window.__lenis = lenis;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    const handleClick = (e: Event) => {
      const anchor = (e.target as HTMLElement).closest("a[href^=\"#\"]");
      if (anchor && window.__lenis) {
        e.preventDefault();
        const target = anchor.getAttribute("href");
        if (target) window.__lenis.scrollTo(target);
        history.pushState(null, "", target);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      cancelAnimationFrame(raf);
      window.__lenis?.destroy();
      delete window.__lenis;
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
  return null;
}
