import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ui, useUI } from "@/lib/ui-store";
import { IMAGES } from "@/lib/images";

export function Lightbox() {
  const { lightboxIndex } = useUI();
  const open = lightboxIndex !== null;
  const idx = lightboxIndex ?? 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ui.closeLightbox();
      if (e.key === "ArrowRight") ui.setLightbox((idx + 1) % IMAGES.length);
      if (e.key === "ArrowLeft") ui.setLightbox((idx - 1 + IMAGES.length) % IMAGES.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, idx]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={ui.closeLightbox}
        >
          <button
            onClick={ui.closeLightbox}
            className="absolute right-6 top-6 z-10 text-white/50 transition hover:text-white"
          >
            <X className="size-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); ui.setLightbox((idx - 1 + IMAGES.length) % IMAGES.length); }}
            className="absolute left-4 z-10 text-white/30 transition hover:text-white"
          >
            <ChevronLeft className="size-10" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); ui.setLightbox((idx + 1) % IMAGES.length); }}
            className="absolute right-4 z-10 text-white/30 transition hover:text-white"
          >
            <ChevronRight className="size-10" />
          </button>

          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex max-h-full max-w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[idx].src}
              alt={IMAGES[idx].alt}
              className="max-h-[80vh] max-w-full rounded-sm object-contain shadow-2xl"
            />
            <span className="mt-4 text-sm text-white/50">{IMAGES[idx].alt}</span>
            <span className="mt-1 text-xs text-white/25">{idx + 1} / {IMAGES.length}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
