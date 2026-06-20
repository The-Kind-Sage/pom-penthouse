import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { ui, useUI } from "@/lib/ui-store";
import { ROOMS, ADDONS, calcPrice, fmtNPR, type RoomKey, type AddonKey } from "@/lib/pricing";
import { photo } from "@/lib/images";

function differenceInDays(a: Date, b: Date) {
  return Math.round((+a - +b) / 86400000);
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          aria-label={`Decrease ${label}`}
          className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center tabular-nums">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
          className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`w-11 h-6 rounded-full transition ${on ? "bg-[var(--gold)]" : "bg-stone-300"} relative`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`}
      />
    </button>
  );
}

export function BookingModal() {
  const { bookingOpen } = useUI();
  const [room, setRoom] = useState<RoomKey>("entire");
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    airport: false,
    chef: false,
    cleaning: false,
    trek: false,
  });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+977 ",
    req: "",
  });
  const [carouselI, setCarouselI] = useState(0);

  const previewSrcs = useMemo(() => [photo(17).src, photo(18).src], []);
  useEffect(() => {
    if (!bookingOpen) return;
    const t = setInterval(() => setCarouselI((p) => (p + 1) % previewSrcs.length), 5000);
    return () => clearInterval(t);
  }, [bookingOpen, previewSrcs.length]);

  useEffect(() => {
    if (!bookingOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ui.closeBooking();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  const nights = range?.from && range?.to ? Math.max(0, differenceInDays(range.to, range.from)) : 0;
  const price = calcPrice({ room, nights: room === "long" ? 30 : nights, addons });

  const resetAll = () => {
    setRoom("entire");
    setRange(undefined);
    setAdults(2);
    setChildren(0);
    setInfants(0);
    setAddons({ airport: false, chef: false, cleaning: false, trek: false });
    setForm({ firstName: "", lastName: "", email: "", phone: "+977 ", req: "" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room !== "long" && (!range?.from || !range?.to || nights < 2)) {
      toast.error("Select valid dates — 2-night minimum");
      return;
    }
    if (!form.firstName || !form.lastName || !form.email || !form.phone.trim()) {
      toast.error("Please complete guest details");
      return;
    }
    const window =
      room === "long"
        ? "your long stay"
        : `${range!.from!.toDateString()} → ${range!.to!.toDateString()}`;
    toast.success(
      `Booking request sent! We'll confirm availability for ${window} within 2 hours.`,
      { duration: 6000 },
    );
    ui.closeBooking();
    resetAll();
  };



  return (
    <AnimatePresence>
      {bookingOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-2 md:p-6"
          style={{ background: "rgba(26,26,26,0.44)", backdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={ui.closeBooking}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[var(--paper)] shadow-2xl"
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={ui.closeBooking}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10"
            >
              <X size={18} />
            </button>

            <div className="grid lg:grid-cols-[42%_58%]">
              {/* Preview */}
              <div className="p-6 md:p-8 order-2 lg:order-1 lg:sticky lg:top-0 self-start">
                <div className="h-[260px] rounded-2xl overflow-hidden relative">
                  {previewSrcs.map((s, i) => (
                    <img
                      key={s}
                      src={s}
                      alt="Pom Penthouse preview"
                      className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-[1500ms] ${i === carouselI ? "opacity-100" : "opacity-0"} kenburns`}
                    />
                  ))}
                </div>
                <div className="mt-4 p-5 rounded-xl" style={{ background: "var(--sand-soft)" }}>
                  <p className="text-sm opacity-70">Pom PentHouse — Entire Place</p>
                  <p className="font-display text-3xl mt-1">
                    रू 25,500 <span className="text-base opacity-60">/ night</span>
                  </p>
                  <p className="text-xs mt-1 opacity-70">★ 4.97 · 42 reviews</p>
                </div>
                <p className="mt-4 text-sm opacity-80">
                  3 Beds · Lake View · Wifi 600mbps · Kitchen
                </p>
                <p className="mt-3 text-xs opacity-70">
                  Free cancellation · 48h · Instant confirmation
                </p>
                <div className="mt-4 h-[160px] rounded-xl bg-[var(--sand-soft)] flex items-center justify-center text-sm opacity-60">
                  Lakeside Road, Pokhara
                </div>
                <p className="mt-3 text-xs opacity-60">Need help? WhatsApp +977 61-XXXXXX</p>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="p-6 md:p-10 order-1 lg:order-2 space-y-7">
                <div>
                  <h2 id="booking-title" className="h2-lux">
                    Book Pom PentHouse
                  </h2>
                  <p className="text-sm opacity-70 mt-1">Live pricing · No commitment</p>
                </div>

                {/* Step 1 - Stay */}
                <fieldset>
                  <legend className="eyebrow mb-3">Stay</legend>
                  <div className="grid gap-2">
                    {(Object.keys(ROOMS) as RoomKey[]).map((k) => {
                      const r = ROOMS[k];
                      const sel = room === k;
                      return (
                        <label
                          key={k}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${sel ? "border-[var(--gold)] bg-[var(--gold)]/5" : "hover:border-[var(--gold)]/40"}`}
                        >
                          <input
                            type="radio"
                            name="room"
                            checked={sel}
                            onChange={() => setRoom(k)}
                            className="mt-1 accent-[var(--gold)]"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{r.label}</span>
                              <span className="text-sm">
                                रू{r.rate.toLocaleString("en-IN")}{" "}
                                <span className="opacity-60">/ {r.unit}</span>
                              </span>
                            </div>
                            <p className="text-xs opacity-70 mt-1">{r.blurb}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Step 2 - Dates */}
                {room !== "long" && (
                  <fieldset>
                    <legend className="eyebrow mb-3">Dates</legend>
                    <div className="rounded-xl border p-2 overflow-x-auto">
                      <DayPicker
                        mode="range"
                        numberOfMonths={
                          typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2
                        }
                        disabled={{ before: new Date() }}
                        min={2}
                        selected={range}
                        onSelect={setRange}
                        modifiers={{
                          festival: { from: new Date(2026, 11, 28), to: new Date(2027, 0, 2) },
                        }}
                        modifiersClassNames={{ festival: "festival" }}
                      />
                    </div>
                    <p className="text-xs mt-2 opacity-70">
                      {range?.from && range?.to
                        ? `${range.from.toLocaleDateString()} → ${range.to.toLocaleDateString()} · ${nights} nights`
                        : "Select dates — 2-night minimum"}
                    </p>
                    {range?.from && range?.to && nights < 2 && (
                      <p className="text-xs text-red-600 mt-1">2-night minimum</p>
                    )}
                  </fieldset>
                )}

                {/* Step 3 - Guests */}
                <fieldset>
                  <legend className="eyebrow mb-1">Guests</legend>
                  <div className="divide-y">
                    <Stepper label="Adults" value={adults} min={1} max={6} onChange={setAdults} />
                    <Stepper
                      label="Children"
                      value={children}
                      min={0}
                      max={4}
                      onChange={setChildren}
                    />
                    <Stepper
                      label="Infants"
                      value={infants}
                      min={0}
                      max={2}
                      onChange={setInfants}
                    />
                  </div>
                </fieldset>

                {/* Step 4 - Add-ons */}
                <fieldset>
                  <legend className="eyebrow mb-3">Add to your stay</legend>
                  <div className="space-y-3">
                    {ADDONS.map((a) => (
                      <div key={a.key} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm">{a.label}</span>
                          <span className="text-xs opacity-60 ml-2">
                            रू{a.price}
                            {a.perNight ? " / night" : ""}
                          </span>
                        </div>
                        <Toggle
                          on={addons[a.key]}
                          onChange={(v) => setAddons({ ...addons, [a.key]: v })}
                          label={a.label}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Step 5 - Price */}
                <div className="rounded-xl p-5 text-sm" style={{ background: "var(--sand-soft)" }}>
                  <div className="flex justify-between">
                    <span>
                      {price.isLong
                        ? `रू ${ROOMS.long.rate.toLocaleString("en-IN")} × ${price.units} month`
                        : `रू ${ROOMS[room].rate.toLocaleString("en-IN")} × ${price.units} nights`}
                    </span>
                    <span>{fmtNPR(price.base)}</span>
                  </div>
                  {!price.isLong && (
                    <div className="flex justify-between mt-1">
                      <span>Cleaning fee</span>
                      <span>{fmtNPR(price.cleaningFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between mt-1">
                    <span>Add-ons</span>
                    <span>{fmtNPR(price.addonsTotal)}</span>
                  </div>
                  <div className="flex justify-between mt-1 opacity-70">
                    <span>Subtotal</span>
                    <span>{fmtNPR(price.subtotal)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Service fee 8%</span>
                    <span>{fmtNPR(price.serviceFee)}</span>
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between font-medium text-base">
                    <span>Total NPR</span>
                    <span>{fmtNPR(price.total)}</span>
                  </div>
                  <p className="mt-2 text-xs opacity-60">Taxes included. No hidden fees.</p>
                </div>

                {/* Step 6 - Guest Details */}
                <fieldset>
                  <legend className="eyebrow mb-3">Guest Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      required
                      placeholder="First Name*"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none"
                    />
                    <input
                      required
                      placeholder="Last Name*"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email*"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none md:col-span-2"
                    />
                    <input
                      required
                      placeholder="Phone*"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none md:col-span-2"
                    />
                    <textarea
                      rows={3}
                      placeholder="Special Requests — late check-in, dietary needs, celebration…"
                      value={form.req}
                      onChange={(e) => setForm({ ...form, req: e.target.value })}
                      className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none md:col-span-2 resize-none"
                    />
                  </div>
                </fieldset>

                <button type="submit" className="btn-primary w-full justify-center">
                  Request to Book — Total {fmtNPR(price.total)}
                </button>
                <p className="text-xs opacity-60 text-center">You won't be charged yet</p>
                <p className="text-xs opacity-60 text-center">
                  रू 67.5L purchase inquiries: hello@pompenthouse.np · Free cancellation 48h prior ·
                  Check-in 3PM / Check-out 11AM
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
