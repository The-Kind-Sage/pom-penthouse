import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-foreground/60">Configure your site</p>
      </div>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="cms">Site Content</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing">
          <PricingTab />
        </TabsContent>
        <TabsContent value="cms">
          <CMSTab />
        </TabsContent>
        <TabsContent value="email">
          <EmailTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PricingTab() {
  const [peakMultiplier, setPeakMultiplier] = useState(0);
  const [minStay, setMinStay] = useState(1);
  const [holidayRate, setHolidayRate] = useState(0);

  const save = () => {
    toast.success("Pricing rules saved");
  };

  return (
    <div className="bg-paper border rounded-xl p-6 space-y-6 max-w-xl">
      <div>
        <h3 className="font-medium mb-1">Peak Season Multiplier</h3>
        <p className="text-xs text-foreground/60 mb-2">Additional % added during peak season (Oct-Feb)</p>
        <div className="flex items-center gap-4">
          <input type="range" min={0} max={100} value={peakMultiplier} onChange={(e) => setPeakMultiplier(Number(e.target.value))}
            className="flex-1 accent-[var(--gold)]" />
          <span className="text-sm font-medium w-12">{peakMultiplier}%</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-1">Minimum Stay (nights)</h3>
        <p className="text-xs text-foreground/60 mb-2">Default minimum booking duration</p>
        <input type="number" value={minStay} onChange={(e) => setMinStay(Number(e.target.value))}
          className="rounded-xl border px-4 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm w-24" />
      </div>
      <div>
        <h3 className="font-medium mb-1">Holiday Rate Increase</h3>
        <p className="text-xs text-foreground/60 mb-2">Additional % for public holidays</p>
        <div className="flex items-center gap-4">
          <input type="range" min={0} max={100} value={holidayRate} onChange={(e) => setHolidayRate(Number(e.target.value))}
            className="flex-1 accent-[var(--gold)]" />
          <span className="text-sm font-medium w-12">{holidayRate}%</span>
        </div>
      </div>
      <button onClick={save} className="btn-primary text-sm py-2 px-4">Save Pricing Rules</button>
    </div>
  );
}

function CMSTab() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const save = () => {
    toast.success("Site content updated");
  };

  return (
    <div className="bg-paper border rounded-xl p-6 space-y-4 max-w-xl">
      <div>
        <label className="text-sm font-medium mb-1 block">Hero Title</label>
        <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Enter hero title"
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Hero Subtitle</label>
        <input value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} placeholder="Enter hero subtitle"
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Contact Email</label>
        <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="email@example.com"
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Contact Phone</label>
        <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+977 ..."
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <button onClick={save} className="btn-primary text-sm py-2 px-4">Save Content</button>
    </div>
  );
}

function EmailTab() {
  return (
    <div className="flex items-center justify-center py-16 text-sm text-foreground/40">
      No email templates configured yet
    </div>
  );
}
