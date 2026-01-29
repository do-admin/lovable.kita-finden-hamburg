import { Search, GitCompare, FileCheck } from "lucide-react";

const steps = [
  {
    number: 1,
    heading: "Suchen & eingrenzen",
    text: "Gib einen Stadtteil, eine Adresse oder den Namen einer Kita in die Suche ein.",
    icon: Search,
    bgColor: "bg-[#1800ad]",
    iconColor: "text-white",
  },
  {
    number: 2,
    heading: "Kitas vergleichen",
    text: "Vergleiche mehrere Kitas anhand von Lage, Größe und pädagogischen Schwerpunkten.",
    icon: GitCompare,
    bgColor: "bg-[#f88820]",
    iconColor: "text-white",
    highlighted: true,
  },
  {
    number: 3,
    heading: "Details prüfen",
    text: "Sieh dir die Detailseiten an, informiere dich über Konzepte und Bewertungen.",
    icon: FileCheck,
    bgColor: "bg-[#00bf63]",
    iconColor: "text-white",
  },
];

const HowToUse = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="max-w-[880px] mx-auto text-center mb-12">
          <h2 className="mb-4">So nutzt du die Kita-Übersicht</h2>
          <p className="text-foreground text-lg">
            In drei einfachen Schritten findest du die passende Kita in Hamburg.
          </p>
        </div>

        <div className="relative max-w-[1000px] mx-auto">
          {/* Connecting lines - visible on md+ */}
          <div className="hidden md:block absolute top-[60px] left-1/2 -translate-x-1/2 w-[60%]">
            <svg viewBox="0 0 400 40" className="w-full h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M0 35 Q100 0 200 20 Q300 40 400 5" 
                stroke="#e2e8f0" 
                strokeWidth="2" 
                strokeDasharray="8 6"
                fill="none"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className={`flex flex-col items-center text-center ${
                    step.highlighted ? 'md:-mt-4' : ''
                  }`}
                >
                  {/* Card wrapper for highlighted step */}
                  <div className={`flex flex-col items-center p-6 rounded-2xl transition-all ${
                    step.highlighted 
                      ? 'bg-white shadow-lg border border-[#f1f5f9]' 
                      : ''
                  }`}>
                    {/* Icon circle */}
                    <div className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mb-5`}>
                      <Icon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>
                    
                    <h3 className="text-[18px] font-semibold text-foreground mb-3">
                      {step.heading}
                    </h3>
                    <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[240px]">
                      {step.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowToUse;
