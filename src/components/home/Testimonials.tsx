import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thomas Müller",
    role: "Logistikleiter",
    company: "Maier Maschinenbau GmbH",
    content:
      "Seit Jahren unser zuverlässiger Partner für regionale Transporte. Die Pünktlichkeit und Flexibilität von Metropol ist unübertroffen.",
    rating: 5,
  },
  {
    name: "Sandra Weber",
    role: "Supply Chain Manager",
    company: "TechParts Distribution",
    content:
      "Besonders die kurzfristigen Express-Lieferungen funktionieren reibungslos. Das Tracking-System ist transparent und einfach zu bedienen.",
    rating: 5,
  },
  {
    name: "Michael Hoffmann",
    role: "Geschäftsführer",
    company: "Hoffmann E-Commerce Solutions",
    content:
      "Perfekt für unsere B2B-Distribution. Die Zeitfenster-Zustellung und der professionelle Service machen den Unterschied.",
    rating: 5,
  },
];

const certifications = [
  { name: "ISO 9001", label: "Qualitätsmanagement" },
  { name: "GDP", label: "Good Distribution Practice" },
  { name: "AEO", label: "Zugelassener Wirtschaftsbeteiligter" },
  { name: "SQAS", label: "Safety & Quality Assessment" },
];

export function Testimonials() {
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
            Kundenstimmen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Was unsere Kunden sagen
          </h2>
          <p className="text-muted-foreground text-lg">
            Vertrauen Sie auf die Erfahrung unserer zufriedenen Geschäftskunden.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-cta text-cta"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">
              Zertifiziert & Geprüft
            </h3>
            <p className="text-primary-foreground/70">
              Höchste Standards für Qualität und Sicherheit
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <div className="text-2xl font-display font-bold text-accent mb-1">
                  {cert.name}
                </div>
                <div className="text-xs text-primary-foreground/60">
                  {cert.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
