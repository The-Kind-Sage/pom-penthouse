export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const slideRight = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

// blurIn: blur() was removed from the animation.
// Animating CSS filter triggers a full GPU repaint on every frame because the
// browser must re-rasterize the element's contents for each intermediate blur
// value. Replacing it with a pure opacity + scale reveal is visually equivalent
// and runs entirely on the compositor — zero main-thread work.
export const blurIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
