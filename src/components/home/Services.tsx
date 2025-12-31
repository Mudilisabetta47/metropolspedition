import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  Zap,
  Clock,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Truck,
    title: "Nahverkehr",
    description:
      "Regionale Transporte in Ihrer Region – schnell und flexibel innerhalb von 24 Stunden.",
    features: ["24h Zustellung", "Flexible Zeitfenster", "Tägliche Touren"],
  },
  {
    icon: Package,
    title: "Stückgut",
    description:
      "Effiziente Teilladungen und Sammelgut für Ihre täglichen Versandanforderungen.",
    features: ["Gebündelte Sendungen", "Kosteneffizient", "Regelmäßige Abholung"],
  },
  {
    icon: Building2,
    title: "Palettentransport",
    description:
      "Professioneller Transport von Euro- und Industriepaletten mit modernster Flotte.",
    features: ["Europaletten", "Industriepaletten", "Sondermaße"],
  },
  {
    icon: Zap,
    title: "Express",
    description:
      "Eilige Sendungen? Unser Express-Service bringt Ihre Ware noch am selben Tag.",
    features: ["Same-Day Delivery", "Direktfahrten", "Prioritäts-Handling"],
  },
  {
    icon: Clock,
    title: "Zeitfenster-Zustellung",
    description:
      "Präzise Lieferung in Ihrem Wunschzeitfenster – pünktlich auf die Minute.",
    features: ["Termintreue", "Avisierung", "Live-Tracking"],
  },
];

export function Services() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Logistik-Lösungen für Ihr Business
          </h2>
          <p className="text-muted-foreground text-lg">
            Maßgeschneiderte Transport- und Logistikservices für Industrie,
            Handel und E-Commerce. Zuverlässig, effizient, regional.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group card-premium p-8 hover:border-accent/30"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-glow transition-all duration-300">
                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-primary text-primary-foreground rounded-xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-display font-bold mb-4">
                Individuelle Lösung gesucht?
              </h3>
              <p className="text-primary-foreground/70 mb-8">
                Wir entwickeln maßgeschneiderte Logistikkonzepte für Ihre
                speziellen Anforderungen.
              </p>
            </div>
            <Button asChild variant="cta" className="w-full group">
              <Link to="/kontakt">
                Jetzt beraten lassen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link to="/leistungen" className="group">
              Alle Leistungen entdecken
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
