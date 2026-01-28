import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const InfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gradient-to-b from-white to-[#f1f5f9]">
      <div className="max-w-[1400px] mx-auto px-[5%] lg:px-[6%] pt-[80px] lg:pt-[120px] pb-[140px] lg:pb-[180px]">
        
        {/* Top Section - Headline + First 3 Paragraphs with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-24">
          
          {/* Left - Text */}
          <div>
            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-[#0f172a] mb-8 lg:mb-10">
              Kitas in Hamburg – ein Überblick
            </h2>
            
            <div className="space-y-6 lg:space-y-8">
              <p className="text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#475569]">
                In Hamburg gibt es eine große Vielfalt an Kindertagesstätten – von Krippen für die Kleinsten über Kindergärten bis hin zu Horten für Schulkinder. Jede Einrichtung arbeitet mit eigenen pädagogischen Schwerpunkten und Betreuungsangeboten, die sich an den unterschiedlichen Bedürfnissen von Kindern und Familien orientieren.
              </p>
              
              <p className="text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#475569]">
                Die Organisation und Aufsicht der Kindertagesbetreuung liegt in Hamburg in der Verantwortung der Stadt. Dadurch unterscheiden sich Betreuungsangebote, Platzverfügbarkeit und Verwaltungsstrukturen teils deutlich von anderen Regionen Deutschlands.
              </p>
              
              <p className="text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#475569]">
                Hamburger Kitas werden überwiegend von öffentlichen, freien und kirchlichen Trägern betrieben. Diese Träger gestalten die pädagogische Ausrichtung, stellen Räume und Personal zur Verfügung und tragen die Verantwortung für die Qualität der Betreuung. Die Teams in den Einrichtungen setzen diese Konzepte im Alltag um und sorgen für eine liebevolle, sichere und fördernde Umgebung.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl bg-muted">
              <img 
                src="/placeholder.svg" 
                alt="Kinder in einer Hamburger Kita"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 w-[180px] lg:w-[200px] group cursor-default z-10">
              <div 
                className="relative rounded-[20px] px-5 py-4 border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.03]"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  background: 'linear-gradient(135deg, rgba(22,78,99,0.28) 0%, rgba(22,78,99,0.18) 100%)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-[24px] lg:text-[26px] font-extrabold text-white leading-none">4,7</span>
                </div>
                <p className="text-[13px] lg:text-[14px] font-medium text-white/90 mt-1">Ø Bewertung</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Image Left, Text + CTAs Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl bg-muted">
              <img 
                src="/placeholder.svg" 
                alt="Kinder spielen in einer Hamburger Kita"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 w-[200px] lg:w-[240px] group cursor-default z-10">
              <div 
                className="relative rounded-[20px] px-6 py-5 border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all duration-200 hover:scale-[1.03]"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  background: 'linear-gradient(135deg, rgba(30,58,138,0.28) 0%, rgba(30,58,138,0.18) 100%)'
                }}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5L18 10v9H6v-9l6-4.5z"/>
                    <rect x="10" y="14" width="4" height="5" fill="currentColor"/>
                  </svg>
                  <span className="text-[26px] lg:text-[30px] font-extrabold text-white leading-none">+1.200</span>
                </div>
                <p className="text-[14px] lg:text-[15px] font-medium text-white/90 mt-1">Kitas in Hamburg</p>
              </div>
            </div>
          </div>

          {/* Right - Text + CTAs */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6 lg:space-y-8 mb-10 lg:mb-12">
              <p className="text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#475569]">
                Viele Kitas in Hamburg bieten zusätzliche Schwerpunkte, zum Beispiel in den Bereichen Sprache, Musik, Bewegung, Naturpädagogik oder Inklusion. So finden Eltern für jedes Kind ein passendes Betreuungsangebot – vom Stadtzentrum bis in die äußeren Stadtteile.
              </p>
              
              <p className="text-[20px] lg:text-[22px] font-medium leading-[1.7] text-[#1e40af]">
                Mit „Kita finden Hamburg" bekommst du einen unabhängigen Überblick über die Kindertagesstätten in der Stadt. Du kannst Kitas nach Bezirk und Stadtteil filtern, dich über pädagogische Konzepte informieren und mit Hilfe von Kriterien und Bewertungen schneller eine Einrichtung finden, die wirklich zu deiner Familie passt.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/kitas")}
                className="h-[56px] lg:h-[60px] px-8 rounded-full text-[17px] lg:text-[18px] font-bold bg-[#1e40af] hover:bg-[#1e3a8a] text-white"
              >
                Kitas in Hamburg finden
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/bezirke")}
                className="h-[56px] lg:h-[60px] px-8 rounded-full text-[17px] lg:text-[18px] font-bold border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af]/5"
              >
                Alle Bezirke anzeigen
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          className="relative block w-full h-[100px] lg:h-[120px]"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,40 C300,100 600,0 900,60 C1050,90 1150,70 1200,50 L1200,120 L0,120 Z" 
            className="fill-[#d1fae5]"
          />
        </svg>
      </div>
    </section>
  );
};

export default InfoSection;
