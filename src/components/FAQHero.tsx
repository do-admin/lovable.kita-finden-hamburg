import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart, FileText, Check, Plus, Sparkles } from "lucide-react";

const FAQHero = () => {
  const navigate = useNavigate();

  const goToRatgeber = () => {
    navigate("/ratgeber");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[80vh] bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-[30%] w-64 h-64 rounded-full bg-success/10 blur-3xl" />
      <div className="absolute bottom-20 left-[20%] w-48 h-48 rounded-full bg-accent/10 blur-2xl" />
      
      <div className="max-w-[1300px] mx-auto px-[5%] pt-[100px] pb-[60px] lg:pt-[120px] lg:pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & CTA Area */}
          <div className="lg:col-span-6 order-2 lg:order-1 text-left">
            {/* Main Headline */}
            <h1 className="text-[32px] md:text-[38px] lg:text-[42px] font-extrabold leading-[1.1] tracking-tight text-[#0f172a] lg:text-left">
              Häufige Fragen – schnell beantwortet
            </h1>
            
            {/* Subheadline */}
            <p className="mt-5 lg:mt-6 text-[14px] md:text-[15px] font-normal leading-[1.6] text-[#475569] max-w-[480px]">
              Alles Wichtige zur Kita-Suche, Gutschein, Eingewöhnung & mehr – klar und verständlich erklärt.
            </p>
            
            {/* CTA Button */}
            <div className="flex justify-start mt-6 lg:mt-8 mb-8">
              <Button 
                onClick={goToRatgeber}
                className="h-[48px] lg:h-[52px] px-6 lg:px-8 text-[14px] font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20"
              >
                Lese unsere Artikel →
              </Button>
            </div>
            
            {/* Trust Statistics Pills */}
            <div className="flex flex-wrap gap-3 justify-start">
              <div className="flex items-center gap-2 px-5 py-3 bg-success/10 border border-success/20 rounded-full">
                <FileText className="w-4 h-4 text-success" />
                <span className="text-[14px] md:text-[15px] font-bold leading-[1.5] text-[#0f172a]">30+</span>
                <span className="text-[13px] md:text-[14px] font-normal leading-[1.5] text-[#475569]">Artikel & Antworten</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-accent/10 border border-accent/20 rounded-full">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-[14px] md:text-[15px] font-bold leading-[1.5] text-[#0f172a] whitespace-nowrap">4,8 Ø</span>
                <span className="text-[13px] md:text-[14px] font-normal leading-[1.5] text-[#475569]">Bewertung</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-success/10 border border-success/20 rounded-full">
                <Heart className="w-4 h-4 text-success fill-success" />
                <span className="text-[14px] md:text-[15px] font-bold leading-[1.5] text-[#0f172a]">92%</span>
                <span className="text-[13px] md:text-[14px] font-normal leading-[1.5] text-[#475569]">Zufriedenheit</span>
              </div>
            </div>
          </div>
          
          {/* Right Visual Area */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            {/* Large decorative circle behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full bg-gradient-to-br from-success/20 to-accent/10" />
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-accent/30 animate-float" />
            <div className="absolute top-1/4 left-4 w-4 h-4 rounded-full bg-success/40" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/4 right-12">
              <Sparkles className="w-5 h-5 text-accent/50" />
            </div>
            <div className="absolute top-1/3 right-4">
              <Plus className="w-4 h-4 text-success/50" />
            </div>
            
            {/* Hero Image Container */}
            <div className="relative z-10 mx-auto max-w-[400px] lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Glückliche Familie mit Kind und Erzieherin"
                  className="w-full h-full object-cover"
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
              
              {/* Overlapping Trust Cards */}
              
              {/* Card 1 - Top Right */}
              <div className="absolute -top-4 -right-4 lg:top-4 lg:-right-8 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-[1.5] text-white whitespace-nowrap">+30 Fragen</p>
                    <p className="text-[13px] md:text-[14px] font-normal leading-[1.5] text-white/90">beantwortet</p>
                  </div>
                </div>
              </div>
              
              {/* Card 2 - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 bg-white/95 backdrop-blur-md border border-accent/20 px-6 py-4 rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-accent fill-accent" />
                  <div>
                    <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-[1.5] text-[#0f172a] whitespace-nowrap">Ø 4,8 Bewertung</p>
                    <p className="text-[13px] md:text-[14px] font-normal leading-[1.5] text-[#475569]">von Eltern</p>
                  </div>
                </div>
              </div>
              
              {/* Card 3 - Bottom Right */}
              <div className="hidden lg:block absolute -bottom-8 right-8 bg-success text-white px-6 py-4 rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-white fill-white" />
                  <div>
                    <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-[1.5] text-white whitespace-nowrap">100% kostenlos</p>
                    <p className="text-[13px] md:text-[14px] font-normal leading-[1.5] text-white/90">& unabhängig</p>
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

export default FAQHero;
