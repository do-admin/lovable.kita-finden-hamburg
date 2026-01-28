import ratgeberHeroImage from "@/assets/ratgeber-hero.jpg";

const RatgeberHero = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={ratgeberHeroImage} 
          alt="Kita-Szene mit Kindern und Erzieherin" 
          className="w-full h-full object-cover"
        />
        {/* Primary Overlay */}
        <div className="absolute inset-0 bg-primary/40" />
      </div>
      
      {/* Decorative Curve */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full h-16 text-accent/30"
        viewBox="0 0 1200 80" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,40 Q300,80 600,40 T1200,40 L1200,80 L0,80 Z" 
          fill="currentColor"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 py-16 px-8 md:py-20 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Praxisnahe Tipps für Eltern
        </h2>
        <p className="text-lg md:text-xl font-medium text-white/90 max-w-xl">
          Artikel zu Kita-Suche, Gutschein, Eingewöhnung und mehr
        </p>
      </div>
    </div>
  );
};

export default RatgeberHero;
