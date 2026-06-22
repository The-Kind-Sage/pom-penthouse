import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { X, Plus, Minus, Calendar } from "lucide-react";
import { toast } from "sonner";
import { ui, useUI } from "@/lib/ui-store";
import { ROOMS, ADDONS, calcPrice, fmtNPR, type RoomKey, type AddonKey } from "@/lib/pricing";
import { getWhatsAppLink } from "@/lib/whatsapp";
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
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [openCal, setOpenCal] = useState<"in" | "out" | null>(null);
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
    if (!openCal) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-calendar-popup]")) setOpenCal(null);
    };
    const t = setTimeout(() => document.addEventListener("mousedown", close), 0);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", close); };
  }, [openCal]);

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
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.style.position = "fixed";
    html.style.width = "100%";
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
      html.style.position = "";
      html.style.width = "";
    };
  }, [bookingOpen]);

  const nights = checkIn && checkOut ? Math.max(0, differenceInDays(checkOut, checkIn)) : 0;
  const price = calcPrice({ room, nights: room === "long" ? 30 : nights, addons });

  const resetAll = () => {
    setRoom("entire");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setOpenCal(null);
    setAdults(2);
    setChildren(0);
    setInfants(0);
    setAddons({ airport: false, chef: false, cleaning: false, trek: false });
    setForm({ firstName: "", lastName: "", email: "", phone: "+977 ", req: "" });
  };

  const [submitting, setSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (room !== "long" && (!checkIn || !checkOut || nights < 2)) {
      toast.error("Select valid dates — 2-night minimum");
      return;
    }
    if (!form.firstName || !form.lastName || !form.email || !form.phone.trim()) {
      toast.error("Please complete guest details");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          penthouse_name: ROOMS[room].label,
          guest_name: `${form.firstName} ${form.lastName}`,
          guest_email: form.email,
          guest_phone: form.phone,
          check_in: room === "long" ? new Date().toISOString().split("T")[0] : checkIn!.toISOString().split("T")[0],
          check_out: room === "long" ? new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0] : checkOut!.toISOString().split("T")[0],
          nights: room === "long" ? 30 : nights,
          total: price.total,
          guests: adults + children,
          addons,
          notes: form.req,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      const link = getWhatsAppLink({
        guestName: `${form.firstName} ${form.lastName}`,
        penthouseName: ROOMS[room].label,
        checkIn: room === "long" ? "Flexible" : checkIn!.toLocaleDateString(),
        checkOut: room === "long" ? "30+ days" : checkOut!.toLocaleDateString(),
        nights: room === "long" ? 30 : nights,
        total: price.total,
      });
      setWhatsappLink(link);

      toast.success("Booking request sent! Check your email for confirmation.", { duration: 6000 });
      ui.closeBooking();
      resetAll();
      setWhatsappLink("");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          onWheel={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[var(--paper)] shadow-2xl"
            style={{ overscrollBehavior: "contain" }}
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
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="text-xs opacity-60 mb-1 block">From</label>
                        <button
                          type="button"
                          onClick={() => setOpenCal(openCal === "in" ? null : "in")}
                          className="w-full flex items-center gap-2 rounded-xl border px-4 py-3 bg-transparent text-left focus:ring-2 focus:ring-[var(--gold)] outline-none text-sm"
                        >
                          <Calendar size={14} className="opacity-50 shrink-0" />
                          <span>{checkIn ? checkIn.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select"}</span>
                        </button>
                        {openCal === "in" && (
                          <div data-calendar-popup className="absolute z-50 mt-1 bg-[var(--paper)] border rounded-xl shadow-xl p-2" onClick={(e) => e.stopPropagation()}>
                            <DayPicker
                              mode="single"
                              disabled={{ before: new Date() }}
                              selected={checkIn}
                              onSelect={(d) => {
                                setCheckIn(d);
                                if (d && checkOut && differenceInDays(checkOut, d) >= 2) {
                                  setOpenCal(null);
                                } else if (d) {
                                  setCheckOut(undefined);
                                  setOpenCal("out");
                                }
                              }}
                              numberOfMonths={1}
                            />
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <label className="text-xs opacity-60 mb-1 block">To</label>
                        <button
                          type="button"
                          onClick={() => { if (checkIn) setOpenCal(openCal === "out" ? null : "out"); }}
                          className={`w-full flex items-center gap-2 rounded-xl border px-4 py-3 bg-transparent text-left focus:ring-2 focus:ring-[var(--gold)] outline-none text-sm ${!checkIn ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          <Calendar size={14} className="opacity-50 shrink-0" />
                          <span>{checkOut ? checkOut.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select"}</span>
                        </button>
                        {openCal === "out" && checkIn && (
                          <div data-calendar-popup className="absolute z-50 mt-1 bg-[var(--paper)] border rounded-xl shadow-xl p-2" onClick={(e) => e.stopPropagation()}>
                            <DayPicker
                              mode="single"
                              disabled={{ before: new Date(checkIn.getTime() + 2 * 86400000) }}
                              selected={checkOut}
                              onSelect={(d) => {
                                setCheckOut(d);
                                if (d) setOpenCal(null);
                              }}
                              numberOfMonths={1}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {checkIn && checkOut ? (
                      <p className="text-xs mt-2 opacity-70">
                        {checkIn.toLocaleDateString()} → {checkOut.toLocaleDateString()} · {nights} nights
                      </p>
                    ) : (
                      <p className="text-xs mt-2 opacity-70">Select dates — 2-night minimum</p>
                    )}
                    {checkIn && checkOut && nights < 2 && (
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

                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-50">
                  {submitting ? "Submitting..." : `Request to Book — Total ${fmtNPR(price.total)}`}
                </button>
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block text-center text-sm text-emerald-600 hover:underline mt-2">
                    Open WhatsApp to confirm →
                  </a>
                )}
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
