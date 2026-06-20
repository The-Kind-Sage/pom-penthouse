import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ui } from "@/lib/ui-store";
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
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          aria-label={`Decrease ${label}`}
          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center tabular-nums text-sm">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 hover:border-[var(--gold)]"
        >
          <Plus size={13} />
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
      className={`w-10 h-5 rounded-full transition ${on ? "bg-[var(--gold)]" : "bg-stone-300"} relative flex-shrink-0`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`}
      />
    </button>
  );
}

export function BookingSection() {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nights = range?.from && range?.to ? Math.max(0, differenceInDays(range.to, range.from)) : 0;
  const price = calcPrice({ room, nights: room === "long" ? 30 : nights, addons });


  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    ui.openBooking();
  };

  return (
    <section className="py-24 md:py-32" style={{ background: "var(--sand-soft)" }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">Check availability</p>
          <h2 className="h1-lux">Book your stay</h2>
          <p className="mt-4 opacity-70 text-sm">Live pricing · No commitment</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
          {/* Preview gallery */}
          <div className="grid grid-cols-2 gap-4">
            {[photo(17), photo(18), photo(11), photo(12)].map((p, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-[20px] ${i === 0 ? "row-span-2" : ""}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="object-cover w-full h-full min-h-[160px]"
                />
              </div>
            ))}
          </div>

          {/* Booking form */}
          <motion.form
            onSubmit={handleBook}
            className="rounded-[28px] p-6 md:p-8 space-y-6"
            style={{ background: "var(--paper)", boxShadow: "var(--shadow-soft)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Room selection */}
            <fieldset>
              <legend className="eyebrow mb-3">Choose your stay</legend>
              <div className="grid gap-2">
                {(Object.keys(ROOMS) as RoomKey[]).map((k) => {
                  const r = ROOMS[k];
                  const sel = room === k;
                  return (
                    <label
                      key={k}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${sel ? "border-[var(--gold)] bg-[var(--gold)]/5" : "hover:border-[var(--gold)]/40"}`}
                    >
                      <input
                        type="radio"
                        name="room-section"
                        checked={sel}
                        onChange={() => setRoom(k)}
                        className="mt-1 accent-[var(--gold)]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-sm">{r.label}</span>
                          <span className="text-sm">
                            रू{r.rate.toLocaleString("en-IN")}{" "}
                            <span className="opacity-60 text-xs">/ {r.unit}</span>
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Dates */}
            {room !== "long" && (
              <fieldset>
                <legend className="eyebrow mb-3">Dates</legend>
                <div className="rounded-xl border p-2 overflow-x-auto flex justify-center">
                  <DayPicker
                    mode="range"
                    numberOfMonths={1}
                    disabled={{ before: new Date() }}
                    min={2}
                    selected={range}
                    onSelect={setRange}
                    modifiersClassNames={{ festival: "festival" }}
                  />
                </div>
                <p className="text-xs mt-1 opacity-70">
                  {range?.from && range?.to
                    ? `${range.from.toLocaleDateString()} → ${range.to.toLocaleDateString()} · ${nights} nights`
                    : "2-night minimum"}
                </p>
              </fieldset>
            )}

            {/* Guests */}
            <fieldset>
              <legend className="eyebrow mb-1">Guests</legend>
              <div className="divide-y">
                <Stepper label="Adults" value={adults} min={1} max={6} onChange={setAdults} />
                <Stepper label="Children" value={children} min={0} max={4} onChange={setChildren} />
                <Stepper label="Infants" value={infants} min={0} max={2} onChange={setInfants} />
              </div>
            </fieldset>

            {/* Add-ons */}
            <fieldset>
              <legend className="eyebrow mb-3">Add-ons</legend>
              <div className="space-y-2">
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

            {/* Price summary */}
            <div className="rounded-xl p-4 text-sm" style={{ background: "var(--sand-soft)" }}>
              <div className="flex justify-between">
                <span>Base</span>
                <span>{fmtNPR(price.base)}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Add-ons</span>
                <span>{fmtNPR(price.addonsTotal)}</span>
              </div>
              <div className="flex justify-between mt-1 opacity-70">
                <span>Fees & service</span>
                <span>{fmtNPR(price.serviceFee + price.cleaningFee)}</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-medium text-base">
                <span>Total NPR</span>
                <span>{fmtNPR(price.total)}</span>
              </div>
            </div>

            {/* Quick contact */}
            <fieldset>
              <legend className="eyebrow mb-3">Your details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none text-sm"
                />
              </div>
            </fieldset>

            <button type="submit" className="btn-primary w-full justify-center text-sm">
              Continue Booking — {fmtNPR(price.total)}
            </button>
            <p className="text-xs opacity-60 text-center">You won't be charged yet</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
