import { useEffect, useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRight, CalendarIcon, ShieldCheck, Info } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { cn } from "@/lib/utils";
import { showToast } from "@/components/ui/toast";
import aptFamily from "@/assets/apt-family.jpg";
import aptPent from "@/assets/405915699.jpg";
import aptStudio from "@/assets/395344888.jpg";
import aptExec from "@/assets/405267735.jpg";
import roomSingle from "@/assets/10.jpeg";
import roomDouble from "@/assets/405915702.jpg";
import roomTwin from "@/assets/405915696.jpg";

const USD_TO_NPR_FALLBACK = 134.5;
const VAT_RATE = 0.13;

const APARTMENTS = [
  { name: "3 BHK", priceUsd: 150, img: aptPent },
  { name: "2 BHK", priceUsd: 110, img: aptFamily },
  { name: "1 BHK", priceUsd: 75, img: aptExec },
  { name: "Studio Apartment", priceUsd: 55, img: aptStudio },
];

const ROOMS = [
  { name: "Single Room — Single Bed", priceUsd: 30, img: aptExec },
  { name: "Single Room — Double Bed", priceUsd: 40, img: aptStudio },
  { name: "Single Room — Twin Bed", priceUsd: 45, img: aptFamily },
];

const ALL_OPTIONS = [...APARTMENTS, ...ROOMS];

function fmtUsd(n: number) { return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }
function fmtNpr(n: number) { return `रू${Math.round(n).toLocaleString("en-US")}`; }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-luxury-black/70">{label}</span>
      {children}
    </label>
  );
}

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", checkin: "", checkout: "",
    guests: "2", apartment: "Studio Apartment", message: "",
  });
  const [checkinDate, setCheckinDate] = useState<Date>();
  const [checkoutDate, setCheckoutDate] = useState<Date>();
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = useState(USD_TO_NPR_FALLBACK);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((d) => { if (d?.rates?.NPR) setRate(d.rates.NPR); })
      .catch(() => {});
  }, []);

  const selected = ALL_OPTIONS.find((o) => o.name === form.apartment) ?? ALL_OPTIONS[0];

  const nights = useMemo(() => {
    if (!checkinDate || !checkoutDate) return 0;
    return differenceInCalendarDays(checkoutDate, checkinDate);
  }, [checkinDate, checkoutDate]);

  const subtotalUsd = selected.priceUsd * nights;
  const vatUsd = subtotalUsd * VAT_RATE;
  const totalUsd = subtotalUsd + vatUsd;
  const subtotalNpr = subtotalUsd * rate;
  const vatNpr = vatUsd * rate;
  const totalNpr = totalUsd * rate;

  const prevent = (e: Event) => e.preventDefault();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("wheel", prevent, { passive: false, capture: true });
      document.addEventListener("touchmove", prevent, { passive: false, capture: true });
      window.__lenis?.stop();
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("wheel", prevent, { capture: true });
        document.removeEventListener("touchmove", prevent, { capture: true });
        window.__lenis?.start();
      };
    }
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSelectCheckin(d: Date | undefined) {
    setCheckinDate(d);
    setForm((f) => ({ ...f, checkin: d ? format(d, "yyyy-MM-dd") : "" }));
  }

  function onSelectCheckout(d: Date | undefined) {
    setCheckoutDate(d);
    setForm((f) => ({ ...f, checkout: d ? format(d, "yyyy-MM-dd") : "" }));
  }

  useEffect(() => {
    function onOpen(e: Event) {
      const name = (e as CustomEvent<string>).detail;
      if (typeof name === "string" && name) {
        setForm((f) => ({ ...f, apartment: name }));
      }
      setOpen(true);
    }
    window.addEventListener("poms:open-booking", onOpen);
    return () => window.removeEventListener("poms:open-booking", onOpen);
  }, []);

  async function onSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.checkin || !form.checkout) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setOpen(false);
      showToast("Booking request has been sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", checkin: "", checkout: "", guests: "2", apartment: "Studio Apartment", message: "" });
      setCheckinDate(undefined);
      setCheckoutDate(undefined);
    } catch (err: any) {
      alert(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const showBill = nights > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[92vh] max-w-5xl flex-col border-gold/30 p-0 overscroll-contain">
        <div className="grid shrink-0 grid-cols-1 md:grid-cols-5">
          {/* Left: image + selected room */}
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:col-span-2 md:min-h-[300px]">
            <img src={selected.img} alt={selected.name} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Selected</div>
              <div className="font-display text-xl font-medium">{selected.name}</div>
              <div className="mt-1 text-sm text-white/80">{fmtUsd(selected.priceUsd)}<span className="ml-1 text-[10px] text-white/60">/ night</span></div>
            </div>
          </div>

          {/* Right: form + bill */}
          <div className="col-span-3 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-border bg-luxury-black px-6 py-5 text-white">
              <div className="mb-1 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
                <span className="h-px w-6 bg-gold" />Confirm Your Booking
              </div>
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="font-display text-2xl font-medium text-white sm:text-3xl">
                  Reserve Your <span className="italic text-gold">Stay</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-white/70">
                  Fill in the details below. Our team confirms via WhatsApp within the hour.
                </DialogDescription>
              </DialogHeader>
              {/* Trust line */}
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/10 px-3 py-2 text-[11px] text-gold">
                <ShieldCheck className="size-4 shrink-0" />
                <span><strong>No pre-booking cost</strong> — pay only after you visit POM&apos;s Penthouse. Cancel free anytime.</span>
              </div>
            </div>

            {/* Scrollable form + bill */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name *">
                  <Input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" maxLength={100} />
                </Field>
                <Field label="Email *">
                  <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" maxLength={255} />
                </Field>
                <Field label="Phone / WhatsApp">
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+977 …" maxLength={30} />
                </Field>
                <Field label="Apartment / Room">
                  <select
                    value={form.apartment}
                    onChange={(e) => update("apartment", e.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
                  >
                    <optgroup label="Apartments">
                      {APARTMENTS.map((a) => <option key={a.name}>{a.name}</option>)}
                    </optgroup>
                    <optgroup label="Rooms">
                      {ROOMS.map((r) => <option key={r.name}>{r.name}</option>)}
                    </optgroup>
                  </select>
                </Field>
                <Field label="Check-in *">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("h-10 w-full justify-start text-left font-normal", !checkinDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 size-4" />
                        {checkinDate ? format(checkinDate, "MMM d, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkinDate} onSelect={onSelectCheckin} disabled={(d) => d < new Date()} initialFocus />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field label="Check-out *">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("h-10 w-full justify-start text-left font-normal", !checkoutDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 size-4" />
                        {checkoutDate ? format(checkoutDate, "MMM d, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkoutDate} onSelect={onSelectCheckout} disabled={(d) => d < new Date() || (!!checkinDate && d <= checkinDate)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field label="Guests">
                  <Input type="number" min={1} max={10} value={form.guests} onChange={(e) => update("guests", e.target.value)} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Message">
                    <Textarea rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Anything we should know?" maxLength={1000} />
                  </Field>
                </div>
              </div>

              {/* ── Bill ── */}
              {showBill && (
                <div className="mt-6 rounded-xl border border-border bg-background p-5">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Info className="size-4 text-gold" />
                    Estimated Bill
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{selected.name} — {fmtUsd(selected.priceUsd)} × {nights} night{nights !== 1 ? "s" : ""}</span>
                      <span className="font-medium">{fmtUsd(subtotalUsd)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Converted to NPR @ 1 USD = {fmtNpr(rate)}</span>
                      <span>{fmtNpr(subtotalNpr)}</span>
                    </div>
                    <div className="border-t border-border" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VAT (13%)</span>
                      <span className="font-medium">{fmtUsd(vatUsd)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>VAT in NPR</span>
                      <span>{fmtNpr(vatNpr)}</span>
                    </div>
                    <div className="border-t-2 border-gold/30" />
                    <div className="flex justify-between pt-1 text-base font-semibold">
                      <span>Total</span>
                      <div className="text-right">
                        <div>{fmtUsd(totalUsd)}</div>
                        <div className="text-xs font-normal text-gold">{fmtNpr(totalNpr)}</div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 rounded-lg bg-gold/10 px-3 py-2 text-[11px] text-gold">
                    <strong>Note:</strong> NPR amount is an approximate based on today's live exchange rate. You may pay in USD or NPR. The actual rate at check-in may differ slightly.
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-5 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-muted-foreground">
                  No payment required now. Pay when you arrive.
                </p>
                <Button onClick={onSubmit} disabled={submitting || !showBill} className="rounded-full bg-gold px-6 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-black hover:brightness-110 disabled:opacity-60">
                  {submitting ? "Sending..." : "Confirm Booking"} <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
