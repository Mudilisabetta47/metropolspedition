import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Handshake, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function PartnerAngebot() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ company_name: "", contact_person: "", email: "", phone: "", region: "", pricing_details: "", validity_date: "", privacy_accepted: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy_accepted) { toast({ title: "Bitte akzeptieren Sie die Datenschutzerklärung", variant: "destructive" }); return; }
    setLoading(true);
    const { error } = await supabase.from("partner_offers").insert({ ...form, validity_date: form.validity_date || null });
    setLoading(false);
    if (error) { toast({ title: "Fehler", description: error.message, variant: "destructive" }); }
    else { setSuccess(true); }
  };

  if (success) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen flex items-center">
          <div className="container-custom text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle className="w-12 h-12 text-success" /></motion.div>
            <h1 className="text-4xl font-display font-bold mb-4">Vielen Dank!</h1>
            <p className="text-xl text-muted-foreground mb-8">Ihr Angebot wurde erfolgreich übermittelt.</p>
            <Button asChild variant="outline"><a href="/">Zurück zur Startseite</a></Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Handshake className="w-16 h-16 text-accent mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Partner werden</h1>
            <p className="text-xl text-primary-foreground/70">Senden Sie uns Ihre Konditionen und werden Sie Teil unseres Netzwerks.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-2xl">
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div><Label>Firma *</Label><Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} required /></div>
              <div><Label>Ansprechpartner *</Label><Input value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} required /></div>
              <div><Label>E-Mail *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
              <div><Label>Telefon</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            </div>
            <div><Label>Region / Einzugsgebiet *</Label><Input placeholder="z.B. Großraum München, Bayern, Süddeutschland" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} required /></div>
            <div><Label>Preise / Konditionen *</Label><Textarea placeholder="Beschreiben Sie Ihre Preisstruktur, Kapazitäten und Services..." value={form.pricing_details} onChange={(e) => setForm({ ...form, pricing_details: e.target.value })} rows={5} required /></div>
            <div><Label>Gültigkeit bis</Label><Input type="date" value={form.validity_date} onChange={(e) => setForm({ ...form, validity_date: e.target.value })} /></div>
            <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={form.privacy_accepted} onCheckedChange={(c) => setForm({ ...form, privacy_accepted: !!c })} className="mt-1" /><span className="text-sm">Ich akzeptiere die <a href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a>. *</span></label>
            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>{loading ? <div className="w-5 h-5 border-2 border-cta-foreground border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Angebot senden</>}</Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
