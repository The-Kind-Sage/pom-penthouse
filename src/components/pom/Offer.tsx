import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/hooks";
import offerBg from "@/assets/gal-lake.jpg";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking() {
  window.dispatchEvent(new CustomEvent("poms:open-booking"));
}

export function Offer() {
  const { data: settings } = useSettings();
  const offer = settings?.offer_settings || {};
  const title = offer.title || "Ready to Experience Premium Living?";
  const subtitle = offer.subtitle || "Book your luxury serviced apartment today. Our team will respond within the hour.";
  const btnText = offer.btn_text || "Book Now";
  const lifeItem = settings?.lifestyle_settings?.items?.[0] || {};
  const bgImg = lifeItem.image || offerBg;
  const wa = settings?.footer_settings?.whatsapp || "https://wa.me/9779840814142";

  return (
    <section className="relative isolate overflow-hidden">
      {bgImg ? (
        <img src={bgImg} alt="" className="absolute inset-0 size-full object-cover blur-sm scale-105 [filter:saturate(1.6)_sepia(0.12)_brightness(1.1)]" loading="lazy" />
      ) : (
        <div className="absolute inset-0 bg-luxury-black" />
      )}
      <div className="absolute inset-0 bg-luxury-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/85 via-luxury-black/55 to-luxury-black/40" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center text-white sm:py-36">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Reserve Your Stay<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-medium leading-tight sm:text-6xl [text-shadow:0_4px_40px_rgba(0,0,0,0.95),0_2px_8px_rgba(0,0,0,0.8)]">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-white/90 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]">{subtitle}</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={openBooking} className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110">
              {btnText} <ArrowRight className="size-4" />
            </button>
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md transition hover:bg-white hover:text-luxury-black">
              <MessageCircle className="size-4" /> WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
