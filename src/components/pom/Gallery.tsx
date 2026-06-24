import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";
import { IMAGES } from "@/lib/images";

const SPANS = ["", "", "row-span-2", "", "col-span-2", ""];

function useGalleryImages() {
  return useQuery<{ url: string; label: string }[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const res = await fetch("/api/gallery-images");
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60_000,
  });
}

const item = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export function Gallery() {
  const { data: settings } = useSettings();
  const gallerySettings = settings?.gallery_settings || {};
  const galleryTitle = gallerySettings.title || "Inside POM'S Penthouse";
  const gallerySubtitle = gallerySettings.subtitle || "A look through the residences, the building and the views that frame them.";

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const { data: remoteImages } = useGalleryImages();

  const remoteGallery = (remoteImages || []).map((img, i) => ({
    src: img.url,
    label: img.label || "Gallery",
    span: SPANS[i % SPANS.length],
  }));

  const localGallery = IMAGES.map((img, i) => ({
    src: img.src,
    label: img.alt,
    span: SPANS[i % SPANS.length],
  }));

  const GALLERY = remoteGallery.length > 0 ? remoteGallery : localGallery;

  const open = useCallback((i: number) => { setActiveIdx(i); setLightboxOpen(true); }, []);
  const close = useCallback(() => setLightboxOpen(false), []);
  const next = useCallback(() => setActiveIdx((p) => (p + 1) % GALLERY.length), [GALLERY.length]);
  const prev = useCallback(() => setActiveIdx((p) => (p - 1 + GALLERY.length) % GALLERY.length), [GALLERY.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxOpen, close, next, prev]);

  return (
    <section id="gallery" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />The Gallery<span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-center text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
          {galleryTitle}
        </h2>
        <p className="mt-5 text-center text-muted-foreground">{gallerySubtitle}</p>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={container}
          className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
        >
          {GALLERY.map((g, i) => (
            <motion.figure
              key={`${g.src}-${i}`} variants={item}
              className={`group relative cursor-pointer overflow-hidden rounded-sm bg-muted ${g.span}`}
              onClick={() => open(i)}
            >
              <img
                src={g.src} alt={g.label} loading="lazy"
                className="size-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-6 p-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">View</span>
                <div className="font-display text-lg">{g.label}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={close}
          >
            <button onClick={close} className="absolute right-6 top-6 z-10 text-white/50 transition hover:text-white">
              <X className="size-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 z-10 text-white/30 transition hover:text-white">
              <ChevronLeft className="size-10" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 z-10 text-white/30 transition hover:text-white">
              <ChevronRight className="size-10" />
            </button>

            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
              className="flex max-h-full max-w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[activeIdx]?.src} alt={GALLERY[activeIdx]?.label}
                className="max-h-[80vh] max-w-full rounded-sm object-contain shadow-2xl"
              />
              <span className="mt-4 text-sm text-white/50">{GALLERY[activeIdx]?.label}</span>
              <span className="mt-1 text-xs text-white/25">{activeIdx + 1} / {GALLERY.length}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
