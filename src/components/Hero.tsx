import { Button } from "./ui/button";
import { Search } from "lucide-react";
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
      
      {/* Abstract minimalist city map pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="city-map" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              {/* Main horizontal streets */}
              <path d="M0 75 L300 75" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
              <path d="M0 180 L300 180" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
              
              {/* Main vertical streets */}
              <path d="M90 0 L90 300" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
              <path d="M210 0 L210 300" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
              
              {/* Gently curved boulevard */}
              <path d="M0 130 Q75 115, 150 130 Q225 145, 300 130" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
              <path d="M140 0 Q155 75, 140 150 Q125 225, 140 300" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
              
              {/* Small side streets */}
              <path d="M0 40 L60 40" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M240 40 L300 40" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M0 240 L120 240" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M180 240 L300 240" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M45 0 L45 50" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M255 0 L255 50" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M45 250 L45 300" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M255 250 L255 300" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              
              {/* Intersection plaza - small square */}
              <rect x="82" y="67" width="16" height="16" stroke="#0f172a" strokeWidth="0.4" fill="none" rx="2"/>
              
              {/* Another small plaza */}
              <rect x="202" y="172" width="16" height="16" stroke="#0f172a" strokeWidth="0.4" fill="none" rx="2"/>
              
              {/* Circular plaza */}
              <circle cx="150" cy="130" r="8" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
              
              {/* Small roundabout */}
              <circle cx="90" cy="180" r="5" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <circle cx="210" cy="75" r="5" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              
              {/* Diagonal connecting street */}
              <path d="M100 85 L130 120" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              <path d="M170 140 L200 170" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
              
              {/* Curved side road */}
              <path d="M0 260 Q30 250, 45 280 L45 300" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
              <path d="M300 260 Q270 250, 255 280 L255 300" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#city-map)" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-[5%] pt-[100px] pb-[80px] lg:pt-[120px] lg:pb-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center">
          
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-[32px] md:text-[38px] lg:text-[42px] font-extrabold leading-[1.1] tracking-tight text-[#0f172a] lg:text-left">
              Finde die passende Kita in Hamburg
            </h1>
            
            <p className="mt-5 lg:mt-6 text-[14px] md:text-[15px] font-normal leading-[1.6] text-[#475569] max-w-[480px] mx-auto lg:mx-0">
              Vergleiche Kitas in allen Hamburger Bezirken und finde Schritt für Schritt die Betreuung, die wirklich zu deinem Alltag und deinem Kind passt.
            </p>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-6 lg:mt-8 flex w-full sm:max-w-[420px] mx-auto lg:mx-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Stadtteil, Adresse oder Kita-Name …"
                  className="w-full h-[48px] lg:h-[52px] pl-10 pr-4 rounded-l-full border border-r-0 border-border bg-background text-foreground text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button 
                type="submit"
                className="h-[48px] lg:h-[52px] px-5 lg:px-6 rounded-r-full text-[14px] font-bold"
              >
                Kitas anzeigen
              </Button>
            </form>

          </div>

          {/* Right column - Visual element with overlapping cards */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Main image card */}
            <div className="relative w-[85%] sm:w-[320px] lg:w-[380px] lg:-ml-[80px]">
              <div className="aspect-[3/4] rounded-[20px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Kinder in einer Kita" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Upper floating card - Kitas count */}
              <div className="absolute -top-4 -right-4 sm:-right-6 lg:-right-8 w-[180px] sm:w-[200px] lg:w-[220px] group cursor-default">
                <div 
                  className="relative rounded-[20px] px-5 py-4 border border-white/15 shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-[1.03] hover:backdrop-blur-[22px]"
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    background: 'linear-gradient(135deg, rgba(24,0,173,0.32) 0%, rgba(24,0,173,0.18) 100%)'
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-6 h-6 flex-shrink-0 text-[#0f172a]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5L18 10v9H6v-9l6-4.5z"/>
                      <rect x="10" y="14" width="4" height="5" fill="currentColor"/>
                    </svg>
                    <span className="text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] leading-none whitespace-nowrap">+120</span>
                  </div>
                  <p className="text-[13px] sm:text-[14px] font-medium text-[#0f172a]/90 mt-1">Kitas gelistet</p>
                </div>
              </div>

              {/* Lower floating card - Rating & Satisfaction */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 lg:-left-12 w-[280px] sm:w-[300px] lg:w-[340px] group cursor-default">
                <div 
                  className="relative rounded-[20px] px-5 sm:px-6 py-4 border border-white/15 shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-[1.03] hover:backdrop-blur-[22px]"
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    background: 'linear-gradient(135deg, rgba(0,191,99,0.32) 0%, rgba(0,191,99,0.18) 100%)'
                  }}
                >
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    {/* Rating block */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#0f172a] fill-[#0f172a]" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <div>
                        <p className="text-[20px] sm:text-[24px] font-extrabold text-[#0f172a] leading-none whitespace-nowrap">4,7 Ø</p>
                        <p className="text-[12px] sm:text-[13px] font-medium text-[#0f172a]/90 mt-0.5">Bewertung</p>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-px h-12 bg-[#0f172a]/18 flex-shrink-0" />
                    
                    {/* Satisfaction block */}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#0f172a] fill-[#0f172a]" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <div>
                        <p className="text-[20px] sm:text-[24px] font-extrabold text-[#0f172a] leading-none whitespace-nowrap">92%</p>
                        <p className="text-[12px] sm:text-[13px] font-medium text-[#0f172a]/90 mt-0.5">Zufriedenheit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
