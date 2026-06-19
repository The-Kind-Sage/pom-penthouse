import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    (async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        lerp: 0.12,
        duration: 1.2,
        smoothWheel: true,
      }) as unknown as typeof lenis;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}
