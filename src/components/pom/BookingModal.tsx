import { useEffect, useState, useMemo, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRight, CalendarIcon, ShieldCheck, Info, X } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { cn } from "@/lib/utils";
import { showToast } from "@/components/ui/toast";
import aptFamily from "@/assets/apt-family.jpg";
import aptPent from "@/assets/405915699.jpg";
import aptStudio from "@/assets/395344888.jpg";
import aptExec from "@/assets/405267735.jpg";

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
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
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

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();

    function blockBg(e: Event) {
      if (scrollRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    }

    document.addEventListener("wheel", blockBg, { passive: false });
    document.addEventListener("touchmove", blockBg, { passive: false });

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("wheel", blockBg);
      document.removeEventListener("touchmove", blockBg);
      window.__lenis?.start();
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
  const canSubmit = form.name.trim() && form.email.trim() && form.checkin && form.checkout && !submitting;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[90vh] max-w-5xl flex-col border-gold/30 p-0 overflow-hidden">
        {/* Close button */}
        <button onClick={() => setOpen(false)} className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-1.5 text-white/70 backdrop-blur-sm transition hover:bg-black/60 hover:text-white">
          <X className="size-4" />
        </button>

        {/* Left: image */}
        <div className="relative shrink-0 overflow-hidden md:hidden">
          <img src={selected.img} alt={selected.name} className="aspect-[16/9] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Selected</div>
            <div className="font-display text-lg font-medium">{selected.name}</div>
            <div className="text-sm text-white/80">{fmtUsd(selected.priceUsd)}/night</div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Left: image (desktop) */}
          <div className="relative hidden shrink-0 overflow-hidden md:block md:w-2/5">
            <img src={selected.img} alt={selected.name} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Selected</div>
              <div className="font-display text-xl font-medium">{selected.name}</div>
              <div className="mt-1 text-sm text-white/80">{fmtUsd(selected.priceUsd)}<span className="ml-1 text-[10px] text-white/60">/ night</span></div>
            </div>
          </div>

          {/* Right: scrollable content */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-border bg-luxury-black px-5 py-4 text-white sm:px-6">
              <DialogHeader className="space-y-0.5 text-left">
                <DialogTitle className="font-display text-xl font-medium text-white sm:text-2xl">
                  Reserve Your <span className="italic text-gold">Stay</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-white/60">
                  Confirm details. Our team replies within the hour via WhatsApp.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/10 px-3 py-2 text-[11px] leading-tight text-gold">
                <ShieldCheck className="size-4 shrink-0" />
                <span><strong>No pre-booking cost</strong> — pay only after you visit. Cancel free anytime.</span>
              </div>
            </div>

            {/* Scrollable body */}
            <div ref={scrollRef} className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              {/* Form grid */}
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                <Field label="Full Name *">
                  <Input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" maxLength={100} className="h-10" />
                </Field>
                <Field label="Email *">
                  <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" maxLength={255} className="h-10" />
                </Field>
                <Field label="Phone / WhatsApp">
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+977 …" maxLength={30} className="h-10" />
                </Field>
                <Field label="Guests">
                  <Input type="number" min={1} max={10} value={form.guests} onChange={(e) => update("guests", e.target.value)} className="h-10" />
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
                <div className="sm:col-span-2">
                  <Field label="Message (optional)">
                    <Textarea rows={2} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any special requests?" maxLength={1000} className="resize-none" />
                  </Field>
                </div>
              </div>

              {/* Dates row */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
              </div>

              {/* Bill */}
              {showBill && (
                <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Info className="size-4 text-gold" />
                    Estimated Bill
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{selected.name} × {nights} night{nights !== 1 ? "s" : ""}</span>
                      <span className="font-medium">{fmtUsd(subtotalUsd)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>@ 1 USD = {fmtNpr(rate)}</span>
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
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-semibold">Total</span>
                      <div className="text-right">
                        <div className="font-semibold">{fmtUsd(totalUsd)}</div>
                        <div className="text-xs text-gold">{fmtNpr(totalNpr)}</div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    NPR is approximate based on today&apos;s live exchange rate. You may pay in USD or NPR. The actual rate at check-in may differ.
                  </p>
                </div>
              )}
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 border-t border-border bg-background px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">No payment required now. Pay when you arrive.</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setOpen(false)} className="h-11 px-5 text-sm">
                    Cancel
                  </Button>
                  <Button onClick={onSubmit} disabled={!canSubmit} className="h-11 rounded-full bg-gold px-8 text-sm font-semibold uppercase tracking-wider text-black hover:brightness-110 disabled:opacity-50">
                    {submitting ? "Sending..." : "Confirm Booking"} <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
