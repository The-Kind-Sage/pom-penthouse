import { useState } from "react";
import { toast } from "sonner";
import { ui } from "@/lib/ui-store";

export function Footer() {
  const [loading, setLoading] = useState(false);

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      toast.success("Message sent. We'll reply within 12h.");
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="border-t py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <form onSubmit={handleContact} className="space-y-4">
          <p className="eyebrow mb-2">Contact</p>
          <h2 className="h2-lux mb-6">Write to Pom</h2>
          <input
            required
            name="name"
            placeholder="Name"
            className="w-full rounded-xl border px-4 py-3.5 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none transition"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-xl border px-4 py-3.5 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none transition"
          />
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Tell us about your stay or purchase interest…"
            className="w-full rounded-xl border px-4 py-3.5 bg-transparent focus:ring-2 focus:ring-[var(--gold)] outline-none transition resize-none"
          />
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 disabled:opacity-50">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div>
          <div className="font-display text-3xl">Pom PentHouse</div>
          <p className="mt-4 opacity-80 leading-relaxed">
            Lakeside Road
            <br />
            Pokhara 33700, Nepal
            <br />
            hello@pompenthouse.np
            <br />
            +977 61-XXXXXX
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a className="link-underline" href="#">
              Instagram
            </a>
            <a className="link-underline" href="#">
              Airbnb
            </a>
            <button onClick={ui.openBooking} className="link-underline">
              Check availability →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 mt-16 pt-8 border-t text-sm opacity-60 flex justify-between flex-wrap gap-3">
        <span>© 2026 Pom PentHouse · Designed in Pokhara</span>
        <span>hello@pompenthouse.np</span>
      </div>
    </footer>
  );
}
