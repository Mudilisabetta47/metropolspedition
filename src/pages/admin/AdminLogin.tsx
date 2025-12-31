import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login fehlgeschlagen", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    // Check if user has admin role
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
    if (!roleData) {
      await supabase.auth.signOut();
      toast({ title: "Zugriff verweigert", description: "Sie haben keine Admin-Berechtigung.", variant: "destructive" });
      setLoading(false);
      return;
    }
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary-foreground">Admin Login</h1>
          <p className="text-primary-foreground/70">Metropol Spedition</p>
        </div>

        <form onSubmit={handleLogin} className="card-premium p-8 space-y-6">
          <div>
            <Label className="text-foreground">E-Mail</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="admin@metropol-spedition.de" required />
            </div>
          </div>
          <div>
            <Label className="text-foreground">Passwort</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" placeholder="••••••••" required />
            </div>
          </div>
          <Button type="submit" variant="cta" className="w-full" disabled={loading}>
            {loading ? <div className="w-5 h-5 border-2 border-cta-foreground border-t-transparent rounded-full animate-spin" /> : "Anmelden"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
