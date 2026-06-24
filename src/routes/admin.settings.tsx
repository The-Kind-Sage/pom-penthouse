import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSettings, useUpdateSetting } from "@/lib/hooks";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, GripVertical } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-foreground/60">Configure every section of your site</p>
      </div>

      <Tabs defaultValue="navbar" className="w-full">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="navbar">Navbar</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="whychoose">Why Choose</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="longterm">Long Term</TabsTrigger>
          <TabsTrigger value="offer">Offer</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="gallerytext">Gallery</TabsTrigger>
          <TabsTrigger value="apartments">Apartments</TabsTrigger>
          <TabsTrigger value="roomslist">Rooms</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="navbar"><NavbarTab /></TabsContent>
        <TabsContent value="hero"><HeroTab /></TabsContent>
        <TabsContent value="about"><AboutTab /></TabsContent>
        <TabsContent value="whychoose"><WhyChooseTab /></TabsContent>
        <TabsContent value="amenities"><AmenitiesTab /></TabsContent>
        <TabsContent value="lifestyle"><LifestyleTab /></TabsContent>
        <TabsContent value="location"><LocationTab /></TabsContent>
        <TabsContent value="longterm"><LongTermTab /></TabsContent>
        <TabsContent value="offer"><OfferTab /></TabsContent>
        <TabsContent value="faq"><FAQTab /></TabsContent>
        <TabsContent value="testimonials"><TestimonialsTab /></TabsContent>
        <TabsContent value="gallerytext"><GalleryTextTab /></TabsContent>
        <TabsContent value="apartments"><ApartmentsTab /></TabsContent>
        <TabsContent value="roomslist"><RoomsListTab /></TabsContent>
        <TabsContent value="footer"><FooterTab /></TabsContent>
        <TabsContent value="contact"><ContactTab /></TabsContent>
        <TabsContent value="pricing"><PricingTab /></TabsContent>
      </Tabs>
    </div>
  );
}

function InputRow({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
    </div>
  );
}

function TextAreaRow({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4}
        className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
    </div>
  );
}

function SaveButton({ onClick, disabled, label = "Save" }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="btn-primary text-sm py-2 px-4 disabled:opacity-50">{label}</button>
  );
}

// ===== PRICING TAB =====
function PricingTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const pricing = settings?.pricing_rules || { peakMultiplier: 0, minStay: 1, holidayRate: 0 };
  const [peakMultiplier, setPeakMultiplier] = useState(pricing.peakMultiplier || 0);
  const [minStay, setMinStay] = useState(pricing.minStay || 1);
  const [holidayRate, setHolidayRate] = useState(pricing.holidayRate || 0);

  useEffect(() => {
    if (pricing) {
      setPeakMultiplier(pricing.peakMultiplier || 0);
      setMinStay(pricing.minStay || 1);
      setHolidayRate(pricing.holidayRate || 0);
    }
  }, [settings]);

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "pricing_rules", value: { peakMultiplier, minStay, holidayRate } });
      toast.success("Pricing rules saved");
    } catch {
      toast.error("Failed to save pricing rules");
    }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-6 max-w-xl">
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
      <SaveButton onClick={save} disabled={updateSetting.isPending} label="Save Pricing Rules" />
    </div>
  );
}

// ===== NAVBAR TAB =====
function NavbarTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { logo: "", phone: "+977 984-081-4142", links: [{ label: "Home", href: "/" }] };
  const [navbar, setNavbar] = useState(settings?.navbar_settings || defaults);

  useEffect(() => {
    if (settings?.navbar_settings) setNavbar(settings.navbar_settings);
  }, [settings]);

  const updateField = (field: string, value: any) => setNavbar((prev: any) => ({ ...prev, [field]: value }));

  const updateLink = (i: number, field: "label" | "href", v: string) => {
    const links = [...(navbar.links || [])];
    links[i] = { ...links[i], [field]: v };
    updateField("links", links);
  };

  const addLink = () => updateField("links", [...(navbar.links || []), { label: "", href: "" }]);
  const removeLink = (i: number) => updateField("links", (navbar.links || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "navbar_settings", value: navbar });
      toast.success("Navbar settings saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <ImageUpload value={navbar.logo || ""} onChange={(url) => updateField("logo", url)} label="Logo" />
      <InputRow label="Phone Number" value={navbar.phone || ""} onChange={(v) => updateField("phone", v)} placeholder="+977 ..." />
      <div>
        <label className="text-sm font-medium mb-2 block">Navigation Links</label>
        <div className="space-y-2">
          {(navbar.links || []).map((link: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-muted-foreground"><GripVertical className="size-4" /></span>
              <input value={link.label} onChange={(e) => updateLink(i, "label", e.target.value)} placeholder="Label"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={link.href} onChange={(e) => updateLink(i, "href", e.target.value)} placeholder="/path"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <button onClick={() => removeLink(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={addLink} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Link</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== HERO TAB =====
function HeroTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { tagline: "Pokhara, Nepal", badge: "Freehold", btn_primary: "Schedule a Private Viewing", btn_secondary: "Book a Stay", slides: [] };
  const [hero, setHero] = useState(settings?.hero_settings || defaults);

  useEffect(() => {
    if (settings?.hero_settings) setHero(settings.hero_settings);
  }, [settings]);

  const updateField = (field: string, value: any) => setHero((prev: any) => ({ ...prev, [field]: value }));

  const updateSlide = (i: number, field: "src" | "alt", v: string) => {
    const slides = [...(hero.slides || [])];
    slides[i] = { ...(slides[i] || {}), [field]: v };
    updateField("slides", slides);
  };

  const addSlide = () => updateField("slides", [...(hero.slides || []), { src: "", alt: "Slide" }]);
  const removeSlide = (i: number) => updateField("slides", (hero.slides || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "hero_settings", value: hero });
      toast.success("Hero content updated");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Tagline" value={hero.tagline || ""} onChange={(v) => updateField("tagline", v)} placeholder="Pokhara, Nepal" />
      <InputRow label="Badge Text" value={hero.badge || ""} onChange={(v) => updateField("badge", v)} placeholder="Freehold" />
      <InputRow label="Primary Button" value={hero.btn_primary || ""} onChange={(v) => updateField("btn_primary", v)} placeholder="Schedule a Private Viewing" />
      <InputRow label="Secondary Button" value={hero.btn_secondary || ""} onChange={(v) => updateField("btn_secondary", v)} placeholder="Book a Stay" />
      <div>
        <label className="text-sm font-medium mb-2 block">Slideshow Images</label>
        <div className="space-y-3">
          {(hero.slides || []).map((slide: any, i: number) => (
            <div key={i} className="border rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Slide {i + 1}</span>
                <button onClick={() => removeSlide(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
              <ImageUpload value={slide.src || ""} onChange={(url) => updateSlide(i, "src", url)} label={`Image ${i + 1}`} />
              <InputRow label="Alt Text" value={slide.alt || ""} onChange={(v) => updateSlide(i, "alt", v)} placeholder="Describe this image" />
            </div>
          ))}
        </div>
        <button onClick={addSlide} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Slide</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== ABOUT TAB =====
function AboutTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "About", subtitle: "", text: "", image: "", stats: [] };
  const [about, setAbout] = useState(settings?.about_settings || defaults);

  useEffect(() => {
    if (settings?.about_settings) setAbout(settings.about_settings);
  }, [settings]);

  const updateField = (field: string, value: any) => setAbout((prev: any) => ({ ...prev, [field]: value }));
  const updateStat = (i: number, field: "label" | "value", v: string) => {
    const stats = [...(about.stats || [])];
    stats[i] = { ...stats[i], [field]: v };
    updateField("stats", stats);
  };
  const addStat = () => updateField("stats", [...(about.stats || []), { label: "", value: "" }]);
  const removeStat = (i: number) => updateField("stats", (about.stats || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "about_settings", value: about });
      toast.success("About content updated");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Title" value={about.title || ""} onChange={(v) => updateField("title", v)} placeholder="About Us" />
      <InputRow label="Subtitle" value={about.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="Optional subtitle" />
      <TextAreaRow label="About Text" value={about.text || ""} onChange={(v) => updateField("text", v)} placeholder="Tell your story..." />
      <ImageUpload value={about.image || ""} onChange={(url) => updateField("image", url)} label="Background Image" />
      <div>
        <label className="text-sm font-medium mb-2 block">Statistics</label>
        <div className="space-y-2">
          {(about.stats || []).map((s: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-muted-foreground"><GripVertical className="size-4" /></span>
              <input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Label"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="Value"
                className="w-24 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm text-center" />
              <button onClick={() => removeStat(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={addStat} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Stat</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== WHY CHOOSE TAB =====
function WhyChooseTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "", subtitle: "", image: "", items: [] };
  const [wc, setWc] = useState(settings?.whychoose_settings || defaults);

  useEffect(() => {
    if (settings?.whychoose_settings) setWc(settings.whychoose_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setWc((prev: any) => ({ ...prev, [f]: v }));
  const updateItem = (i: number, f: string, v: string) => {
    const items = [...(wc.items || [])];
    items[i] = { ...items[i], [f]: v };
    updateField("items", items);
  };
  const addItem = () => updateField("items", [...(wc.items || []), { title: "", desc: "" }]);
  const removeItem = (i: number) => updateField("items", (wc.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "whychoose_settings", value: wc });
      toast.success("Why Choose content saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Title" value={wc.title || ""} onChange={(v) => updateField("title", v)} placeholder="A new standard for serviced living..." />
      <TextAreaRow label="Subtitle" value={wc.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="Designed for travelers..." />
      <ImageUpload value={wc.image || ""} onChange={(url) => updateField("image", url)} label="Section Image" />
      <div>
        <label className="text-sm font-medium mb-2 block">Items</label>
        <div className="space-y-2">
          {(wc.items || []).map((item: any, i: number) => (
            <div key={i} className="border rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Item {i + 1}</span>
                <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
              <input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title"
                className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={item.desc} onChange={(e) => updateItem(i, "desc", e.target.value)} placeholder="Description"
                className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Item</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== AMENITIES TAB =====
function AmenitiesTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "Luxury Amenities", subtitle: "", items: [] };
  const [amen, setAmen] = useState(settings?.amenities_settings || defaults);

  useEffect(() => {
    if (settings?.amenities_settings) setAmen(settings.amenities_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setAmen((prev: any) => ({ ...prev, [f]: v }));
  const updateItem = (i: number, v: string) => {
    const items = [...(amen.items || [])];
    items[i] = { ...items[i], name: v };
    updateField("items", items);
  };
  const addItem = () => updateField("items", [...(amen.items || []), { name: "" }]);
  const removeItem = (i: number) => updateField("items", (amen.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "amenities_settings", value: amen });
      toast.success("Amenities saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Title" value={amen.title || ""} onChange={(v) => updateField("title", v)} placeholder="Luxury Amenities" />
      <InputRow label="Subtitle" value={amen.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="Everything you'd expect..." />
      <div>
        <label className="text-sm font-medium mb-2 block">Amenity Items</label>
        <div className="space-y-2">
          {(amen.items || []).map((item: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-muted-foreground"><GripVertical className="size-4" /></span>
              <input value={item.name} onChange={(e) => updateItem(i, e.target.value)} placeholder="Amenity name"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Amenity</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== LIFESTYLE TAB =====
function LifestyleTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { items: [] };
  const [life, setLife] = useState(settings?.lifestyle_settings || defaults);

  useEffect(() => {
    if (settings?.lifestyle_settings) setLife(settings.lifestyle_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setLife((prev: any) => ({ ...prev, [f]: v }));
  const updateItem = (i: number, f: string, v: string) => {
    const items = [...(life.items || [])];
    items[i] = { ...items[i], [f]: v };
    updateField("items", items);
  };
  const addItem = () => updateField("items", [...(life.items || []), { title: "", body: "", tag: "", image: "" }]);
  const removeItem = (i: number) => updateField("items", (life.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "lifestyle_settings", value: life });
      toast.success("Lifestyle content saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-2xl">
      <div>
        <label className="text-sm font-medium mb-2 block">Lifestyle Items</label>
        <div className="space-y-4">
          {(life.items || []).map((item: any, i: number) => (
            <div key={i} className="border rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Item {i + 1}</span>
                <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
              <InputRow label="Title" value={item.title || ""} onChange={(v) => updateItem(i, "title", v)} />
              <TextAreaRow label="Body" value={item.body || ""} onChange={(v) => updateItem(i, "body", v)} />
              <InputRow label="Tag" value={item.tag || ""} onChange={(v) => updateItem(i, "tag", v)} placeholder="The Experience" />
              <ImageUpload value={item.image || ""} onChange={(url) => updateItem(i, "image", url)} label={`Image ${i + 1}`} />
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Item</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== LOCATION TAB =====
function LocationTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "Lakeside, Pokhara", subtitle: "", map_url: "", nearby: [] };
  const [loc, setLoc] = useState(settings?.location_settings || defaults);

  useEffect(() => {
    if (settings?.location_settings) setLoc(settings.location_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setLoc((prev: any) => ({ ...prev, [f]: v }));
  const updateNearby = (i: number, f: string, v: string) => {
    const nearby = [...(loc.nearby || [])];
    nearby[i] = { ...nearby[i], [f]: v };
    updateField("nearby", nearby);
  };
  const addNearby = () => updateField("nearby", [...(loc.nearby || []), { name: "", distance: "" }]);
  const removeNearby = (i: number) => updateField("nearby", (loc.nearby || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "location_settings", value: loc });
      toast.success("Location content saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Title" value={loc.title || ""} onChange={(v) => updateField("title", v)} placeholder="Lakeside, Pokhara" />
      <TextAreaRow label="Subtitle" value={loc.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="Tucked between the lake..." />
      <TextAreaRow label="Map Embed URL" value={loc.map_url || ""} onChange={(v) => updateField("map_url", v)} placeholder="https://google.com/maps/embed?..." />
      <div>
        <label className="text-sm font-medium mb-2 block">Nearby Attractions</label>
        <div className="space-y-2">
          {(loc.nearby || []).map((n: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-muted-foreground"><GripVertical className="size-4" /></span>
              <input value={n.name} onChange={(e) => updateNearby(i, "name", e.target.value)} placeholder="Name"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={n.distance} onChange={(e) => updateNearby(i, "distance", e.target.value)} placeholder="Distance"
                className="w-24 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm text-center" />
              <button onClick={() => removeNearby(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={addNearby} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Place</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== LONG TERM TAB =====
function LongTermTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "", subtitle: "", features: [], items: [], image: "" };
  const [lt, setLt] = useState(settings?.longterm_settings || defaults);

  useEffect(() => {
    if (settings?.longterm_settings) setLt(settings.longterm_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setLt((prev: any) => ({ ...prev, [f]: v }));
  const updateFeature = (i: number, v: string) => {
    const features = [...(lt.features || [])];
    features[i] = v;
    updateField("features", features);
  };
  const addFeature = () => updateField("features", [...(lt.features || []), ""]);
  const removeFeature = (i: number) => updateField("features", (lt.features || []).filter((_: any, idx: number) => idx !== i));
  const updateItem = (i: number, f: string, v: string) => {
    const items = [...(lt.items || [])];
    items[i] = { ...items[i], [f]: v };
    updateField("items", items);
  };
  const addItem = () => updateField("items", [...(lt.items || []), { title: "", desc: "" }]);
  const removeItem = (i: number) => updateField("items", (lt.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "longterm_settings", value: lt });
      toast.success("Long term content saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Title" value={lt.title || ""} onChange={(v) => updateField("title", v)} placeholder="Weekly & Monthly Stay Packages" />
      <TextAreaRow label="Subtitle" value={lt.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="Built for those who..." />
      <ImageUpload value={lt.image || ""} onChange={(url) => updateField("image", url)} label="Background Image" />
      <div>
        <label className="text-sm font-medium mb-2 block">Feature Bullets</label>
        <div className="space-y-2">
          {(lt.features || []).map((f: string, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={f} onChange={(e) => updateFeature(i, e.target.value)} placeholder="Feature"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <button onClick={() => removeFeature(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={addFeature} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Feature</button>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Target Audience Cards</label>
        <div className="space-y-2">
          {(lt.items || []).map((item: any, i: number) => (
            <div key={i} className="border rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Card {i + 1}</span>
                <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
              <input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title"
                className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={item.desc} onChange={(e) => updateItem(i, "desc", e.target.value)} placeholder="Description"
                className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Card</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== OFFER TAB =====
function OfferTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "", subtitle: "", btn_text: "Book Now", image: "" };
  const [offer, setOffer] = useState(settings?.offer_settings || defaults);

  useEffect(() => {
    if (settings?.offer_settings) setOffer(settings.offer_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setOffer((prev: any) => ({ ...prev, [f]: v }));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "offer_settings", value: offer });
      toast.success("Offer content saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Title" value={offer.title || ""} onChange={(v) => updateField("title", v)} placeholder="Ready to Experience Premium Living?" />
      <TextAreaRow label="Subtitle" value={offer.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="Book your luxury serviced apartment..." />
      <InputRow label="Button Text" value={offer.btn_text || ""} onChange={(v) => updateField("btn_text", v)} placeholder="Book Now" />
      <ImageUpload value={offer.image || ""} onChange={(url) => updateField("image", url)} label="Background Image" />
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== FAQ TAB =====
function FAQTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "Questions", items: [] };
  const [faq, setFaq] = useState(settings?.faq_settings || defaults);

  useEffect(() => {
    if (settings?.faq_settings) setFaq(settings.faq_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setFaq((prev: any) => ({ ...prev, [f]: v }));
  const updateItem = (i: number, f: string, v: string) => {
    const items = [...(faq.items || [])];
    items[i] = { ...items[i], [f]: v };
    updateField("items", items);
  };
  const addItem = () => updateField("items", [...(faq.items || []), { q: "", a: "" }]);
  const removeItem = (i: number) => updateField("items", (faq.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "faq_settings", value: faq });
      toast.success("FAQ content saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Section Title" value={faq.title || ""} onChange={(v) => updateField("title", v)} placeholder="Questions" />
      <div>
        <label className="text-sm font-medium mb-2 block">FAQ Items</label>
        <div className="space-y-3">
          {(faq.items || []).map((item: any, i: number) => (
            <div key={i} className="border rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Q&A {i + 1}</span>
                <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
              <input value={item.q} onChange={(e) => updateItem(i, "q", e.target.value)} placeholder="Question"
                className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <textarea value={item.a} onChange={(e) => updateItem(i, "a", e.target.value)} placeholder="Answer" rows={2}
                className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Q&A</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== TESTIMONIALS TAB =====
function TestimonialsTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "Loved by guests worldwide", widget_id: "", image: "" };
  const [test, setTest] = useState(settings?.testimonial_settings || defaults);

  useEffect(() => {
    if (settings?.testimonial_settings) setTest(settings.testimonial_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setTest((prev: any) => ({ ...prev, [f]: v }));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "testimonial_settings", value: test });
      toast.success("Testimonials saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <p className="text-xs text-foreground/60">Testimonials use the Elfsight widget. Set your Elfsight App ID below to use your own reviews.</p>
      <InputRow label="Section Title" value={test.title || ""} onChange={(v) => updateField("title", v)} placeholder="Loved by guests worldwide" />
      <InputRow label="Elfsight Widget ID" value={test.widget_id || ""} onChange={(v) => updateField("widget_id", v)} placeholder="a1bde9c4-658b-40a3-ac19-a19822b5bfa6" />
      <ImageUpload value={test.image || ""} onChange={(url) => updateField("image", url)} label="Background Image" />
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== GALLERY TEXT TAB =====
function GalleryTextTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { title: "Inside POM'S Penthouse", subtitle: "" };
  const [gallery, setGallery] = useState(settings?.gallery_settings || defaults);

  useEffect(() => {
    if (settings?.gallery_settings) setGallery(settings.gallery_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setGallery((prev: any) => ({ ...prev, [f]: v }));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "gallery_settings", value: gallery });
      toast.success("Gallery text saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <p className="text-xs text-foreground/60">Manage gallery images from the Gallery section in the sidebar. This tab controls the section title and description only.</p>
      <InputRow label="Section Title" value={gallery.title || ""} onChange={(v) => updateField("title", v)} placeholder="Inside POM'S Penthouse" />
      <InputRow label="Section Subtitle" value={gallery.subtitle || ""} onChange={(v) => updateField("subtitle", v)} placeholder="A look through the residences..." />
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== APARTMENTS TAB =====
function ApartmentsTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { items: [] };
  const [apt, setApt] = useState(settings?.residence_settings || defaults);

  useEffect(() => {
    if (settings?.residence_settings) setApt(settings.residence_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setApt((prev: any) => ({ ...prev, [f]: v }));
  const updateItem = (i: number, f: string, v: any) => {
    const items = [...(apt.items || [])];
    items[i] = { ...items[i], [f]: v };
    updateField("items", items);
  };
  const updateFeatures = (i: number, features: string) => {
    updateItem(i, "features", features.split(",").map((s: string) => s.trim()));
  };
  const addItem = () => updateField("items", [...(apt.items || []), { name: "", image: "", price: "", desc: "", capacity: "", area: "", features: [] }]);
  const removeItem = (i: number) => updateField("items", (apt.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "residence_settings", value: apt });
      toast.success("Apartments saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-2xl">
      <div className="space-y-4">
        {(apt.items || []).map((item: any, i: number) => (
          <div key={i} className="border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Apartment {i + 1}</span>
              <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputRow label="Name" value={item.name || ""} onChange={(v) => updateItem(i, "name", v)} placeholder="3 BHK" />
              <InputRow label="Price" value={item.price || ""} onChange={(v) => updateItem(i, "price", v)} placeholder="$150" />
              <InputRow label="Capacity" value={item.capacity || ""} onChange={(v) => updateItem(i, "capacity", v)} placeholder="4–6 Guests" />
              <InputRow label="Area" value={item.area || ""} onChange={(v) => updateItem(i, "area", v)} placeholder="120 m²" />
            </div>
            <TextAreaRow label="Description" value={item.desc || ""} onChange={(v) => updateItem(i, "desc", v)} />
            <InputRow label="Features (comma-separated)" value={(item.features || []).join(", ")} onChange={(v) => updateFeatures(i, v)} placeholder="3 Bedrooms, Living Room, Full Kitchen" />
            <ImageUpload value={item.image || ""} onChange={(url) => updateItem(i, "image", url)} label={`Image`} />
          </div>
        ))}
        <button onClick={addItem} className="text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Apartment</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== ROOMS LIST TAB =====
function RoomsListTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { items: [] };
  const [rooms, setRooms] = useState(settings?.rooms_settings || defaults);

  useEffect(() => {
    if (settings?.rooms_settings) setRooms(settings.rooms_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setRooms((prev: any) => ({ ...prev, [f]: v }));
  const updateItem = (i: number, f: string, v: any) => {
    const items = [...(rooms.items || [])];
    items[i] = { ...items[i], [f]: v };
    updateField("items", items);
  };
  const updateFeatures = (i: number, features: string) => {
    updateItem(i, "features", features.split(",").map((s: string) => s.trim()));
  };
  const addItem = () => updateField("items", [...(rooms.items || []), { name: "", image: "", price: "", size: "", beds: "", view: "", features: [] }]);
  const removeItem = (i: number) => updateField("items", (rooms.items || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "rooms_settings", value: rooms });
      toast.success("Rooms saved");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-2xl">
      <div className="space-y-4">
        {(rooms.items || []).map((item: any, i: number) => (
          <div key={i} className="border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Room {i + 1}</span>
              <button onClick={() => removeItem(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputRow label="Name" value={item.name || ""} onChange={(v) => updateItem(i, "name", v)} placeholder="Single Room — Single Bed" />
              <InputRow label="Price" value={item.price || ""} onChange={(v) => updateItem(i, "price", v)} placeholder="$30" />
              <InputRow label="Size" value={item.size || ""} onChange={(v) => updateItem(i, "size", v)} placeholder="18 m²" />
              <InputRow label="Beds" value={item.beds || ""} onChange={(v) => updateItem(i, "beds", v)} placeholder="1 Single Bed" />
              <InputRow label="View" value={item.view || ""} onChange={(v) => updateItem(i, "view", v)} placeholder="Courtyard View" />
            </div>
            <InputRow label="Features (comma-separated)" value={(item.features || []).join(", ")} onChange={(v) => updateFeatures(i, v)} placeholder="Single Bed, Desk, WiFi, AC" />
            <ImageUpload value={item.image || ""} onChange={(url) => updateItem(i, "image", url)} label={`Image`} />
          </div>
        ))}
        <button onClick={addItem} className="text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Room</button>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== FOOTER TAB =====
function FooterTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const defaults = { description: "", facebook: "", instagram: "", whatsapp: "", contact: { address: "", phone: "", email: "", tagline: "" }, explore_links: [], residence_links: [] };
  const [footer, setFooter] = useState(settings?.footer_settings || defaults);

  useEffect(() => {
    if (settings?.footer_settings) setFooter(settings.footer_settings);
  }, [settings]);

  const updateField = (f: string, v: any) => setFooter((prev: any) => ({ ...prev, [f]: v }));
  const updateContact = (f: string, v: string) => setFooter((prev: any) => ({ ...prev, contact: { ...(prev.contact || {}), [f]: v } }));
  const updateExploreLink = (i: number, f: string, v: string) => {
    const links = [...(footer.explore_links || [])];
    links[i] = { ...links[i], [f]: v };
    updateField("explore_links", links);
  };
  const addExploreLink = () => updateField("explore_links", [...(footer.explore_links || []), { label: "", href: "" }]);
  const removeExploreLink = (i: number) => updateField("explore_links", (footer.explore_links || []).filter((_: any, idx: number) => idx !== i));
  const updateResidenceLink = (i: number, f: string, v: string) => {
    const links = [...(footer.residence_links || [])];
    links[i] = { ...links[i], [f]: v };
    updateField("residence_links", links);
  };
  const addResidenceLink = () => updateField("residence_links", [...(footer.residence_links || []), { label: "", href: "" }]);
  const removeResidenceLink = (i: number) => updateField("residence_links", (footer.residence_links || []).filter((_: any, idx: number) => idx !== i));

  const save = async () => {
    try {
      await updateSetting.mutateAsync({ key: "footer_settings", value: footer });
      toast.success("Footer content updated");
    } catch { toast.error("Failed to save"); }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <TextAreaRow label="Description" value={footer.description || ""} onChange={(v) => updateField("description", v)} placeholder="Luxury serviced apartments..." />
      <InputRow label="Facebook URL" value={footer.facebook || ""} onChange={(v) => updateField("facebook", v)} placeholder="https://facebook.com/..." />
      <InputRow label="Instagram URL" value={footer.instagram || ""} onChange={(v) => updateField("instagram", v)} placeholder="https://instagram.com/..." />
      <InputRow label="WhatsApp URL" value={footer.whatsapp || ""} onChange={(v) => updateField("whatsapp", v)} placeholder="https://wa.me/..." />
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-3">Contact Info</h3>
        <InputRow label="Address" value={footer.contact?.address || ""} onChange={(v) => updateContact("address", v)} placeholder="Lakeside, Pokhara, Nepal" />
        <InputRow label="Phone" value={footer.contact?.phone || ""} onChange={(v) => updateContact("phone", v)} placeholder="+977 ..." />
        <InputRow label="Email" value={footer.contact?.email || ""} onChange={(v) => updateContact("email", v)} placeholder="email@example.com" />
        <InputRow label="Tagline" value={footer.contact?.tagline || ""} onChange={(v) => updateContact("tagline", v)} placeholder="Views of Phewa & Annapurna" />
      </div>
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-3">Explore Links</h3>
        <div className="space-y-2">
          {(footer.explore_links || []).map((link: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={link.label} onChange={(e) => updateExploreLink(i, "label", e.target.value)} placeholder="Label"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={link.href} onChange={(e) => updateExploreLink(i, "href", e.target.value)} placeholder="/path"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <button onClick={() => removeExploreLink(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
          <button onClick={addExploreLink} className="text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Link</button>
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-3">Residence Links</h3>
        <div className="space-y-2">
          {(footer.residence_links || []).map((link: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={link.label} onChange={(e) => updateResidenceLink(i, "label", e.target.value)} placeholder="Label"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <input value={link.href} onChange={(e) => updateResidenceLink(i, "href", e.target.value)} placeholder="/path"
                className="flex-1 rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
              <button onClick={() => removeResidenceLink(i)} className="p-1 text-red-500 hover:text-red-600"><Trash2 className="size-4" /></button>
            </div>
          ))}
          <button onClick={addResidenceLink} className="text-xs text-gold hover:underline flex items-center gap-1"><Plus className="size-3" /> Add Link</button>
        </div>
      </div>
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}

// ===== CONTACT TAB =====
function ContactTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    if (settings) {
      setContactEmail(settings.contact_email || "");
      setContactPhone(settings.contact_phone || "");
    }
  }, [settings]);

  const save = async () => {
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "contact_email", value: contactEmail }),
        updateSetting.mutateAsync({ key: "contact_phone", value: contactPhone }),
      ]);
      toast.success("Contact info updated");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Contact Email" value={contactEmail} onChange={setContactEmail} placeholder="email@example.com" type="email" />
      <InputRow label="Contact Phone" value={contactPhone} onChange={setContactPhone} placeholder="+977 ..." />
      <SaveButton onClick={save} disabled={updateSetting.isPending} />
    </div>
  );
}
