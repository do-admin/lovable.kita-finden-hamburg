import { Star, Phone, Clock, UserCheck, Monitor, Users, Key, Euro, ThumbsUp } from "lucide-react";

const criteria = [
  {
    icon: Star,
    title: "Google-Bewertungen",
    description: "Authentische Erfahrungsberichte von Eltern und Familien.",
  },
  {
    icon: Phone,
    title: "Testanrufe",
    description: "Professionelle Bewertung der telefonischen Erreichbarkeit.",
  },
  {
    icon: Clock,
    title: "Reaktionszeiten",
    description: "Wie schnell antwortet die Kita auf Anfragen?",
  },
  {
    icon: UserCheck,
    title: "Kununu-Bewertungen",
    description: "Einblicke in die Arbeitgeberqualität.",
  },
  {
    icon: Monitor,
    title: "Transparenz der Website",
    description: "Vollständigkeit der Online-Informationen.",
  },
  {
    icon: Users,
    title: "Gruppengrößen",
    description: "Verhältnis der Kinder pro Gruppe.",
  },
  {
    icon: Key,
    title: "Personalschlüssel",
    description: "Anzahl der Betreuungspersonen pro Kind.",
  },
  {
    icon: Euro,
    title: "Kostenstruktur",
    description: "Transparente Information über Elternbeiträge.",
  },
  {
    icon: ThumbsUp,
    title: "User Votes",
    description: "Community-Bewertungen unserer Nutzer.",
  },
];

const QualityCriteria = () => {
  return (
    <section 
      id="criteria" 
      className="relative w-full py-24 md:py-32 lg:py-36"
      style={{
        background: 'radial-gradient(ellipse at center, #0f172a 0%, #111827 100%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Glass Card with Content */}
          <div className="lg:col-span-7">
            <div 
              className="rounded-3xl p-8 md:p-10 lg:p-12 transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: 'rgba(30, 58, 138, 0.24)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Headline */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
                Unsere Prüfkriterien im Überblick
              </h2>
              
              {/* Subtitle */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
                So bewerten wir Kitas in Hamburg
              </h3>
              
              {/* Introduction */}
              <p className="text-lg md:text-xl font-medium text-slate-200 mb-8 leading-relaxed">
                Du bekommst eine objektive, transparente Einschätzung, basierend auf folgenden Kriterien:
              </p>
              
              {/* Criteria Checklist */}
              <div className="space-y-5 md:space-y-6">
                {criteria.map((criterion) => {
                  const Icon = criterion.icon;
                  return (
                    <div 
                      key={criterion.title} 
                      className="flex items-start gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.06] hover:scale-[1.02] cursor-default"
                    >
                      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-white leading-tight">
                          {criterion.title}
                        </h4>
                        <p className="text-base md:text-lg text-slate-300 mt-1 leading-relaxed">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right Column - Image Stack + Badge */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6 lg:pt-8">
            {/* Top Image */}
            <div 
              className="relative w-full max-w-[380px] aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
              style={{
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=450&fit=crop&crop=faces" 
                alt="Kinder spielen in der Kita" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom Image */}
            <div 
              className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] lg:-mt-12 lg:mr-12"
              style={{
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=500&h=375&fit=crop&crop=faces" 
                alt="Elterngespräch in der Kita" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Rating Badge */}
            <div 
              className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full transition-all duration-300 hover:scale-[1.05] lg:-mt-8 lg:mr-24"
              style={{
                background: 'rgba(22, 78, 99, 0.32)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white">4.9</span>
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xs md:text-sm text-slate-200 text-center px-2 mt-1 leading-tight">
                Ø Eltern-Bewertung
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityCriteria;
