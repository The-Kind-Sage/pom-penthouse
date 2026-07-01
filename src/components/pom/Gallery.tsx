import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSettings } from "@/lib/hooks";
import { IMAGES } from "@/lib/images";
import { ui } from "@/lib/ui-store";
import { blurIn, staggerFast } from "@/lib/animations";

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

export function Gallery({ preview: isPreview }: { preview?: boolean }) {
  const { data: settings } = useSettings();
  const gallerySettings = settings?.gallery_settings || {};
  const galleryTitle = gallerySettings.title || "Inside POM'S Penthouse";
  const gallerySubtitle = gallerySettings.subtitle || "A look through the residences, the building and the views that frame them.";

  const { data: remoteImages } = useGalleryImages();

  const remoteGallery = (remoteImages || []).map((img, i) => ({
    src: img.url,
    alt: img.label || "Gallery",
    span: SPANS[i % SPANS.length],
  }));

  const localGallery = IMAGES.map((img, i) => ({
    src: img.src,
    alt: img.alt,
    span: SPANS[i % SPANS.length],
  }));

  const GALLERY = remoteGallery.length > 0 ? remoteGallery : localGallery;
  const displayed = isPreview
    ? (GALLERY.length >= 23
        ? [...GALLERY.slice(0, 12), GALLERY[20], GALLERY[21], GALLERY[22]]
        : GALLERY.slice(0, 15))
    : GALLERY;

  const open = (i: number) => {
    ui.openLightbox(i, displayed.map((g) => ({ src: g.src, alt: g.alt })));
  };

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
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={staggerFast}
          className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
        >
          {displayed.map((g, i) => (
            <motion.figure
               key={`${g.src}-${i}`} variants={blurIn}
              className={`group relative cursor-pointer overflow-hidden rounded-sm bg-muted ${isPreview && i >= 12 ? "col-span-2" : g.span}`}
              onClick={() => open(i)}
            >
              <img
                src={g.src} alt={g.alt} loading="lazy"
                className="size-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-6 p-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">View</span>
                <div className="font-display text-lg">{g.alt}</div>
              </figcaption>
            </motion.figure>
          ))}
          {isPreview && (
            <a
              href="/gallery"
              className="group relative flex items-center justify-center overflow-hidden rounded-sm bg-muted col-span-2"
            >
              <div className="flex flex-col items-center gap-3 text-luxury-black transition group-hover:text-gold">
                <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">Explore More</span>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
