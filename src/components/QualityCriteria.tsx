import { Star, Phone, Clock, Users, Globe, DollarSign, UserCheck, ThumbsUp, Key } from "lucide-react";

type CardSize = "large" | "medium" | "small";
type CardColor = "blue" | "green";

interface Criterion {
  icon: typeof Star;
  title: string;
  description: string;
  size: CardSize;
  color: CardColor;
}

const criteria: Criterion[] = [
  {
    icon: Star,
    title: "Google-Bewertungen",
    description: "Authentische Erfahrungsberichte von Eltern und Familien, die bereits Erfahrung mit der Einrichtung haben.",
    size: "large",
    color: "blue",
  },
  {
    icon: Phone,
    title: "Testanrufe",
    description: "Professionelle Bewertung der telefonischen Erreichbarkeit und Freundlichkeit des Personals.",
    size: "medium",
    color: "green",
  },
  {
    icon: Clock,
    title: "Reaktionszeiten",
    description: "Wie schnell antwortet die Kita auf Anfragen per E-Mail oder Telefon?",
    size: "small",
    color: "blue",
  },
  {
    icon: UserCheck,
    title: "Kununu-Bewertungen",
    description: "Einblicke in die Arbeitgeberqualität und Zufriedenheit der Mitarbeitenden.",
    size: "medium",
    color: "green",
  },
  {
    icon: Globe,
    title: "Transparenz der Website",
    description: "Vollständigkeit und Aktualität der Online-Informationen zur Einrichtung.",
    size: "large",
    color: "blue",
  },
  {
    icon: Users,
    title: "Gruppengrößen",
    description: "Verhältnis der Kinder pro Gruppe für eine angemessene Betreuungsintensität.",
    size: "small",
    color: "green",
  },
  {
    icon: Key,
    title: "Personalschlüssel",
    description: "Anzahl der Betreuungspersonen pro Kind für optimale Förderung.",
    size: "medium",
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Kostenstruktur",
    description: "Transparente Information über Elternbeiträge und zusätzliche Kosten.",
    size: "small",
    color: "green",
  },
  {
    icon: ThumbsUp,
    title: "User Votes",
    description: "Community-Bewertungen von Nutzern unserer Plattform.",
    size: "large",
    color: "blue",
  },
];

const sizeClasses: Record<CardSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-1 md:row-span-2",
  small: "md:col-span-1 md:row-span-1",
};

const CriteriaCard = ({ criterion }: { criterion: Criterion }) => {
  const Icon = criterion.icon;
  const isBlue = criterion.color === "blue";
  
  const bgColor = isBlue 
    ? "rgba(30, 58, 138, 0.22)" 
    : "rgba(22, 78, 99, 0.22)";
  const bgColorHover = isBlue 
    ? "rgba(30, 58, 138, 0.30)" 
    : "rgba(22, 78, 99, 0.30)";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-[24px] p-7
        backdrop-blur-[18px] border border-white/25
        shadow-[0_16px_48px_rgba(0,0,0,0.14)]
        transition-all duration-300 ease-out
        hover:backdrop-blur-[24px] hover:scale-[1.03] hover:shadow-[0_20px_56px_rgba(0,0,0,0.18)]
        ${sizeClasses[criterion.size]}
        flex flex-col
      `}
      style={{ 
        background: bgColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = bgColorHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bgColor;
      }}
    >
      {/* Icon */}
      <div className="mb-3">
        <Icon className="h-9 w-9 text-foreground" strokeWidth={1.8} />
      </div>
      
      {/* Title */}
      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        {criterion.title}
      </h4>
      
      {/* Description */}
      <p className="text-base text-foreground/80 leading-relaxed mb-4 flex-grow">
        {criterion.description}
      </p>
      
      {/* Placeholder Image */}
      <div className="mt-auto">
        <img
          src="/placeholder.svg"
          alt={criterion.title}
          className="w-full rounded-xl object-cover bg-muted"
          style={{ 
            height: criterion.size === "large" ? "200px" : criterion.size === "medium" ? "140px" : "100px" 
          }}
        />
      </div>
    </div>
  );
};

const QualityCriteria = () => {
  return (
    <section id="criteria" className="relative bg-white pt-[120px] pb-[140px]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Unsere Prüfkriterien im Überblick
          </h2>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            So bewerten wir Kitas in Hamburg – objektiv, transparent und unabhängig
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[180px]">
            {criteria.map((criterion) => (
              <CriteriaCard key={criterion.title} criterion={criterion} />
            ))}
          </div>

          {/* Floating Badge */}
          <div 
            className="
              absolute -bottom-8 right-4 md:right-12 lg:right-20
              w-[110px] h-[110px] rounded-full
              flex flex-col items-center justify-center
              backdrop-blur-[18px] border border-white/30
              shadow-[0_16px_48px_rgba(0,0,0,0.2)]
              z-10
            "
            style={{ background: "rgba(22, 78, 99, 0.35)" }}
          >
            <span className="text-4xl md:text-5xl font-bold text-foreground">4.9</span>
            <span className="text-xs text-foreground/80 text-center leading-tight px-2">
              Ø Eltern-Bewertung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityCriteria;
