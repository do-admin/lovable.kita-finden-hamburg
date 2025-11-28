import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import logoIcon from "@/assets/logo-icon.png";
import heroBackground from "@/assets/hero-background.png";
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
      <div className="container mx-auto max-w-[1200px] px-6 pt-[96px] pb-[64px] text-center relative">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-[0.08] bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />

        {/* Logo */}
        <img src={logoIcon} alt="KITAKOMPASS" className="mx-auto mb-10 h-16 relative z-10" />

        {/* Headline */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground relative z-10">
          Finde die passende Kita in Hamburg
        </h1>

        {/* Subline */}
        <p className="mt-6 max-w-[700px] mx-auto text-lg text-muted-foreground leading-relaxed relative z-10">
          Vergleiche Kitas in allen Hamburger Bezirken und finde Schritt für Schritt die Betreuung, die wirklich zu deinem Alltag und deinem Kind passt.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="mt-12 max-w-[640px] mx-auto flex gap-3 relative z-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Stadtteil, Adresse oder Kita-Namen eingeben …"
            className="flex-1 border border-border rounded-full px-5 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button 
            type="submit"
            className="px-6 py-3 rounded-full font-medium"
          >
            Kitas anzeigen
          </Button>
        </form>

        {/* Bezirke Shortcuts */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 relative z-10">
          {districts.map((district) => (
            <Badge
              key={district}
              variant="outline"
              onClick={() => handleDistrictClick(district)}
              className="cursor-pointer hover:bg-muted transition-colors px-3.5 py-1.5 rounded-full text-sm"
            >
              {district}
            </Badge>
          ))}
          <Badge
            variant="secondary"
            onClick={handleShowAll}
            className="cursor-pointer hover:bg-secondary/80 transition-colors px-3.5 py-1.5 rounded-full text-sm font-medium"
          >
            Alle Stadtteile anzeigen
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default Hero;
