import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Hero = () => {
  const districts = [
    "Altona",
    "Hamburg-Mitte", 
    "Eimsbüttel",
    "Hamburg-Nord",
    "Wandsbek",
    "Bergedorf",
    "Harburg"
  ];

  return (
    <section className="w-full bg-background">
      <div className="pt-[120px] md:pt-[160px] pb-[80px] px-5 md:px-6 lg:px-8">
        <div className="max-w-[640px] mx-auto text-center">
          {/* Logo */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              kita-finden-hamburg.de
            </h2>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-5">
            <div className="relative">
              <Search className="absolute left-[22px] top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Stadtteil, Adresse oder Kita-Namen eingeben …"
                className="w-full h-[56px] pl-14 pr-32 py-4 px-[22px] rounded-full border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button 
                className="absolute right-1 top-1 bottom-1 px-6 rounded-full"
              >
                Suchen
              </Button>
            </div>
          </div>
          
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-[6px] mb-12">
            {districts.map((district) => (
              <Badge
                key={district}
                variant="outline"
                className="cursor-pointer hover:bg-muted transition-colors px-3.5 py-1.5 rounded-full text-sm my-[6px]"
              >
                {district}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 transition-colors px-3.5 py-1.5 rounded-full text-sm font-medium my-[6px]"
            >
              Alle Stadtteile anzeigen
            </Badge>
          </div>
          
          {/* H1 */}
          <h1 className="text-[36px] md:text-[44px] font-bold leading-tight mb-6">
            Kita finden in Hamburg
          </h1>
          
          {/* Body Text */}
          <p className="text-lg leading-relaxed text-muted-foreground max-w-[600px] mx-auto">
            Mit kita-finden-hamburg.de erhalten Sie eine klare, unabhängige Übersicht über Kitas in allen Hamburger Bezirken und Stadtteilen.
            Filtern Sie nach Standort, Konzept und Öffnungszeiten – und finden Sie Schritt für Schritt eine Betreuung, die zu Ihrem Alltag und Ihrem Kind passt.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
