import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Search, Package, Truck, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  order_received: { label: "Auftrag erfasst", icon: Package, color: "text-muted-foreground" },
  pickup_scheduled: { label: "Abholung geplant", icon: Clock, color: "text-warning" },
  picked_up: { label: "Abgeholt", icon: Truck, color: "text-accent" },
  in_depot: { label: "Im Depot", icon: MapPin, color: "text-accent" },
  out_for_delivery: { label: "In Zustellung", icon: Truck, color: "text-cta" },
  delivered: { label: "Zugestellt", icon: CheckCircle, color: "text-success" },
};

const statusOrder = ["order_received", "pickup_scheduled", "picked_up", "in_depot", "out_for_delivery", "delivered"];

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setShipment(null);

    const { data, error } = await supabase
      .from("tracking_shipments")
      .select("*")
      .eq("tracking_id", trackingId.trim().toUpperCase())
      .maybeSingle();

    setLoading(false);
    if (error || !data) {
      setNotFound(true);
    } else {
      setShipment(data);
    }
  };

  const currentStatusIndex = shipment ? statusOrder.indexOf(shipment.current_status) : -1;

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Sendungsverfolgung</h1>
            <p className="text-xl text-primary-foreground/70 mb-10">Geben Sie Ihre Tracking-ID ein, um den Status Ihrer Sendung zu verfolgen.</p>
            <div className="flex gap-3">
              <Input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="z.B. MP-2024-001234" className="h-14 text-lg bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
              <Button onClick={handleSearch} variant="cta" size="xl" disabled={loading}>
                {loading ? <div className="w-5 h-5 border-2 border-cta-foreground border-t-transparent rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/50 mt-4">Demo-IDs: MP-2024-001234, MP-2024-001235, MP-2024-001236</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          {notFound && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Sendung nicht gefunden</h2>
              <p className="text-muted-foreground mb-6">Bitte überprüfen Sie die Tracking-ID oder kontaktieren Sie uns.</p>
              <Button asChild variant="outline"><a href="/kontakt">Kontakt aufnehmen</a></Button>
            </motion.div>
          )}

          {shipment && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card-premium p-8 mb-8">
                <div className="flex flex-wrap justify-between gap-4 mb-8">
                  <div><span className="text-sm text-muted-foreground">Tracking-ID</span><p className="font-display font-bold text-xl">{shipment.tracking_id}</p></div>
                  <div><span className="text-sm text-muted-foreground">Von</span><p className="font-semibold">{shipment.origin_city}</p></div>
                  <div><span className="text-sm text-muted-foreground">Nach</span><p className="font-semibold">{shipment.destination_city}</p></div>
                  <div><span className="text-sm text-muted-foreground">Voraussichtliche Zustellung</span><p className="font-semibold">{new Date(shipment.estimated_delivery).toLocaleDateString("de-DE")}</p></div>
                </div>

                {/* Status Stepper */}
                <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
                  {statusOrder.map((status, i) => {
                    const config = statusConfig[status];
                    const isActive = i <= currentStatusIndex;
                    const isCurrent = i === currentStatusIndex;
                    return (
                      <div key={status} className="flex flex-col items-center min-w-[80px] relative">
                        {i > 0 && <div className={`absolute top-5 right-1/2 w-full h-0.5 ${i <= currentStatusIndex ? "bg-accent" : "bg-border"}`} style={{ transform: "translateX(50%)" }} />}
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${isCurrent ? "bg-accent shadow-glow" : isActive ? "bg-accent" : "bg-secondary"}`}>
                          <config.icon className={`w-5 h-5 ${isActive ? "text-accent-foreground" : "text-muted-foreground"}`} />
                        </div>
                        <span className={`text-xs mt-2 text-center ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>{config.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Event Log */}
              <div className="card-premium p-8">
                <h3 className="text-lg font-display font-bold mb-6">Sendungsverlauf</h3>
                <div className="space-y-4">
                  {(shipment.events as any[])?.slice().reverse().map((event: any, i: number) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-0">
                      <div className="w-2 h-2 mt-2 rounded-full bg-accent" />
                      <div className="flex-1">
                        <p className="font-medium">{event.description}</p>
                        <p className="text-sm text-muted-foreground">{event.location} • {new Date(event.timestamp).toLocaleString("de-DE")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
