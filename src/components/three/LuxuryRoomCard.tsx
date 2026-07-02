import { useState, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-xl will-change-transform transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_60px_-15px_rgba(201,168,108,0.15)]"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="size-full object-cover"
          style={{
            scale: useSpring(isHovered ? 1.08 : 1, { stiffness: 200, damping: 25 }),
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Gold shimmer on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/5"
        />

        {/* Price badge - top left */}
        <div className="absolute left-5 top-5">
          <div className="rounded-full bg-black/40 px-4 py-1.5 backdrop-blur-md border border-white/10">
            <span className="text-sm font-semibold text-gold">{price}<span className="text-[10px] text-white/50 ml-1">/night</span></span>
          </div>
        </div>

        {/* View Details indicator - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute right-5 top-5"
        >
          <div className="size-9 rounded-full bg-gold/90 flex items-center justify-center">
            <ArrowRight className="size-4 text-black -rotate-45" />
          </div>
        </motion.div>

        {/* Title overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl font-medium text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-4">
        {/* Gold accent line */}
        <div className="mb-4 h-px bg-gradient-to-r from-gold/60 via-gold/30 to-transparent" />

        <p className="text-[13px] text-white/70 leading-relaxed line-clamp-2">{description}</p>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/60 transition-all duration-300 group-hover:border-gold/30 group-hover:text-gold"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Book Now button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBook}
          className="mt-5 w-full rounded-full border border-gold/40 bg-gold/10 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-500 hover:bg-gold hover:text-black hover:shadow-[0_0_40px_rgba(201,168,108,0.3)] hover:border-gold flex items-center justify-center gap-2"
        >
          Book Now
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </motion.button>
      </div>

      {/* Hover border glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(201,168,108,0.2)]"
      />
    </motion.div>
  );
}

export { LuxuryRoomCard };
export type { LuxuryRoomCardProps };
