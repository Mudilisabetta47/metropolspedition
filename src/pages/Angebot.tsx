import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Send, CheckCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Angebot() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    company_name: "", contact_person: "", email: "", phone: "",
    pickup_address: "", pickup_zip: "", delivery_address: "", delivery_zip: "",
    shipping_date: "", time_window: "", load_type: "palette", pallet_count: 1,
    pallet_dimensions: "120x80", custom_length: "", custom_width: "",
    height_cm: "", weight_per_pallet_kg: "", total_weight_kg: "",
    needs_liftgate: false, needs_avis: false, is_express: false,
    temperature_controlled: false, needs_insurance: false, remarks: "", privacy_accepted: false,
  });

  useEffect(() => {
    const count = searchParams.get("pallet_count");
    const dims = searchParams.get("pallet_dimensions");
    const height = searchParams.get("height_cm");
    const weight = searchParams.get("weight_per_pallet_kg");
    if (count || dims || height || weight) {
      setForm((f) => ({
        ...f,
        pallet_count: count ? parseInt(count) : f.pallet_count,
        pallet_dimensions: dims || f.pallet_dimensions,
        height_cm: height || f.height_cm,
        weight_per_pallet_kg: weight || f.weight_per_pallet_kg,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy_accepted) { toast({ title: "Bitte akzeptieren Sie die Datenschutzerklärung", variant: "destructive" }); return; }
    setLoading(true);
    const { error } = await supabase.from("quote_requests").insert({
      ...form,
      height_cm: parseFloat(form.height_cm) || 0,
      weight_per_pallet_kg: parseFloat(form.weight_per_pallet_kg) || 0,
      total_weight_kg: form.total_weight_kg ? parseFloat(form.total_weight_kg) : null,
      custom_length: form.custom_length ? parseFloat(form.custom_length) : null,
      custom_width: form.custom_width ? parseFloat(form.custom_width) : null,
    });
    setLoading(false);
    if (error) { toast({ title: "Fehler beim Senden", description: error.message, variant: "destructive" }); }
    else { setSuccess(true); toast({ title: "Anfrage gesendet!", description: "Wir melden uns in Kürze bei Ihnen." }); }
  };

  if (success) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen flex items-center">
          <div className="container-custom text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-success" />
            </motion.div>
            <h1 className="text-4xl font-display font-bold mb-4">Vielen Dank!</h1>
            <p className="text-xl text-muted-foreground mb-8">Ihre Angebotsanfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            <Button asChild variant="outline"><a href="/">Zurück zur Startseite</a></Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-10 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Angebot anfordern</h1>
            <p className="text-xl text-primary-foreground/70">Füllen Sie das Formular aus und erhalten Sie Ihr individuelles Transportangebot.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="card-premium p-8">
              <h2 className="text-xl font-display font-bold mb-6">Kontaktdaten</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><Label>Firma *</Label><Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required /></div>
                <div><Label>Ansprechpartner *</Label><Input value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} required /></div>
                <div><Label>E-Mail *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                <div><Label>Telefon *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
              </div>
            </div>

            {/* Addresses */}
            <div className="card-premium p-8">
              <h2 className="text-xl font-display font-bold mb-6">Adressen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><Label>Abholadresse *</Label><Input value={form.pickup_address} onChange={(e) => setForm({ ...form, pickup_address: e.target.value })} required /></div>
                <div><Label>PLZ Abholung *</Label><Input value={form.pickup_zip} onChange={(e) => setForm({ ...form, pickup_zip: e.target.value })} required /></div>
                <div><Label>Zieladresse *</Label><Input value={form.delivery_address} onChange={(e) => setForm({ ...form, delivery_address: e.target.value })} required /></div>
                <div><Label>PLZ Ziel *</Label><Input value={form.delivery_zip} onChange={(e) => setForm({ ...form, delivery_zip: e.target.value })} required /></div>
                <div><Label>Versanddatum *</Label><Input type="date" value={form.shipping_date} onChange={(e) => setForm({ ...form, shipping_date: e.target.value })} required /></div>
                <div><Label>Zeitfenster</Label><Input placeholder="z.B. 08:00-12:00" value={form.time_window} onChange={(e) => setForm({ ...form, time_window: e.target.value })} /></div>
              </div>
            </div>

            {/* Cargo */}
            <div className="card-premium p-8">
              <h2 className="text-xl font-display font-bold mb-6">Ladung</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><Label>Ladeeinheit</Label><Select value={form.load_type} onValueChange={(v) => setForm({ ...form, load_type: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="palette">Palette</SelectItem><SelectItem value="kartons">Kartons</SelectItem><SelectItem value="sondermass">Sondermaß</SelectItem></SelectContent></Select></div>
                <div><Label>Anzahl Paletten *</Label><Input type="number" min={1} value={form.pallet_count} onChange={(e) => setForm({ ...form, pallet_count: parseInt(e.target.value) || 1 })} required /></div>
                <div><Label>Palettenmaße</Label><Select value={form.pallet_dimensions} onValueChange={(v) => setForm({ ...form, pallet_dimensions: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="120x80">Europalette (120x80)</SelectItem><SelectItem value="120x100">Industrie (120x100)</SelectItem><SelectItem value="custom">Benutzerdefiniert</SelectItem></SelectContent></Select></div>
                {form.pallet_dimensions === "custom" && (<><div><Label>Länge (cm)</Label><Input value={form.custom_length} onChange={(e) => setForm({ ...form, custom_length: e.target.value })} /></div><div><Label>Breite (cm)</Label><Input value={form.custom_width} onChange={(e) => setForm({ ...form, custom_width: e.target.value })} /></div></>)}
                <div><Label>Höhe je Palette (cm) *</Label><Input value={form.height_cm} onChange={(e) => setForm({ ...form, height_cm: e.target.value })} required /></div>
                <div><Label>Gewicht je Palette (kg) *</Label><Input value={form.weight_per_pallet_kg} onChange={(e) => setForm({ ...form, weight_per_pallet_kg: e.target.value })} required /></div>
                <div><Label>Gesamtgewicht (kg)</Label><Input value={form.total_weight_kg} onChange={(e) => setForm({ ...form, total_weight_kg: e.target.value })} /></div>
              </div>
            </div>

            {/* Options */}
            <div className="card-premium p-8">
              <h2 className="text-xl font-display font-bold mb-6">Zusatzoptionen</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[{ key: "needs_liftgate", label: "Hebebühne" }, { key: "needs_avis", label: "Telefonische Avisierung" }, { key: "is_express", label: "Express-Lieferung" }, { key: "temperature_controlled", label: "Temperaturgeführt" }, { key: "needs_insurance", label: "Erweiterte Versicherung" }].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer">
                    <Checkbox checked={(form as any)[opt.key]} onCheckedChange={(c) => setForm({ ...form, [opt.key]: c })} />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6"><Label>Bemerkungen</Label><Textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} rows={4} /></div>
            </div>

            {/* Privacy & Submit */}
            <div className="card-premium p-8">
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <Checkbox checked={form.privacy_accepted} onCheckedChange={(c) => setForm({ ...form, privacy_accepted: !!c })} className="mt-1" />
                <span className="text-sm">Ich habe die <a href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a> gelesen und akzeptiere diese. *</span>
              </label>
              <Button type="submit" variant="cta" size="xl" className="w-full" disabled={loading}>
                {loading ? <div className="w-5 h-5 border-2 border-cta-foreground border-t-transparent rounded-full animate-spin" /> : <><Send className="w-5 h-5" /> Anfrage absenden</>}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
