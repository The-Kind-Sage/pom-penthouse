import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle className="size-12 text-gold" />
        <p className="text-lg text-muted-foreground">Thank you! We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Name</label>
        <input
          id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-gold"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Email</label>
        <input
          id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-gold"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Message</label>
        <textarea
          id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-gold"
          placeholder="How can we help you?"
        />
      </div>
      <button
        type="submit" disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110 disabled:opacity-60"
      >
        {state === "sending" ? "Sending..." : <>Send Message <Send className="size-3.5" /></>}
      </button>
      {state === "error" && <p className="text-center text-sm text-red-500">Something went wrong. Try again.</p>}
    </form>
  );
}
