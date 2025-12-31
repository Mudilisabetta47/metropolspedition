import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Kontakt() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", privacy_accepted: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy_accepted) { toast({ title: "Bitte akzeptieren Sie die Datenschutzerklärung", variant: "destructive" }); return; }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    setLoading(false);
    if (error) { toast({ title: "Fehler", description: error.message, variant: "destructive" }); }
    else { setSuccess(true); }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Kontakt</h1>
            <p className="text-xl text-primary-foreground/70">Wir freuen uns auf Ihre Nachricht.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              {[{ icon: Phone, title: "Telefon", content: "+49 89 123 456 789", href: "tel:+4989123456789" }, { icon: Mail, title: "E-Mail", content: "info@metropol-spedition.de", href: "mailto:info@metropol-spedition.de" }, { icon: MapPin, title: "Adresse", content: "Logistikstraße 42\n80331 München" }].map((item) => (
                <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium p-6">
                  <item.icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display font-bold mb-1">{item.title}</h3>
                  {item.href ? <a href={item.href} className="text-muted-foreground hover:text-accent">{item.content}</a> : <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>}
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {success ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-premium p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                  <h2 className="text-2xl font-display font-bold mb-2">Nachricht gesendet!</h2>
                  <p className="text-muted-foreground">Wir melden uns in Kürze bei Ihnen.</p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                    <div><Label>E-Mail *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                    <div><Label>Telefon</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                    <div><Label>Betreff</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
                  </div>
                  <div><Label>Nachricht *</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required /></div>
                  <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={form.privacy_accepted} onCheckedChange={(c) => setForm({ ...form, privacy_accepted: !!c })} className="mt-1" /><span className="text-sm">Ich akzeptiere die <a href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a>. *</span></label>
                  <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? <div className="w-5 h-5 border-2 border-cta-foreground border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Absenden</>}</Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
