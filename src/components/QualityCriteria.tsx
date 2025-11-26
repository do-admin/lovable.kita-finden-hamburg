import { Star, Phone, Clock, Users, Globe, DollarSign, TrendingUp, UserCheck, ThumbsUp } from "lucide-react";

const criteria = [
  {
    icon: Star,
    title: "Google-Bewertungen",
    description: "Authentische Erfahrungsberichte von Eltern und Familien, die bereits Erfahrung mit der Einrichtung haben.",
  },
  {
    icon: Phone,
    title: "Testanrufe",
    description: "Professionelle Bewertung der telefonischen Erreichbarkeit und Freundlichkeit des Personals.",
  },
  {
    icon: Clock,
    title: "Reaktionszeiten",
    description: "Wie schnell antwortet die Kita auf Anfragen per E-Mail oder Telefon?",
  },
  {
    icon: UserCheck,
    title: "Kununu-Bewertungen",
    description: "Einblicke in die Arbeitgeberqualität und Zufriedenheit der Mitarbeitenden.",
  },
  {
    icon: Globe,
    title: "Transparenz der Website",
    description: "Vollständigkeit und Aktualität der Online-Informationen zur Einrichtung.",
  },
  {
    icon: Users,
    title: "Gruppengrößen",
    description: "Verhältnis der Kinder pro Gruppe für eine angemessene Betreuungsintensität.",
  },
  {
    icon: TrendingUp,
    title: "Personalschlüssel",
    description: "Anzahl der Betreuungspersonen pro Kind für optimale Förderung.",
  },
  {
    icon: DollarSign,
    title: "Kostenstruktur",
    description: "Transparente Information über Elternbeiträge und zusätzliche Kosten.",
  },
  {
    icon: ThumbsUp,
    title: "User Votes",
    description: "Community-Bewertungen von Nutzern unserer Plattform.",
  },
];

const QualityCriteria = () => {
  return (
    <section id="criteria" className="section-padding">
      <h2 className="mb-3">Unsere Prüfkriterien im Überblick</h2>
      <h3 className="text-xl text-muted-foreground mb-8">So bewerten wir Kitas in Hamburg</h3>
      <p className="text-muted-foreground mb-8">
        Sie erhalten eine objektive, transparente Einschätzung, basierend auf folgenden Kriterien:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {criteria.map((criterion) => {
          const Icon = criterion.icon;
          return (
            <div key={criterion.title} className="flex gap-4">
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">{criterion.title}</h4>
                <p className="text-sm text-muted-foreground">{criterion.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QualityCriteria;
