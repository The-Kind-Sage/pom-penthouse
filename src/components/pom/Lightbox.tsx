import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ui, useUI } from "@/lib/ui-store";
import { IMAGES } from "@/lib/images";

export function Lightbox() {
  const { lightboxIndex } = useUI();
  const open = lightboxIndex !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ui.closeLightbox();
      if (e.key === "ArrowRight") ui.setLightbox((lightboxIndex! + 1) % IMAGES.length);
      if (e.key === "ArrowLeft")
        ui.setLightbox((lightboxIndex! - 1 + IMAGES.length) % IMAGES.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, lightboxIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/92 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={ui.closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              ui.closeLightbox();
            }}
            className="absolute top-5 right-5 text-white p-3 md:p-2"
            aria-label="Close"
          >
            <X />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              ui.setLightbox((lightboxIndex! - 1 + IMAGES.length) % IMAGES.length);
            }}
            className="absolute left-4 text-white p-3 md:p-2"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              ui.setLightbox((lightboxIndex! + 1) % IMAGES.length);
            }}
            className="absolute right-4 text-white p-3 md:p-2"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
          <motion.div
            key={lightboxIndex}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="max-w-[90vw] max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[lightboxIndex!].src}
              alt={IMAGES[lightboxIndex!].alt}
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
            <p className="mt-4 text-white/80 text-sm tracking-[0.2em]">
              {String(lightboxIndex! + 1).padStart(2, "0")} /{" "}
              {String(IMAGES.length).padStart(2, "0")} · {IMAGES[lightboxIndex!].alt}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
