import { Button } from "./ui/button";

const Hero = () => {
  const scrollToSearch = () => {
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCriteria = () => {
    document.getElementById("criteria")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-muted/20">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h1 className="mb-6">Kita finden in Hamburg – schnell, transparent und nach Stadtteilen sortiert</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Mit „Kita finden Hamburg" erhalten Sie einen klar strukturierten Überblick über die Kindertagesstätten in Hamburg. Filtern Sie Kitas nach Bezirk und Stadtteil, vergleichen Sie pädagogische Schwerpunkte und finden Sie Einrichtungen, die wirklich zu Ihrem Kind und Ihrem Alltag passen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={scrollToSearch}>
              Kitas in Hamburg anzeigen
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToCriteria}>
              Erweiterte Suche öffnen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
