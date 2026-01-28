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
      
      {/* Abstract Hamburg city map - fine lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg 
          viewBox="0 0 800 800" 
          className="w-[140%] sm:w-[120%] lg:w-[100%] h-auto opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Alster lakes - center of Hamburg */}
          <ellipse cx="400" cy="320" rx="35" ry="50" stroke="#0f172a" strokeWidth="0.8" fill="none"/>
          <ellipse cx="400" cy="240" rx="25" ry="35" stroke="#0f172a" strokeWidth="0.8" fill="none"/>
          
          {/* Elbe river - flowing through south */}
          <path d="M0 520 Q100 500, 200 520 Q300 540, 400 520 Q500 500, 600 530 Q700 550, 800 520" stroke="#0f172a" strokeWidth="1.2" fill="none"/>
          <path d="M0 540 Q100 520, 200 540 Q300 560, 400 540 Q500 520, 600 550 Q700 570, 800 540" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
          
          {/* Main ring roads around center */}
          <circle cx="400" cy="350" r="120" stroke="#0f172a" strokeWidth="0.7" fill="none" strokeDasharray="none"/>
          <circle cx="400" cy="350" r="200" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
          
          {/* Major radial streets from center */}
          <path d="M400 230 L400 80" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
          <path d="M400 470 L400 500" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
          <path d="M280 350 L100 350" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
          <path d="M520 350 L700 350" stroke="#0f172a" strokeWidth="0.6" fill="none"/>
          <path d="M320 270 L180 130" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
          <path d="M480 270 L620 130" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
          <path d="M320 430 L180 570" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
          <path d="M480 430 L620 570" stroke="#0f172a" strokeWidth="0.5" fill="none"/>
          
          {/* Diagonal major roads */}
          <path d="M300 250 L100 50" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          <path d="M500 250 L700 50" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          <path d="M300 450 L50 700" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          <path d="M500 450 L750 700" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          
          {/* Harbor area - south of Elbe */}
          <rect x="250" y="580" width="80" height="40" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          <rect x="340" y="590" width="60" height="30" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          <rect x="420" y="580" width="90" height="45" stroke="#0f172a" strokeWidth="0.4" fill="none"/>
          <rect x="280" y="630" width="50" height="25" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <rect x="450" y="635" width="40" height="20" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          
          {/* Secondary streets - grid pattern areas */}
          <path d="M150 200 L250 200" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M150 250 L230 250" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M550 200 L680 200" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M570 250 L700 250" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M180 180 L180 280" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M220 170 L220 290" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M600 180 L600 280" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          <path d="M650 170 L650 290" stroke="#0f172a" strokeWidth="0.3" fill="none"/>
          
          {/* Curved connecting roads */}
          <path d="M100 400 Q150 380, 200 420 Q250 460, 280 440" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
          <path d="M700 400 Q650 380, 600 420 Q550 460, 520 440" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
          <path d="M350 150 Q380 120, 420 150" stroke="#0f172a" strokeWidth="0.35" fill="none"/>
          
          {/* Small neighborhood streets */}
          <path d="M120 300 L160 340" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <path d="M140 280 L180 320" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <path d="M680 300 L640 340" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <path d="M660 280 L620 320" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <path d="M200 450 L250 480" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <path d="M600 450 L550 480" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          
          {/* Parks/green spaces as subtle shapes */}
          <ellipse cx="200" cy="380" rx="20" ry="15" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <ellipse cx="600" cy="380" rx="25" ry="18" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <ellipse cx="350" cy="450" rx="18" ry="12" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          <ellipse cx="450" cy="450" rx="22" ry="14" stroke="#0f172a" strokeWidth="0.25" fill="none"/>
          
          {/* Additional fine detail streets */}
          <path d="M300 180 L340 200" stroke="#0f172a" strokeWidth="0.2" fill="none"/>
          <path d="M460 180 L500 200" stroke="#0f172a" strokeWidth="0.2" fill="none"/>
          <path d="M250 320 L280 300" stroke="#0f172a" strokeWidth="0.2" fill="none"/>
          <path d="M550 320 L520 300" stroke="#0f172a" strokeWidth="0.2" fill="none"/>
          <path d="M360 480 L380 500" stroke="#0f172a" strokeWidth="0.2" fill="none"/>
          <path d="M420 480 L440 500" stroke="#0f172a" strokeWidth="0.2" fill="none"/>
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
