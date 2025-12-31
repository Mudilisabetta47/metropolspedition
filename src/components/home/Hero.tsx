import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
export function Hero() {
  return <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
        backgroundImage: "url(\"/lovable-uploads/1bae4a53-9580-4613-afa5-ceae6e916561.webp\")"
      }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse animation-delay-300 bg-success text-primary-foreground" />

      <div className="container-custom relative z-10 pt-322 pb-20 opacity-95 shadow-sm">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium border border-accent/30">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Nahverkehr-Spezialist seit 2005
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Nahverkehr-Logistik,
            <br />
            <span className="text-gradient">die pünktlich liefert.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-10 leading-relaxed">
            Paletten, Stückgut und Express-Sendungen – schnell, sicher und
            zuverlässig in Ihrer Region. Vertrauen Sie dem Spezialisten für
            B2B-Distribution im Nahverkehr.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="cta" size="xl">
              <Link to="/angebot" className="group">
                Angebot anfordern
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/tracking">Sendung verfolgen</Link>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{
            icon: Package,
            value: "5.000+",
            label: "Paletten/Monat"
          }, {
            icon: Truck,
            value: "98%",
            label: "Pünktlichkeit"
          }, {
            icon: MapPin,
            value: "24h",
            label: "Regionale Zustellung"
          }, {
            icon: Package,
            value: "50+",
            label: "Fahrzeuge"
          }].map((stat, index) => <div key={index} className="flex items-center gap-3 bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-primary-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-primary-foreground/60">
                    {stat.label}
                  </div>
                </div>
              </div>)}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
}