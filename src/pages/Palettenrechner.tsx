import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const palletTypes = [
  { value: "euro", label: "Europalette", length: 120, width: 80 },
  { value: "industrial", label: "Industriepalette", length: 120, width: 100 },
  { value: "custom", label: "Benutzerdefiniert", length: 0, width: 0 },
];

export default function Palettenrechner() {
  const navigate = useNavigate();
  const [type, setType] = useState("euro");
  const [length, setLength] = useState(120);
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(100);
  const [weight, setWeight] = useState(500);
  const [count, setCount] = useState(1);

  const selected = palletTypes.find((p) => p.value === type);
  const l = type === "custom" ? length : selected?.length || 120;
  const w = type === "custom" ? width : selected?.width || 80;

  const areaPerPallet = (l * w) / 10000;
  const totalArea = areaPerPallet * count;
  const volumePerPallet = (l * w * height) / 1000000;
  const totalVolume = volumePerPallet * count;
  const totalWeight = weight * count;
  const truckCapacity = 33;
  const estimatedTrucks = Math.ceil(count / truckCapacity);

  const handleRequestQuote = () => {
    const params = new URLSearchParams({
      pallet_count: count.toString(),
      pallet_dimensions: type === "custom" ? `${l}x${w}` : `${l}x${w}`,
      height_cm: height.toString(),
      weight_per_pallet_kg: weight.toString(),
    });
    navigate(`/angebot?${params.toString()}`);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <Calculator className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">Palettenrechner</h1>
            <p className="text-xl text-primary-foreground/70">Berechnen Sie Ladevolumen, Fläche und Gewicht für Ihre Palettensendung.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-premium p-8">
              <h2 className="text-2xl font-display font-bold mb-6">Eingaben</h2>
              <div className="space-y-6">
                <div>
                  <Label>Palettentyp</Label>
                  <Select value={type} onValueChange={(v) => { setType(v); const p = palletTypes.find((x) => x.value === v); if (p && v !== "custom") { setLength(p.length); setWidth(p.width); } }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{palletTypes.map((p) => (<SelectItem key={p.value} value={p.value}>{p.label} {p.length > 0 && `(${p.length}x${p.width} cm)`}</SelectItem>))}</SelectContent>
                  </Select>
                </div>

                {type === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Länge (cm)</Label><Input type="number" value={length} onChange={(e) => setLength(+e.target.value)} /></div>
                    <div><Label>Breite (cm)</Label><Input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} /></div>
                  </div>
                )}

                <div><Label>Höhe je Palette (cm)</Label><Input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} /></div>
                <div><Label>Gewicht je Palette (kg)</Label><Input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} /></div>
                <div><Label>Anzahl Paletten</Label><Input type="number" value={count} onChange={(e) => setCount(+e.target.value)} min={1} /></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="card-premium p-8 bg-accent/5 border-accent/20">
                <h2 className="text-2xl font-display font-bold mb-6">Ergebnis</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground">Grundfläche je Palette</span><span className="font-bold">{areaPerPallet.toFixed(2)} m²</span></div>
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground">Gesamtgrundfläche</span><span className="font-bold">{totalArea.toFixed(2)} m²</span></div>
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground">Volumen je Palette</span><span className="font-bold">{volumePerPallet.toFixed(2)} m³</span></div>
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground">Gesamtvolumen</span><span className="font-bold text-accent">{totalVolume.toFixed(2)} m³</span></div>
                  <div className="flex justify-between py-3 border-b border-border"><span className="text-muted-foreground">Gesamtgewicht</span><span className="font-bold text-accent">{totalWeight.toLocaleString("de-DE")} kg</span></div>
                  <div className="flex justify-between py-3"><span className="text-muted-foreground">Geschätzte LKW-Anzahl</span><span className="font-bold">{estimatedTrucks} Sattelzug(züge)</span></div>
                </div>
                <div className="mt-4 p-3 bg-secondary rounded-lg flex gap-2 text-sm text-muted-foreground"><Info className="w-4 h-4 mt-0.5 flex-shrink-0" />Richtwert basierend auf 33 Europaletten pro 13,6m Sattelzug. Exakte Planung nach Rücksprache.</div>
              </div>

              <Button onClick={handleRequestQuote} variant="cta" size="xl" className="w-full group">
                Mit diesen Daten Angebot anfordern
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
