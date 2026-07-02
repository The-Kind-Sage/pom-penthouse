import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LuxuryRoomCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  onBook?: () => void;
  children?: ReactNode;
}

function LuxuryRoomCard({ image, title, description, price, features, onBook }: LuxuryRoomCardProps) {
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_30px_60px_-25px_rgba(201,168,108,0.2)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 text-white">
          <h3 className="font-display text-xl font-medium drop-shadow-lg">{title}</h3>
          <p className="mt-1 text-xs text-white/90 drop-shadow-md">{description}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          {features.map((f: string) => (
            <span key={f} className="rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-luxury-black/75 transition-colors group-hover:border-gold/30">{f}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">From</span>
            <span className="font-display text-lg text-luxury-black">{price}<span className="ml-1 text-xs text-muted-foreground">/ night</span></span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onBook}
            className="inline-flex items-center gap-1.5 rounded-full bg-luxury-black px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-black"
          >
            Book Now <ArrowRight className="size-3" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export { LuxuryRoomCard };
export type { LuxuryRoomCardProps };
