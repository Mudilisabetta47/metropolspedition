import { Link } from "react-router-dom";
import { Truck, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { label: "Nahverkehr", href: "/leistungen" },
    { label: "Stückgut", href: "/leistungen" },
    { label: "Palettentransport", href: "/leistungen" },
    { label: "Express-Lieferung", href: "/leistungen" },
    { label: "B2B-Distribution", href: "/leistungen" },
  ],
  company: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Karriere", href: "/kontakt" },
  ],
  tools: [
    { label: "Sendungsverfolgung", href: "/tracking" },
    { label: "Palettenrechner", href: "/palettenrechner" },
    { label: "Angebot anfordern", href: "/angebot" },
    { label: "Partner werden", href: "/partner-angebot" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-primary-foreground">
                  Metropol
                </span>
                <span className="text-xs font-medium tracking-wider uppercase text-primary-foreground/70">
                  Spedition
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 max-w-sm mb-6 leading-relaxed">
              Ihr zuverlässiger Partner für Nahverkehr und Palettenlogistik in
              Deutschland. Pünktlich, sicher, effizient.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+4989123456789"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+49 89 123 456 789</span>
              </a>
              <a
                href="mailto:info@metropol-spedition.de"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@metropol-spedition.de</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>Logistikstraße 42, 80331 München</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50 mb-4">
              Leistungen
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50 mb-4">
              Tools & Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50 mb-4">
              Unternehmen
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Metropol Spedition GmbH. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/impressum"
              className="text-primary-foreground/50 hover:text-accent text-sm transition-colors"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              className="text-primary-foreground/50 hover:text-accent text-sm transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
