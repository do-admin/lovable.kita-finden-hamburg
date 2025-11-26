import { Button } from "./ui/button";

const Hero = () => {
  const scrollToSearch = () => {
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCriteria = () => {
    document.getElementById("criteria")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-background">
      <div className="pt-[120px] md:pt-[120px] pb-16 px-5 md:px-12 lg:px-16">
        <div className="max-w-[640px] mx-auto text-center">
          {/* Eyebrow Label */}
          <div className="text-sm uppercase tracking-wider text-primary font-medium mb-3">
            Finden Sie die passende Kita in Ihrer Nähe
          </div>
          
          {/* H1 */}
          <h1 className="text-[40px] md:text-[48px] font-bold leading-tight mb-6">
            Kita finden in Hamburg – schnell, transparent und nach Stadtteilen sortiert
          </h1>
          
          {/* Body Text */}
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8">
            Mit „Kita finden Hamburg" erhalten Sie einen strukturierten Überblick über die Kindertagesstätten der Stadt. Filtern Sie nach Bezirk und Stadtteil, vergleichen Sie pädagogische Schwerpunkte und finden Sie eine Einrichtung, die wirklich zu Ihrer Familie passt.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12 md:mb-16">
            <Button 
              size="lg" 
              onClick={scrollToSearch}
              className="h-[52px] px-8 rounded-[10px] hover:shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary/20"
            >
              Kitas in Hamburg anzeigen
            </Button>
            <button
              onClick={scrollToCriteria}
              className="text-primary hover:underline underline-offset-4 font-medium transition-all"
            >
              Erweiterte Suche öffnen
            </button>
          </div>
        </div>
        
        {/* Hero Image - Below Text, Centered */}
        <div className="max-w-[960px] mx-auto">
          <div className="relative w-full aspect-[16/9] rounded-[16px] bg-gradient-to-br from-primary/5 to-accent/10 shadow-lg overflow-hidden animate-float">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3 opacity-30">
                <svg className="w-24 h-24 mx-auto text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className="text-sm text-muted-foreground">Hero Image</p>
              </div>
            </div>
            {/* Subtle decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-primary/10"></div>
            <div className="absolute bottom-16 right-12 w-16 h-16 rounded-full border-2 border-accent/10"></div>
            <div className="absolute top-1/2 right-20 w-3 h-3 rounded-full bg-primary/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
