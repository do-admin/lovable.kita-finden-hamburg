import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddKitaForm from "@/components/AddKitaForm";

const KitaHinzufuegen = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-[80px] px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Kita zur Liste hinzufügen
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Du leitest eine Kita in Hamburg oder bist als Träger verantwortlich?
            Dann kannst du hier deine Einrichtung für unser Verzeichnis vorschlagen
            oder bestehende Angaben aktualisieren. Fülle einfach das Formular aus –
            wir prüfen deine Angaben und melden uns bei Rückfragen.
          </p>
        </div>
        
        <div className="mt-8 max-w-[800px] mx-auto">
          <AddKitaForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default KitaHinzufuegen;
