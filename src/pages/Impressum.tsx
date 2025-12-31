import { Layout } from "@/components/layout/Layout";

export default function Impressum() {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl font-display font-bold mb-8">Impressum</h1>
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-display font-bold mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-muted-foreground mb-4">Metropol Spedition GmbH<br />Logistikstraße 42<br />80331 München</p>
            <h2 className="text-xl font-display font-bold mt-8 mb-4">Vertreten durch</h2>
            <p className="text-muted-foreground mb-4">Geschäftsführer: Max Mustermann</p>
            <h2 className="text-xl font-display font-bold mt-8 mb-4">Kontakt</h2>
            <p className="text-muted-foreground mb-4">Telefon: +49 89 123 456 789<br />E-Mail: info@metropol-spedition.de</p>
            <h2 className="text-xl font-display font-bold mt-8 mb-4">Registereintrag</h2>
            <p className="text-muted-foreground mb-4">Eintragung im Handelsregister.<br />Registergericht: Amtsgericht München<br />Registernummer: HRB 123456</p>
            <h2 className="text-xl font-display font-bold mt-8 mb-4">Umsatzsteuer-ID</h2>
            <p className="text-muted-foreground mb-4">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE123456789</p>
            <p className="text-sm text-muted-foreground mt-12">Stand: Dezember 2024</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
