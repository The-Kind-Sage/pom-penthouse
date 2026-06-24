import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (target: string | number) => void } | null = null;
    (async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        lerp: 0.12,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }) as unknown as typeof lenis;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    const handleClick = (e: Event) => {
      const anchor = (e.target as HTMLElement).closest("a[href^=\"#\"]");
      if (anchor && lenis) {
        e.preventDefault();
        const target = anchor.getAttribute("href");
        if (target) lenis.scrollTo(target);
        history.pushState(null, "", target);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
  return null;
}
