// Photo registry — exactly 20 image entries. Reuse allowed per brief.
export type PomImage = {
  id: number;
  src: string;
  alt: string;
  effect: string;
};

const u = (path: string, w = 1600) =>
  `https://images.unsplash.com/${path}?w=${w}&q=80&auto=format&fit=crop`;

export const IMAGES: PomImage[] = [
  {
    id: 1,
    src: u("photo-1600607687939-ce8a6c25118c", 1800),
    alt: "Pom PentHouse living room with Annapurna view at dawn",
    effect: "Crossfade",
  },
  {
    id: 2,
    src: u("photo-1613977257363-707ba9348227", 1800),
    alt: "Pom PentHouse balcony with Himalayan mountain view",
    effect: "Ken Burns",
  },
  {
    id: 3,
    src: u("photo-1600607687644-c7171b42498b", 1800),
    alt: "Pom PentHouse bedroom with linen bedding and lake light",
    effect: "Crossfade",
  },
  {
    id: 4,
    src: u("photo-1600210492486-724fe5c67fb0", 1400),
    alt: "Morning light across a quiet stone interior",
    effect: "Push",
  },
  {
    id: 5,
    src: u("photo-1616594039964-ae9021a400a0", 1400),
    alt: "Limestone soaking bath with cedar accents",
    effect: "Mask Reveal",
  },
  {
    id: 6,
    src: u("photo-1502672260266-1c1ef2d93688", 1400),
    alt: "Cedar wood texture detail",
    effect: "Distortion Wave",
  },
  {
    id: 7,
    src: u("photo-1600585154340-be6161a56a0c", 1400),
    alt: "Tall living room with floor-to-ceiling glass",
    effect: "Wipe",
  },
  {
    id: 8,
    src: u("photo-1600607687920-4e2a09cf159d", 1200),
    alt: "Open kitchen with stone counters",
    effect: "Zoom In",
  },
  {
    id: 9,
    src: u("photo-1600566753086-00f18fb6b3ea", 1400),
    alt: "Wide lounge with low oak sofa and ceramics",
    effect: "Zoom Out",
  },
  {
    id: 10,
    src: u("photo-1616047006789-b7af5afb8c20", 1400),
    alt: "Bedroom detail with hand-woven linen",
    effect: "Blur Dissolve",
  },
  {
    id: 11,
    src: u("photo-1600210491892-03d54c0aaf87", 1200),
    alt: "Terrace by day with Annapurna view",
    effect: "Cube Flip",
  },
  {
    id: 12,
    src: u("photo-1600607688960-e095ff83135c", 1200),
    alt: "Stone bathroom with cedar shelving",
    effect: "Page Turn",
  },
  {
    id: 13,
    src: u("photo-1506905925346-21bda4d32df4", 1200),
    alt: "Rooftop view of Annapurna at sunset",
    effect: "Fade to Solid",
  },
  {
    id: 14,
    src: u("photo-1520250497591-112f2f40a3f4", 1200),
    alt: "Infinity view across Phewa Lake",
    effect: "Color Wash",
  },
  {
    id: 15,
    src: u("photo-1558002038-1055907df827", 1200),
    alt: "Smart-home interior with discreet controls",
    effect: "Card Flip",
  },
  {
    id: 16,
    src: u("photo-1530521954074-e64f6810b32d", 1200),
    alt: "Concierge service detail",
    effect: "Grayscale to Color",
  },
  {
    id: 17,
    src: u("photo-1616594039964-ae9021a400a0", 1600),
    alt: "Master suite with king linen bed",
    effect: "Tilt & Shift",
  },
  {
    id: 18,
    src: u("photo-1600607687939-ce8a6c25118c", 1600),
    alt: "Sunset lounge with oak sofa",
    effect: "Split Screen",
  },
  {
    id: 19,
    src: u("photo-1544735716-392fe2489ffa", 1600),
    alt: "Phewa Lake panorama, Pokhara",
    effect: "Liquid Smooth",
  },
  {
    id: 20,
    src: u("photo-1613977257363-707ba9348227", 1800),
    alt: "Pom PentHouse exterior at golden hour",
    effect: "Liquid Smooth",
  },
];

export const photo = (n: number) => IMAGES[n - 1];
