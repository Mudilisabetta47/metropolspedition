import { motion } from "framer-motion";
import {
  FileText,
  Route,
  Truck,
  MapPin,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Anfrage",
    description: "Senden Sie uns Ihre Transportanfrage online oder telefonisch.",
  },
  {
    icon: Route,
    title: "Planung",
    description: "Wir planen die optimale Route und disponieren das passende Fahrzeug.",
  },
  {
    icon: Truck,
    title: "Abholung",
    description: "Unser Fahrer holt die Ware termingerecht bei Ihnen ab.",
  },
  {
    icon: MapPin,
    title: "Tracking",
    description: "Verfolgen Sie Ihre Sendung in Echtzeit über unser Tracking-Portal.",
  },
  {
    icon: CheckCircle,
    title: "Zustellung",
    description: "Pünktliche Zustellung beim Empfänger mit Zustellnachweis.",
  },
];

export function Process() {
  return (
    <section className="section-padding bg-secondary/30">
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
            So funktioniert's
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            In 5 Schritten zu Ihrer Lieferung
          </h2>
          <p className="text-muted-foreground text-lg">
            Einfach, transparent und effizient – unser bewährter Prozess für
            zuverlässige Transporte.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number & Icon */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-background shadow-lg border border-border flex items-center justify-center mb-4 relative z-10">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shadow-glow">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
