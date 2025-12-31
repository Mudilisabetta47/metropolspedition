import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Truck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Palettenrechner", href: "/palettenrechner" },
  { label: "Tracking", href: "/tracking" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                <Truck className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-display font-bold text-lg leading-tight transition-colors",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}>
                Metropol
              </span>
              <span className={cn(
                "text-xs font-medium tracking-wider uppercase transition-colors",
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              )}>
                Spedition
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? isScrolled
                      ? "text-accent bg-accent/10"
                      : "text-accent bg-accent/20"
                    : isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant={isScrolled ? "outline" : "heroOutline"}
              size="sm"
            >
              <Link to="/tracking">Sendung verfolgen</Link>
            </Button>
            <Button asChild variant="cta" size="sm">
              <Link to="/angebot">Angebot anfordern</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled
                ? "text-foreground hover:bg-secondary"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-background border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 px-4 space-y-3 border-t border-border">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/tracking">Sendung verfolgen</Link>
                  </Button>
                  <Button asChild variant="cta" className="w-full">
                    <Link to="/angebot">Angebot anfordern</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
