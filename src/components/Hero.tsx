import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import logoIcon from "@/assets/logo-icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const districts = [
    "Altona",
    "Hamburg-Mitte", 
    "Eimsbüttel",
    "Hamburg-Nord",
    "Wandsbek",
    "Bergedorf",
    "Harburg"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/kitas?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleDistrictClick = (district: string) => {
    navigate(`/kitas?stadtteil=${encodeURIComponent(district)}`);
  };

  const handleShowAll = () => {
    navigate('/kitas');
  };

  return (
    <section className="w-full bg-background">
      <div className="pt-[70px] md:pt-[100px] pb-[80px] px-5 md:px-6 lg:px-8">
        <div className="max-w-[640px] mx-auto text-center">
          {/* Logo */}
          <div className="mb-10 flex flex-col items-center">
            <img src={logoIcon} alt="KITAKOMPASS" className="h-[120px] md:h-[160px] mb-6" />
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Kita-Suche für Hamburg
            </p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-5">
            <div className="relative">
              <Search className="absolute left-[22px] top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Stadtteil, Adresse oder Kita-Namen eingeben …"
                className="w-full h-[56px] pl-14 pr-32 py-4 px-[22px] rounded-full border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-6 rounded-full"
              >
                Kitas anzeigen
              </Button>
            </div>
          </form>
          
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-[6px] mb-12">
            {districts.map((district) => (
              <Badge
                key={district}
                variant="outline"
                onClick={() => handleDistrictClick(district)}
                className="cursor-pointer hover:bg-muted transition-colors px-3.5 py-1.5 rounded-full text-sm my-[6px]"
              >
                {district}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              onClick={handleShowAll}
              className="cursor-pointer hover:bg-secondary/80 transition-colors px-3.5 py-1.5 rounded-full text-sm font-medium my-[6px]"
            >
              Alle Stadtteile anzeigen
            </Badge>
          </div>
          
          {/* H1 */}
          <h1 className="text-[36px] md:text-[44px] font-bold leading-tight mb-6">
            Finde die passende Kita in Hamburg
          </h1>
          
          {/* Body Text */}
          <p className="text-lg leading-relaxed text-muted-foreground max-w-[600px] mx-auto">
            Vergleiche Kitas in allen Hamburger Bezirken und finde Schritt für Schritt die Betreuung, die wirklich zu deinem Alltag und deinem Kind passt.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
