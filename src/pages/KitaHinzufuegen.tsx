import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddKitaForm from "@/components/AddKitaForm";

const KitaHinzufuegen = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Kita hinzufügen</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Kennst du eine Kita, die noch nicht in unserer Liste ist? Hilf uns, unser Verzeichnis zu vervollständigen.
          </p>
        </div>
      </div>
      <AddKitaForm />
      <Footer />
    </div>
  );
};

export default KitaHinzufuegen;
