import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Users, Target, Award, TrendingUp } from "lucide-react";

const values = [
  { icon: Target, title: "Zuverlässigkeit", desc: "Pünktlichkeit und Termintreue sind unser höchstes Gebot." },
  { icon: Users, title: "Partnerschaft", desc: "Langfristige Kundenbeziehungen durch persönlichen Service." },
  { icon: Award, title: "Qualität", desc: "Höchste Standards bei Sicherheit und Servicequalität." },
  { icon: TrendingUp, title: "Innovation", desc: "Moderne Technologie für effiziente Logistikprozesse." },
];

export default function UeberUns() {
  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Über Metropol Spedition</h1>
            <p className="text-xl text-primary-foreground/70">Seit 2005 Ihr zuverlässiger Partner für Nahverkehr und Palettenlogistik in Deutschland.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold mb-6">Unser Unternehmen</h2>
              <p className="text-muted-foreground mb-4">Die Metropol Spedition wurde 2005 in München gegründet und hat sich seitdem zu einem führenden Anbieter für Nahverkehrslogistik im süddeutschen Raum entwickelt.</p>
              <p className="text-muted-foreground mb-4">Mit einer modernen Flotte von über 50 Fahrzeugen und einem erfahrenen Team von Logistikexperten bieten wir maßgeschneiderte Transportlösungen für Industrie, Handel und E-Commerce.</p>
              <p className="text-muted-foreground">Unser Fokus liegt auf Zuverlässigkeit, Flexibilität und persönlichem Service – Werte, die uns zu einem vertrauenswürdigen Partner für über 500 Unternehmen gemacht haben.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-6">
              {[{ value: "50+", label: "Fahrzeuge" }, { value: "500+", label: "Kunden" }, { value: "98%", label: "Pünktlichkeit" }, { value: "18", label: "Jahre Erfahrung" }].map((stat) => (
                <div key={stat.label} className="card-premium p-6 text-center">
                  <div className="text-4xl font-display font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <h2 className="text-3xl font-display font-bold text-center mb-12">Unsere Werte</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4"><v.icon className="w-8 h-8 text-accent" /></div>
                <h3 className="font-display font-bold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
