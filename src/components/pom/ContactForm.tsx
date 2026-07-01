import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
      <div className="space-y-2">
        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Name</Label>
        <Input
          id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-border focus:border-gold focus:ring-gold/20"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Email</Label>
        <Input
          id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border-border focus:border-gold focus:ring-gold/20"
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Message</Label>
        <Textarea
          id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border-border focus:border-gold focus:ring-gold/20 resize-none"
          placeholder="How can we help you?"
        />
      </div>
      <Button
        type="submit" disabled={state === "sending"}
        className="w-full rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black hover:bg-gold/90 hover:brightness-110"
      >
        {state === "sending" ? "Sending..." : <>Send Message <Send className="size-3.5" /></>}
      </Button>
      {state === "error" && <p className="text-center text-sm text-red-500">Something went wrong. Try again.</p>}
    </form>
  );
}
