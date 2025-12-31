import { Layout } from "@/components/layout/Layout";

export default function Datenschutz() {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl font-display font-bold mb-8">Datenschutzerklärung</h1>
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-display font-bold mb-4">1. Datenschutz auf einen Blick</h2>
              <p className="text-muted-foreground">Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb unseres Onlineangebotes auf.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-bold mb-4">2. Verantwortlicher</h2>
              <p className="text-muted-foreground">Metropol Spedition GmbH<br />Logistikstraße 42<br />80331 München<br />E-Mail: datenschutz@metropol-spedition.de</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-bold mb-4">3. Erhobene Daten</h2>
              <p className="text-muted-foreground">Wir erheben personenbezogene Daten nur, wenn Sie uns diese im Rahmen einer Anfrage oder Bestellung freiwillig mitteilen. Dies umfasst: Name, Firma, E-Mail-Adresse, Telefonnummer, Adressen und Sendungsinformationen.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-bold mb-4">4. Ihre Rechte</h2>
              <p className="text-muted-foreground">Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-bold mb-4">5. Kontakt</h2>
              <p className="text-muted-foreground">Bei Fragen zum Datenschutz wenden Sie sich bitte an: datenschutz@metropol-spedition.de</p>
            </section>
            <p className="text-sm text-muted-foreground mt-12">Stand: Dezember 2024</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
