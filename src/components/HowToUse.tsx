const steps = [
  {
    number: 1,
    heading: "Suchen & eingrenzen",
    text: "Gib einen Stadtteil, eine Adresse oder den Namen einer Kita in die Suche ein. Alternativ kannst du direkt einen beliebten Stadtteil auswählen.",
  },
  {
    number: 2,
    heading: "Kitas vergleichen",
    text: "Vergleiche mehrere Kitas anhand von Lage, Größe, pädagogischen Schwerpunkten und weiteren Kriterien, die für deinen Alltag wichtig sind.",
  },
  {
    number: 3,
    heading: "Details prüfen",
    text: "Sieh dir die Detailseiten einzelner Kitas an, informiere dich über Konzepte, Bewertungen und Kontaktdaten und triff eine fundierte Entscheidung.",
  },
];

const HowToUse = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-[880px] mx-auto text-center mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0f172a] mb-4">So nutzt du die Kita-Übersicht</h2>
          <p className="text-muted-foreground text-lg">
            In drei einfachen Schritten findest du die passende Kita in Hamburg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {steps.map((step) => (
            <article
              key={step.number}
              className="card-shadow rounded-lg p-6 bg-card"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold mb-2">{step.heading}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
