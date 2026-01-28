import { Button } from "./ui/button";
import { Star, Heart, Users, Search } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/kitas?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/kitas");
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] bg-[#f8fafc] overflow-hidden">
      {/* Subtle background watermark */}
      <div 
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-[5%] pt-[100px] pb-[80px] lg:pt-[120px] lg:pb-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center">
          
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold leading-[1.08] tracking-tight text-[#0f172a]">
              Finde die passende Kita in Hamburg
            </h1>
            
            <p className="mt-6 lg:mt-8 text-[18px] md:text-[22px] lg:text-[24px] font-normal leading-[1.45] text-[#334155] max-w-[560px] mx-auto lg:mx-0">
              Vergleiche Kitas in allen Hamburger Bezirken und finde Schritt für Schritt die Betreuung, die wirklich zu deinem Alltag und deinem Kind passt.
            </p>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 lg:mt-10 flex w-full sm:max-w-[480px] mx-auto lg:mx-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Stadtteil, Adresse oder Kita-Name …"
                  className="w-full h-[56px] lg:h-[60px] pl-12 pr-4 rounded-l-full border border-r-0 border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button 
                type="submit"
                className="h-[56px] lg:h-[60px] px-6 lg:px-8 rounded-r-full text-base lg:text-lg font-bold"
              >
                Kitas anzeigen
              </Button>
            </form>

          </div>

          {/* Right column - Visual element with overlapping cards */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Main image card */}
            <div className="relative w-[85%] sm:w-[320px] lg:w-[380px] lg:-ml-[80px]">
              <div className="aspect-[3/4] rounded-[20px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] bg-gradient-to-br from-primary/10 to-primary/5">
                <img 
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80" 
                  alt="Kinder in einer Kita" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay stats card */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-card rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] p-4 sm:p-5 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">4,7</p>
                      <p className="text-xs text-muted-foreground">Ø Bewertung</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">92%</p>
                      <p className="text-xs text-muted-foreground">Zufriedenheit</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary floating card */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-card rounded-xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] p-3 sm:p-4 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">+120</p>
                    <p className="text-[10px] text-muted-foreground">Kitas gelistet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          className="relative block w-full h-[100px] lg:h-[120px]"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,40 1200,80 L1200,120 L0,120 Z" 
            className="fill-[#e0f2fe]"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
