import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Truck, Package, Zap, Clock, Building2, MapPin, Shield, ThermometerSun, RotateCcw, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  { icon: Truck, title: "Nahverkehr", desc: "Regionale Transporte in Ihrem Einzugsgebiet mit täglichen Touren und flexiblen Zeitfenstern." },
  { icon: Package, title: "Stückgut", desc: "Effiziente Teilladungen und Sammelguttransporte für Ihre täglichen Versandanforderungen." },
  { icon: Building2, title: "Palettentransport", desc: "Professioneller Transport von Euro- und Industriepaletten mit modernster Flotte." },
  { icon: Zap, title: "Express", desc: "Same-Day und Direktfahrten für eilige Sendungen – noch am selben Tag beim Empfänger." },
  { icon: Clock, title: "Zeitfenster", desc: "Präzise Zustellung in Ihrem Wunschzeitfenster mit telefonischer Avisierung." },
];

const extras = [
  { icon: MapPin, title: "Hebebühne", desc: "Fahrzeuge mit Hebebühne für ebenerdige Be- und Entladung." },
  { icon: Phone, title: "Avisierung", desc: "Telefonische Ankündigung vor Anlieferung." },
  { icon: RotateCcw, title: "Retouren", desc: "Unkomplizierte Rückholung und Retourenmanagement." },
  { icon: ThermometerSun, title: "Temperaturgeführt", desc: "Transporte mit Temperaturüberwachung auf Anfrage." },
  { icon: Shield, title: "Versicherung", desc: "Erweiterte Transportversicherung für hochwertige Güter." },
];

export default function Leistungen() {
  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Unsere Leistungen</h1>
            <p className="text-xl text-primary-foreground/70">Maßgeschneiderte Logistiklösungen für Industrie, Handel und E-Commerce.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-premium p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <s.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-display font-bold text-center mb-12">Zusatzservices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {extras.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-secondary/50">
                <e.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{e.title}</h4>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="cta" size="lg"><Link to="/angebot">Jetzt Angebot anfordern</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
