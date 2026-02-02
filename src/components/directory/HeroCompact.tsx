import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroCompact = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="w-full bg-white py-8 lg:py-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-foreground">
            Finde die passende Kita in Hamburg
          </h1>
          
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
            Vergleiche Kitas in allen Hamburger Bezirken und finde die Betreuung, die zu deinem Kind passt.
          </p>
          
          {/* Search bar */}
          <form id="hero-search" onSubmit={handleSearch} className="mt-5 flex w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Stadtteil, Adresse oder Kita-Name …"
                className="w-full h-11 pl-9 pr-3 rounded-l-full border border-r-0 border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button 
              type="submit"
              className="h-11 px-5 rounded-r-full text-sm font-semibold"
            >
              Suchen
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroCompact;
