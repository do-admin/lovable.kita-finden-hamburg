import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wer hat Anspruch auf einen Kita-Gutschein in Hamburg?",
    answer:
      "Grundsätzlich haben alle Familien mit Wohnsitz in Hamburg Anspruch auf einen Kita-Gutschein. Die bewilligte Betreuungszeit hängt vom individuellen Bedarf ab – zum Beispiel Berufstätigkeit, Ausbildung, Arbeitssuche oder besondere familiäre Situationen. Auch pädagogische Gründe können berücksichtigt werden, etwa wenn dein Kind zusätzliche Förderung benötigt.",
  },
  {
    question: "Was kostet ein 8-Stunden-Kita-Platz in Hamburg ungefähr?",
    answer:
      "Die Kosten für einen 8-Stunden-Kita-Platz hängen vom Haushaltsnettoeinkommen und der bewilligten Betreuungszeit ab. Ein großer Teil wird über den Kita-Gutschein finanziert, du zahlst einen einkommensabhängigen Eigenanteil. Für viele Familien liegt dieser im niedrigen bis mittleren zweistelligen Bereich pro Monat. Genaue Beträge berechnet das Jugendamt auf Basis der aktuellen Hamburger Staffelung.",
  },
  {
    question: "Ist Kindergarten in Hamburg wirklich beitragsfrei?",
    answer:
      "Für bis zu fünf Stunden tägliche Betreuung ist der Kindergartenbesuch in Hamburg beitragsfrei. Du zahlst in diesem Fall in der Regel nur Verpflegungskosten und eventuell Zusatzangebote. Für längere Betreuungszeiten oder besondere Angebote können zusätzliche Beiträge anfallen.",
  },
  {
    question: "Welche Kita-Träger gibt es in Hamburg?",
    answer:
      "In Hamburg gibt es eine vielfältige Trägerlandschaft. Dazu zählen städtische Träger, große freie Träger, kirchliche Einrichtungen, gemeinnützige Vereine und private Anbieter. Jeder Träger setzt eigene pädagogische Schwerpunkte und organisiert die Rahmenbedingungen der Betreuung. Über Kita finden Hamburg kannst du Kitas unabhängig vom Träger vergleichen.",
  },
  {
    question: "Wie finde ich eine Kita in meinem Stadtteil?",
    answer:
      "Du kannst über die Navigation Kitas nach Bezirk & Stadtteil zunächst deinen Bezirk und dann den gewünschten Stadtteil auswählen. Danach werden dir passende Einrichtungen im Kita-Verzeichnis angezeigt. Alternativ nutzt du die Suchfelder und gibst PLZ oder Stadtteilnamen direkt ein.",
  },
  {
    question: "Garantiert der Kita-Gutschein automatisch einen Platz?",
    answer:
      "Der Kita-Gutschein ermöglicht die Finanzierung eines Betreuungsplatzes, garantiert aber keinen konkreten Platz in einer bestimmten Einrichtung. Die Platzvergabe erfolgt durch die Kitas selbst und hängt von freien Kapazitäten ab. Sprich am besten mehrere Einrichtungen an und beginne frühzeitig mit der Suche.",
  },
  {
    question: "Wie weit darf eine Kita von meinem Wohnort entfernt sein?",
    answer:
      "Es gibt keine strikt vorgegebene maximale Entfernung. Viele Familien wählen Einrichtungen in einem Radius von ein bis drei Kilometern zum Wohn- oder Arbeitsort, um Wege im Alltag kurz zu halten. Gerade für jüngere Kinder sind kurze Anfahrtszeiten oft eine spürbare Entlastung.",
  },
  {
    question: "Gilt der Kita-Gutschein auch für Tagesmütter und Tagesväter?",
    answer:
      "Ja, der Kita-Gutschein kann auch für Kindertagespflege in Hamburg genutzt werden. Die Förderung wird ähnlich wie in Kitas angerechnet, teilweise gelten jedoch abweichende Kostensätze. Die zuständige Stelle informiert dich, wie der Gutschein im konkreten Fall eingesetzt wird.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding">
      <div className="max-w-[880px] mx-auto">
        <h2 className="text-center mb-6">Häufig gestellte Fragen zur Kita-Suche in Hamburg</h2>
        <p className="text-muted-foreground mb-8 text-center">Antworten auf die wichtigsten Fragen rund um die Kita-Suche in Hamburg.</p>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <h4 className="font-semibold">{faq.question}</h4>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
