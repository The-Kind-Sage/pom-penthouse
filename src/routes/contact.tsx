import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { ContactForm } from "@/components/pom/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — POM'S Penthouse" },
      { name: "description", content: "Get in touch with POM'S Penthouse in Lakeside, Pokhara. Book your stay or ask a question." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageLayout transparent={false}>
      <section className="bg-background pt-32 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-8 bg-gold" />Get in Touch<span className="h-px w-8 bg-gold" />
            </div>
            <h1 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
              We'd love to <span className="italic text-gold">hear from you</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Whether you have a question about booking, long-term stays, or anything else — we're here to help.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
              {[
                { icon: MapPin, label: "Address", value: "Lakeside, Pokhara, Nepal" },
                { icon: Phone, label: "Phone / WhatsApp", value: "+977 984-081-4142", href: "tel:+9779840814142" },
                { icon: Mail, label: "Email", value: "stay@pomspenthouse.com", href: "mailto:stay@pomspenthouse.com" },
                { icon: Clock, label: "Check-in / Check-out", value: "Check-in: 2 PM / Check-out: 12 PM" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-gold/10">
                    <item.icon className="size-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block text-foreground transition hover:text-gold">{item.value}</a>
                    ) : (
                      <p className="mt-1 text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
