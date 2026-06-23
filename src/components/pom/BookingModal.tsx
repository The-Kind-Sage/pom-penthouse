import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const APARTMENTS = [
  { name: "Deluxe Studio", price: "$65" },
  { name: "Executive Suite", price: "$95" },
  { name: "Family Apartment", price: "$140" },
  { name: "Penthouse Suite", price: "$220" },
];

const ROOMS = [
  { name: "Mountain View King Room", price: "$55" },
  { name: "Twin Comfort Room", price: "$48" },
  { name: "Deluxe Double Room", price: "$70" },
  { name: "Premier Lake View Room", price: "$90" },
  { name: "Family Triple Room", price: "$110" },
  { name: "Penthouse Master Room", price: "$160" },
];

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
    guests: "2", apartment: "Deluxe Studio", message: "",
  });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  useEffect(() => {
    function onOpen(e: Event) {
      const name = (e as CustomEvent<string>).detail;
      if (typeof name === "string" && name) {
        setForm((f) => ({ ...f, apartment: name }));
      }
      setSent(false);
      setOpen(true);
    }
    window.addEventListener("poms:open-booking", onOpen);
    return () => window.removeEventListener("poms:open-booking", onOpen);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.checkin || !form.checkout) return;
    const msg = encodeURIComponent(
      `New Booking Inquiry — POM'S Penthouse\n\n` +
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
        `Apartment: ${form.apartment}\nGuests: ${form.guests}\n` +
        `Check-in: ${form.checkin}\nCheck-out: ${form.checkout}\n\n` +
        `Message: ${form.message}`
    );
    window.open(`https://wa.me/9779800000000?text=${msg}`, "_blank");
    setSent(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-gold/30 p-0">
        <div className="border-b border-border bg-luxury-black px-8 py-6 text-white">
          <div className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Booking Inquiry
          </div>
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-display text-3xl font-medium text-white sm:text-4xl">
              Reserve Your <span className="italic text-gold">Stay</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-white/70">
              Tell us your dates and preferences. Our team replies within the hour.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={onSubmit} className="grid gap-5 p-8 md:grid-cols-2">
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
              {![...APARTMENTS, ...ROOMS].some((x) => x.name === form.apartment) && (
                <option value={form.apartment}>{form.apartment}</option>
              )}
            </select>
          </Field>
          <Field label="Check-in *">
            <Input required type="date" value={form.checkin} onChange={(e) => update("checkin", e.target.value)} />
          </Field>
          <Field label="Check-out *">
            <Input required type="date" value={form.checkout} onChange={(e) => update("checkout", e.target.value)} />
          </Field>
          <Field label="Guests">
            <Input type="number" min={1} max={10} value={form.guests} onChange={(e) => update("guests", e.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Message">
              <Textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Anything we should know?" maxLength={1000} />
            </Field>
          </div>
          <div className="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              Submitting opens WhatsApp with your inquiry pre-filled. You can also email{" "}
              <a href="mailto:stay@pomspenthouse.com" className="text-gold hover:underline">stay@pomspenthouse.com</a>.
            </p>
            <Button type="submit" className="rounded-full bg-gold px-7 py-6 text-xs font-semibold uppercase tracking-[0.25em] text-luxury-black hover:brightness-110">
              Send Booking Inquiry <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
          {sent && (
            <p className="rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-luxury-black md:col-span-2">
              Thank you! Your inquiry has been opened in WhatsApp — we&apos;ll reply within the hour.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
