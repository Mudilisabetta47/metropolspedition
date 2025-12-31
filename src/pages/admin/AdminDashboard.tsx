import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, FileText, Handshake, LogOut, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) { navigate("/admin"); return; }
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", data.session.user.id).eq("role", "admin").maybeSingle();
    if (!roleData) { navigate("/admin"); }
  };

  const fetchData = async () => {
    const [q, o, s] = await Promise.all([
      supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("partner_offers").select("*").order("created_at", { ascending: false }),
      supabase.from("tracking_shipments").select("*").order("created_at", { ascending: false }),
    ]);
    setQuotes(q.data || []);
    setOffers(o.data || []);
    setShipments(s.data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Truck className="w-8 h-8 text-accent" />
          <span className="font-display font-bold text-xl">Admin Dashboard</span>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:text-accent"><LogOut className="w-4 h-4 mr-2" /> Abmelden</Button>
      </header>

      <main className="container-custom py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-6 mb-8">
          {[{ icon: FileText, label: "Angebotsanfragen", count: quotes.length, color: "bg-accent" }, { icon: Handshake, label: "Partnerangebote", count: offers.length, color: "bg-cta" }, { icon: Package, label: "Sendungen", count: shipments.length, color: "bg-success" }].map((stat) => (
            <div key={stat.label} className="card-premium p-6 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center`}><stat.icon className="w-7 h-7 text-white" /></div>
              <div><div className="text-3xl font-display font-bold">{stat.count}</div><div className="text-muted-foreground">{stat.label}</div></div>
            </div>
          ))}
        </motion.div>

        <Tabs defaultValue="quotes">
          <TabsList className="mb-6"><TabsTrigger value="quotes">Angebotsanfragen</TabsTrigger><TabsTrigger value="offers">Partnerangebote</TabsTrigger><TabsTrigger value="shipments">Sendungen</TabsTrigger></TabsList>

          <TabsContent value="quotes">
            <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary"><tr><th className="p-4 text-left text-sm font-semibold">Datum</th><th className="p-4 text-left text-sm font-semibold">Firma</th><th className="p-4 text-left text-sm font-semibold">Kontakt</th><th className="p-4 text-left text-sm font-semibold">Route</th><th className="p-4 text-left text-sm font-semibold">Paletten</th><th className="p-4 text-left text-sm font-semibold">Status</th></tr></thead>
                  <tbody>{quotes.map((q) => (<tr key={q.id} className="border-t border-border hover:bg-secondary/50"><td className="p-4 text-sm">{new Date(q.created_at).toLocaleDateString("de-DE")}</td><td className="p-4 text-sm font-medium">{q.company_name}</td><td className="p-4 text-sm">{q.contact_person}<br /><span className="text-muted-foreground">{q.email}</span></td><td className="p-4 text-sm">{q.pickup_zip} → {q.delivery_zip}</td><td className="p-4 text-sm">{q.pallet_count}x</td><td className="p-4"><span className="px-2 py-1 rounded-full text-xs bg-warning/20 text-warning">{q.status}</span></td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary"><tr><th className="p-4 text-left text-sm font-semibold">Datum</th><th className="p-4 text-left text-sm font-semibold">Firma</th><th className="p-4 text-left text-sm font-semibold">Region</th><th className="p-4 text-left text-sm font-semibold">Gültigkeit</th><th className="p-4 text-left text-sm font-semibold">Status</th></tr></thead>
                  <tbody>{offers.map((o) => (<tr key={o.id} className="border-t border-border hover:bg-secondary/50"><td className="p-4 text-sm">{new Date(o.created_at).toLocaleDateString("de-DE")}</td><td className="p-4 text-sm font-medium">{o.company_name}<br /><span className="text-muted-foreground">{o.email}</span></td><td className="p-4 text-sm">{o.region}</td><td className="p-4 text-sm">{o.validity_date ? new Date(o.validity_date).toLocaleDateString("de-DE") : "-"}</td><td className="p-4"><span className="px-2 py-1 rounded-full text-xs bg-accent/20 text-accent">{o.status}</span></td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipments">
            <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary"><tr><th className="p-4 text-left text-sm font-semibold">Tracking-ID</th><th className="p-4 text-left text-sm font-semibold">Absender</th><th className="p-4 text-left text-sm font-semibold">Empfänger</th><th className="p-4 text-left text-sm font-semibold">Route</th><th className="p-4 text-left text-sm font-semibold">Status</th></tr></thead>
                  <tbody>{shipments.map((s) => (<tr key={s.id} className="border-t border-border hover:bg-secondary/50"><td className="p-4 text-sm font-mono">{s.tracking_id}</td><td className="p-4 text-sm">{s.sender_name}</td><td className="p-4 text-sm">{s.recipient_name}</td><td className="p-4 text-sm">{s.origin_city} → {s.destination_city}</td><td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${s.current_status === "delivered" ? "bg-success/20 text-success" : "bg-accent/20 text-accent"}`}>{s.current_status}</span></td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
