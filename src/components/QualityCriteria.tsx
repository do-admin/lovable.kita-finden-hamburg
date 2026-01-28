import { Star, Phone, Clock, Users, Globe, DollarSign, UserCheck, ThumbsUp, Key } from "lucide-react";

interface Criterion {
  icon: typeof Star;
  title: string;
  description: string;
  hasImage?: boolean;
  color: "blue" | "green" | "teal";
}

const criteria: Criterion[] = [
  {
    icon: Star,
    title: "Google-Bewertungen",
    description: "Authentische Erfahrungsberichte von Eltern und Familien.",
    hasImage: true,
    color: "green",
  },
  {
    icon: Phone,
    title: "Testanrufe",
    description: "Bewertung der telefonischen Erreichbarkeit und Freundlichkeit.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Reaktionszeiten",
    description: "Wie schnell antwortet die Kita auf Anfragen?",
    color: "teal",
  },
  {
    icon: UserCheck,
    title: "Kununu-Bewertungen",
    description: "Einblicke in die Arbeitgeberqualität und Mitarbeiterzufriedenheit.",
    hasImage: true,
    color: "blue",
  },
  {
    icon: Globe,
    title: "Transparenz der Website",
    description: "Vollständigkeit und Aktualität der Online-Informationen.",
    color: "green",
  },
  {
    icon: Users,
    title: "Gruppengrößen",
    description: "Verhältnis der Kinder pro Gruppe.",
    color: "teal",
  },
  {
    icon: Key,
    title: "Personalschlüssel",
    description: "Anzahl der Betreuungspersonen pro Kind.",
    hasImage: true,
    color: "green",
  },
  {
    icon: DollarSign,
    title: "Kostenstruktur",
    description: "Transparente Information über Elternbeiträge.",
    color: "blue",
  },
  {
    icon: ThumbsUp,
    title: "User Votes",
    description: "Community-Bewertungen von Plattform-Nutzern.",
    color: "teal",
  },
];

const colorStyles = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700", 
  teal: "bg-teal-100 text-teal-700",
};

const SmallCard = ({ criterion }: { criterion: Criterion }) => {
  const Icon = criterion.icon;
  
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${colorStyles[criterion.color]}`}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h4 className="text-[14px] font-bold text-[#0f172a] mb-1">
        {criterion.title}
      </h4>
      <p className="text-[12px] text-[#64748b] leading-relaxed">
        {criterion.description}
      </p>
    </div>
  );
};

const LargeCard = ({ criterion }: { criterion: Criterion }) => {
  const Icon = criterion.icon;
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-muted">
        <img
          src="/placeholder.svg"
          alt={criterion.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${colorStyles[criterion.color]}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <h4 className="text-[14px] font-bold text-[#0f172a] mb-1">
          {criterion.title}
        </h4>
        <p className="text-[12px] text-[#64748b] leading-relaxed">
          {criterion.description}
        </p>
      </div>
    </div>
  );
};

const QualityCriteria = () => {
  const cardsWithImages = criteria.filter(c => c.hasImage);
  const cardsWithoutImages = criteria.filter(c => !c.hasImage);

  return (
    <section id="criteria" className="bg-[#f8fafc] py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-extrabold text-[#0f172a] mb-2">
            Unsere Prüfkriterien im Überblick
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#64748b]">
            So bewerten wir Kitas in Hamburg – objektiv, transparent und unabhängig
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Cards with images */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {cardsWithImages.slice(0, 2).map((criterion) => (
              <LargeCard key={criterion.title} criterion={criterion} />
            ))}
          </div>

          {/* Middle column - Small cards */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {cardsWithoutImages.map((criterion) => (
              <SmallCard key={criterion.title} criterion={criterion} />
            ))}
          </div>

          {/* Right column - One more image card */}
          <div className="lg:col-span-3">
            {cardsWithImages[2] && (
              <LargeCard criterion={cardsWithImages[2]} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityCriteria;
