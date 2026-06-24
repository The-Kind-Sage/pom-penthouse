import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import aptPent from "@/assets/home.jpg";
import aptFamily from "@/assets/apt-family.jpg";
import galBedroom from "@/assets/gal-bedroom.jpg";
import galKitchen from "@/assets/gal-kitchen.jpg";
import lifeBalcony from "@/assets/life-balcony.jpg";
import galLake from "@/assets/gal-lake.jpg";
import galBath from "@/assets/gal-bath.jpg";
import whyImg from "@/assets/5.jpeg";
import lifeNomad from "@/assets/395344844.jpg";
import aptExec from "@/assets/2.jpeg";
import aptStudio from "@/assets/1.jpeg";
import heroImg from "@/assets/3.jpeg";
import ctaImg from "@/assets/4.jpeg";
import img6 from "@/assets/6.jpeg";
import img7 from "@/assets/7.jpeg";
import img8 from "@/assets/8.jpeg";
import img9 from "@/assets/9.jpeg";
import img10 from "@/assets/10.jpeg";
import img11 from "@/assets/11.jpeg";
import img12 from "@/assets/12.jpeg";
import img13 from "@/assets/13.jpeg";
import img14 from "@/assets/14.jpeg";
import img15 from "@/assets/15.jpeg";
import n857 from "@/assets/395344857.jpg";
import n874 from "@/assets/395344874.jpg";
import n879 from "@/assets/395344879.jpg";
import n888 from "@/assets/395344888.jpg";
import n900 from "@/assets/395344900.jpg";
import n698 from "@/assets/405267698.jpg";
import n709 from "@/assets/405267709.jpg";
import n735 from "@/assets/405267735.jpg";
import n751 from "@/assets/405267751.jpg";
import n760 from "@/assets/405267760.jpg";
import n676 from "@/assets/405915676.jpg";
import n677 from "@/assets/405915677.jpg";
import n678 from "@/assets/405915678.jpg";
import n680 from "@/assets/405915680.jpg";
import n696 from "@/assets/405915696.jpg";
import n699 from "@/assets/405915699.jpg";
import n702 from "@/assets/405915702.jpg";
import n703 from "@/assets/405915703.jpg";
import n703b from "@/assets/405915703b.jpg";
import n706 from "@/assets/405915706.jpg";
import n201 from "@/assets/405916201.jpg";
import n209 from "@/assets/405916209.jpg";
import n211 from "@/assets/405916211.jpg";
import n216 from "@/assets/405916216.jpg";
import n939 from "@/assets/405916939.jpg";

const STATIC_GALLERY = [
  { src: aptPent, label: "Building Exterior", span: "row-span-2" },
  { src: heroImg, label: "Bedroom View", span: "" },
  { src: galKitchen, label: "Kitchen", span: "" },
  { src: lifeBalcony, label: "Balcony View", span: "row-span-2" },
  { src: galLake, label: "Phewa Lake View", span: "" },
  { src: galBath, label: "Bathroom", span: "" },
  { src: whyImg, label: "Bedroom", span: "" },
  { src: aptExec, label: "Bedroom", span: "" },
  { src: aptFamily, label: "Family Apartment", span: "col-span-2" },
  { src: galBedroom, label: "Bedroom", span: "" },
  { src: aptStudio, label: "Studio", span: "" },
  { src: ctaImg, label: "Bathroom", span: "" },
  { src: lifeNomad, label: "Bedroom", span: "" },
  { src: img6, label: "Bedroom View", span: "" },
  { src: img7, label: "Bedroom", span: "" },
  { src: img8, label: "Bedroom", span: "" },
  { src: img9, label: "Bedroom", span: "row-span-2" },
  { src: img10, label: "Bedroom", span: "" },
  { src: img11, label: "Bedroom View", span: "" },
  { src: img12, label: "Bedroom", span: "" },
  { src: img13, label: "Bedroom", span: "" },
  { src: img14, label: "Window View", span: "col-span-2" },
  { src: img15, label: "Bedroom View", span: "" },
  { src: n857, label: "Bedroom", span: "" },
  { src: n874, label: "Bedroom", span: "" },
  { src: n879, label: "Bedroom", span: "" },
  { src: n888, label: "Bedroom", span: "" },
  { src: n900, label: "Bedroom", span: "row-span-2" },
  { src: n698, label: "Bedroom", span: "" },
  { src: n709, label: "Bedroom", span: "" },
  { src: n735, label: "Kitchen & Living", span: "" },
  { src: n751, label: "Bedroom", span: "" },
  { src: n760, label: "Bedroom", span: "" },
  { src: n676, label: "Bedroom", span: "col-span-2" },
  { src: n677, label: "Bedroom", span: "" },
  { src: n678, label: "Bedroom", span: "" },
  { src: n680, label: "Bedroom", span: "" },
  { src: n696, label: "Bedroom", span: "row-span-2" },
  { src: n699, label: "Bedroom", span: "" },
  { src: n702, label: "Bedroom", span: "" },
  { src: n703, label: "Bedroom", span: "" },
  { src: n703b, label: "Bedroom", span: "" },
  { src: n706, label: "Bedroom", span: "" },
  { src: n201, label: "Bedroom", span: "col-span-2" },
  { src: n209, label: "Bedroom", span: "" },
  { src: n211, label: "Bedroom", span: "" },
  { src: n216, label: "Bedroom", span: "" },
  { src: n939, label: "Bedroom", span: "" },
];

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const { data: remoteImages } = useGalleryImages();

  const remoteGallery = (remoteImages || []).map((img, i) => ({
    src: img.url,
    label: img.label || "Gallery",
    span: SPANS[i % SPANS.length],
  }));

  const GALLERY = [...remoteGallery, ...STATIC_GALLERY];

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
          Inside <span className="italic text-gold">POM&apos;S Penthouse</span>
        </h2>
        <p className="mt-5 text-center text-muted-foreground">
          A look through the residences, the building and the views that frame them.
        </p>

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
