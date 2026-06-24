import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSettings, useUpdateSetting, useGalleryImages, useAddGalleryImage, useRemoveGalleryImage } from "@/lib/hooks";
import { toast } from "sonner";
import { Upload, Trash2, GripVertical, Plus, Image as ImageIcon } from "lucide-react";

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
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing"><PricingTab /></TabsContent>
        <TabsContent value="hero"><HeroTab /></TabsContent>
        <TabsContent value="about"><AboutTab /></TabsContent>
        <TabsContent value="footer"><FooterTab /></TabsContent>
        <TabsContent value="gallery"><GalleryTab /></TabsContent>
        <TabsContent value="contact"><ContactTab /></TabsContent>
      </Tabs>
    </div>
  );
}

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
      <button onClick={save} disabled={updateSetting.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Save Pricing Rules</button>
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

function HeroTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  useEffect(() => {
    if (settings) {
      setHeroTitle(settings.hero_title || "");
      setHeroSubtitle(settings.hero_subtitle || "");
    }
  }, [settings]);

  const save = async () => {
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "hero_title", value: heroTitle }),
        updateSetting.mutateAsync({ key: "hero_subtitle", value: heroSubtitle }),
      ]);
      toast.success("Hero content updated");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <InputRow label="Hero Title" value={heroTitle} onChange={setHeroTitle} placeholder="Luxury Serviced Apartments" />
      <InputRow label="Hero Subtitle" value={heroSubtitle} onChange={setHeroSubtitle} placeholder="Lakeside, Pokhara" />
      <button onClick={save} disabled={updateSetting.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Save</button>
    </div>
  );
}

function AboutTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const [aboutText, setAboutText] = useState("");
  const [stats, setStats] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (settings) {
      setAboutText(settings.about_text || "");
      setStats(settings.about_stats || [{ label: "Residences", value: "12+" }, { label: "Guest Rating", value: "4.9★" }, { label: "Countries Hosted", value: "50+" }]);
    }
  }, [settings]);

  const updateStat = (i: number, field: "label" | "value", v: string) => {
    setStats((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: v } : s));
  };

  const addStat = () => setStats((prev) => [...prev, { label: "", value: "" }]);
  const removeStat = (i: number) => setStats((prev) => prev.filter((_, idx) => idx !== i));

  const save = async () => {
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "about_text", value: aboutText }),
        updateSetting.mutateAsync({ key: "about_stats", value: stats.filter((s) => s.label && s.value) }),
      ]);
      toast.success("About content updated");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <TextAreaRow label="About Text" value={aboutText} onChange={setAboutText} placeholder="Tell your story..." />
      <div>
        <label className="text-sm font-medium mb-2 block">Statistics</label>
        <div className="space-y-2">
          {stats.map((s, i) => (
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
      <button onClick={save} disabled={updateSetting.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Save</button>
    </div>
  );
}

function FooterTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const [footerDesc, setFooterDesc] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    if (settings) {
      setFooterDesc(settings.footer_description || "");
      setFacebookUrl(settings.footer_facebook || "https://www.facebook.com/poms.penthouse");
      setInstagramUrl(settings.footer_instagram || "https://www.instagram.com/poms_penthouse");
      setWhatsappUrl(settings.footer_whatsapp || "https://wa.me/9779840814142");
    }
  }, [settings]);

  const save = async () => {
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: "footer_description", value: footerDesc }),
        updateSetting.mutateAsync({ key: "footer_facebook", value: facebookUrl }),
        updateSetting.mutateAsync({ key: "footer_instagram", value: instagramUrl }),
        updateSetting.mutateAsync({ key: "footer_whatsapp", value: whatsappUrl }),
      ]);
      toast.success("Footer content updated");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
      <TextAreaRow label="Footer Description" value={footerDesc} onChange={setFooterDesc} placeholder="Luxury serviced apartments in Lakeside..." />
      <InputRow label="Facebook URL" value={facebookUrl} onChange={setFacebookUrl} placeholder="https://facebook.com/..." />
      <InputRow label="Instagram URL" value={instagramUrl} onChange={setInstagramUrl} placeholder="https://instagram.com/..." />
      <InputRow label="WhatsApp URL" value={whatsappUrl} onChange={setWhatsappUrl} placeholder="https://wa.me/..." />
      <button onClick={save} disabled={updateSetting.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Save</button>
    </div>
  );
}

function GalleryTab() {
  const { data: images, isLoading } = useGalleryImages();
  const addImage = useAddGalleryImage();
  const removeImage = useRemoveGalleryImage();
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "pom-penthouse/gallery");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Upload failed");
      await addImage.mutateAsync({ url: data.url, label });
      toast.success("Image added to gallery");
      setLabel("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: any) {
      if (err?.message?.includes("Cloudinary not configured")) {
        toast.error("Cloudinary not configured — add CLOUDINARY_* env vars or paste an image URL below");
      } else {
        toast.error(err?.message || "Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = async () => {
    if (!url.trim()) return;
    try {
      await addImage.mutateAsync({ url: url.trim(), label });
      toast.success("Image added to gallery");
      setUrl("");
      setLabel("");
    } catch {
      toast.error("Failed to add image");
    }
  };

  const handleRemove = async (index: number) => {
    try {
      await removeImage.mutateAsync(index);
      toast.success("Image removed from gallery");
    } catch {
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
        <h3 className="font-medium">Upload Image</h3>
        <input ref={fileRef} type="file" accept="image/*"
          className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-black file:text-xs file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer" />
        <InputRow label="Label (optional)" value={label} onChange={setLabel} placeholder="Living Room" />
        <button onClick={handleUpload} disabled={uploading} className="btn-primary text-sm py-2 px-4 disabled:opacity-50 flex items-center gap-2">
          <Upload className="size-4" /> {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="bg-background border rounded-xl p-6 space-y-4 max-w-xl">
        <h3 className="font-medium">Or paste image URL</h3>
        <InputRow label="Image URL" value={url} onChange={setUrl} placeholder="https://example.com/image.jpg" />
        <button onClick={handleAddUrl} disabled={addImage.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50 flex items-center gap-2">
          <Plus className="size-4" /> Add Image
        </button>
      </div>

      <div className="bg-background border rounded-xl p-6">
        <h3 className="font-medium mb-4">Gallery Images ({images?.length || 0})</h3>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : !images?.length ? (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <ImageIcon className="size-10" />
            <p className="text-sm">No images yet. Upload or paste URLs above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
                <img src={img.url} alt={img.label} className="size-full object-cover" />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
                {img.label && (
                  <span className="absolute bottom-2 left-2 right-2 text-xs text-white opacity-0 transition group-hover:opacity-100 truncate">
                    {img.label}
                  </span>
                )}
                <button onClick={() => handleRemove(i)}
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-red-500/80 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
      <button onClick={save} disabled={updateSetting.isPending} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">Save</button>
    </div>
  );
}
