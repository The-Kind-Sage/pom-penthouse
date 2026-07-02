import { useState, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
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
      className="group relative overflow-hidden rounded-2xl bg-background will-change-transform"
    >
      {/* Image container with parallax */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-700 ease-out"
          style={{
            scale: useSpring(isHovered ? 1.1 : 1, { stiffness: 200, damping: 25 }),
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />

        {/* Gold shimmer on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-gold/30 via-transparent to-gold/10"
        />

        {/* Price badge */}
        <div className="absolute right-4 top-4 rounded-full bg-luxury-black/60 px-4 py-2 backdrop-blur-md">
          <span className="text-xs font-semibold text-gold">{price}</span>
        </div>

        {/* Hover reveal overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center bg-luxury-black/40 backdrop-blur-[2px]"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={onBook}
            className="rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(201,168,108,0.4)]"
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Gold accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "3rem" : "1.5rem" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 h-px bg-gold"
        />

        <h3 className="font-display text-2xl font-medium text-luxury-black dark:text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-muted px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-gold"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Book Now button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBook}
          className="mt-5 w-full rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(201,168,108,0.3)]"
        >
          Book Now
        </motion.button>
      </div>

      {/* Hover border glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(201,168,108,0.3),0_0_60px_-15px_rgba(201,168,108,0.2)]"
      />
    </motion.div>
  );
}

export { LuxuryRoomCard };
export type { LuxuryRoomCardProps };
