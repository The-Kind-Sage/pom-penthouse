import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Sophie Laurent", text: "The most thoughtful stay I've had in Asia. The view of Phewa from the balcony alone is worth the trip — but the service is what brings you back." },
  { name: "James Whitaker", text: "I worked from POM'S for two months. Fast WiFi, quiet apartments, and a team that genuinely cares. It set a new bar for me." },
  { name: "Priya Sharma", text: "Travelled with my family — children, in-laws, the lot. The space, the kitchen, the calm. We've already booked again." },
  { name: "Ravi Thapa", text: "Perfect location in Lakeside, walking distance to everything. The rooms are spotless and the staff went above and beyond." },
  { name: "Emma Chen", text: "Booked the Penthouse Suite for our anniversary — breathtaking views, impeccable service. Truly a five-star experience." },
  { name: "Ahmed Hassan", text: "Stayed a week on business. Great workspace in the room, reliable internet, and the team arranged everything I needed." },
  { name: "Maria Lopez", text: "The Family Apartment was perfect for us. Spacious, well-equipped kitchen, and the kids loved the area. Highly recommended." },
  { name: "David Kim", text: "Best place we stayed in Nepal. The attention to detail in the rooms, the warm hospitality — absolutely unmatched." },
  { name: "Anita Joshi", text: "Third time at POM'S and it gets better each visit. The team remembers your preferences — that's real service." },
];

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  function goTo(i: number) {
    clearInterval(intervalRef.current);
    setIndex(i);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
  }

  function visible() {
    const out = [];
    for (let offset = -1; offset <= 1; offset++) {
      out.push(REVIEWS[(index + offset + REVIEWS.length) % REVIEWS.length]);
    }
    return out;
  }

  const cards = visible();

  return (
    <section className="bg-muted overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Guest Stories<span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Loved by guests <span className="italic text-gold">worldwide</span>
          </h2>
        </div>

        <div className="mt-16 flex items-stretch justify-center gap-4 sm:gap-6">
          {cards.map((r, idx) => {
            const isCenter = idx === 1;
            return (
              <motion.div
                key={`${r.name}-${index}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isCenter ? 1.08 : 0.92,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col rounded-2xl border bg-card p-6 shadow-lg transition-shadow sm:p-8 ${
                  isCenter
                    ? "border-gold/40 shadow-gold/10 z-10 shadow-xl"
                    : "border-border opacity-70"
                }`}
                style={{ width: isCenter ? "340px" : "280px" }}
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} className="size-4 fill-gold" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-gold/20 text-xs font-bold uppercase text-gold">
                    {r.name.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-luxury-black">{r.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Google Review</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Review ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === index ? "w-8 bg-gold" : "w-2 bg-luxury-black/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
