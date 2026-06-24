import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { showToast } from "@/components/ui/toast";
import aptStudio from "@/assets/apt-studio.jpg";
import aptExec from "@/assets/apt-executive.jpg";
import aptFamily from "@/assets/apt-family.jpg";
import aptPent from "@/assets/apt-penthouse.jpg";

const APARTMENTS = [
  { name: "3 BHK", price: "$150", img: aptPent },
  { name: "2 BHK", price: "$110", img: aptFamily },
  { name: "1 BHK", price: "$75", img: aptExec },
  { name: "Studio Apartment", price: "$55", img: aptStudio },
];

const ROOMS = [
  { name: "Single Room — Single Bed", price: "$30", img: aptExec },
  { name: "Single Room — Double Bed", price: "$40", img: aptStudio },
  { name: "Single Room — Twin Bed", price: "$45", img: aptFamily },
];

const ALL_OPTIONS = [...APARTMENTS, ...ROOMS];

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const prevent = (e: Event) => e.preventDefault();
      document.addEventListener("wheel", prevent, { passive: false, capture: true });
      document.addEventListener("touchmove", prevent, { passive: false, capture: true });
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("wheel", prevent, true);
        document.removeEventListener("touchmove", prevent, true);
      };
    }
    document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", checkin: "", checkout: "",
    guests: "2", apartment: "Studio Apartment", message: "",
  });
  const [checkinDate, setCheckinDate] = useState<Date>();
  const [checkoutDate, setCheckoutDate] = useState<Date>();
  const [submitting, setSubmitting] = useState(false);

  const selected = ALL_OPTIONS.find((o) => o.name === form.apartment) ?? ALL_OPTIONS[0];

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[90vh] max-w-5xl flex-col border-gold/30 p-0 overscroll-contain">
        <div className="grid shrink-0 grid-cols-1 md:grid-cols-5">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:col-span-2 md:min-h-[300px]">
            <img src={selected.img} alt={selected.name} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Selected</div>
              <div className="font-display text-xl font-medium">{selected.name}</div>
              <div className="mt-1 text-sm text-white/80">{selected.price}<span className="ml-1 text-[10px] text-white/60">/ night</span></div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col">
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
            </div>
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
                    {!ALL_OPTIONS.some((x) => x.name === form.apartment) && (
                      <option value={form.apartment}>{form.apartment}</option>
                    )}
                  </select>
                </Field>
                <Field label="Check-in *">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("h-10 w-full justify-start text-left font-normal", !checkinDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {checkinDate ? format(checkinDate, "MMM d, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkinDate}
                        onSelect={onSelectCheckin}
                        disabled={(d) => d < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field label="Check-out *">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("h-10 w-full justify-start text-left font-normal", !checkoutDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {checkoutDate ? format(checkoutDate, "MMM d, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkoutDate}
                        onSelect={onSelectCheckout}
                        disabled={(d) => d < new Date() || (!!checkinDate && d <= checkinDate)}
                        initialFocus
                      />
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
                <div className="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Your inquiry is sent directly to our team. We reply within the hour.
                  </p>
                  <Button onClick={onSubmit} disabled={submitting} className="rounded-full bg-gold px-6 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-luxury-black hover:brightness-110 disabled:opacity-60">
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
