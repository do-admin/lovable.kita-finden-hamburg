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
      "Grundsätzlich haben alle Familien mit Wohnsitz in Hamburg Anspruch auf einen Kita-Gutschein. Die bewilligte Betreuungszeit hängt vom individuellen Bedarf ab – zum Beispiel Berufstätigkeit, Ausbildung, Arbeitssuche oder besondere familiäre Situationen. Zusätzlich können pädagogische Gründe berücksichtigt werden, etwa wenn ein Kind zusätzliche Förderung benötigt.",
  },
  {
    question: "Was kostet ein 8-Stunden-Kita-Platz in Hamburg ungefähr?",
    answer:
      "Die tatsächlichen Kosten für einen 8-Stunden-Kita-Platz hängen vom Haushaltsnettoeinkommen und der bewilligten Betreuungszeit ab. Ein großer Teil der Kosten wird über den Kita-Gutschein finanziert, Eltern zahlen einen einkommensabhängigen Eigenanteil. Für viele Familien liegt dieser im niedrigen bis mittleren zweistelligen Bereich pro Monat. Genaue Beträge berechnet das Jugendamt auf Basis der aktuellen Hamburger Staffelung.",
  },
  {
    question: "Ist Kindergarten in Hamburg wirklich beitragsfrei?",
    answer:
      "Für bis zu fünf Stunden tägliche Betreuung ist der Kindergartenbesuch in Hamburg beitragsfrei. Eltern zahlen in diesem Fall in der Regel lediglich Verpflegungskosten und gegebenenfalls Zusatzangebote. Für längere Betreuungszeiten oder besondere Angebote können zusätzliche Beiträge anfallen.",
  },
  {
    question: "Welche Kita-Träger gibt es in Hamburg?",
    answer:
      "In Hamburg gibt es eine vielfältige Trägerlandschaft. Dazu zählen städtische Träger, große freie Träger, kirchliche Einrichtungen, gemeinnützige Vereine und private Anbieter. Jeder Träger setzt eigene pädagogische Schwerpunkte und organisiert die Rahmenbedingungen der Betreuung. Über Kita finden Hamburg können Sie Kitas unabhängig vom Träger vergleichen.",
  },
  {
    question: "Wie finde ich eine Kita in meinem Stadtteil?",
    answer:
      "Sie können über die Navigation Kitas nach Bezirk & Stadtteil zunächst Ihren Bezirk und dann den gewünschten Stadtteil auswählen. Anschließend werden Ihnen passende Einrichtungen im Kita-Verzeichnis angezeigt. Alternativ nutzen Sie die Suchfelder und geben PLZ oder Stadtteilnamen direkt ein.",
  },
  {
    question: "Garantiert der Kita-Gutschein automatisch einen Platz?",
    answer:
      "Der Kita-Gutschein ermöglicht die Finanzierung eines Betreuungsplatzes, garantiert aber keinen konkreten Platz in einer bestimmten Einrichtung. Die Platzvergabe erfolgt durch die Kitas selbst und hängt von freien Kapazitäten ab. Es ist sinnvoll, mehrere Einrichtungen anzusprechen und frühzeitig mit der Suche zu beginnen.",
  },
  {
    question: "Wie weit darf eine Kita von meinem Wohnort entfernt sein?",
    answer:
      "Es gibt keine strikt vorgegebene maximale Entfernung. In der Praxis wählen viele Familien Einrichtungen in einem Radius von ein bis drei Kilometern zum Wohn- oder Arbeitsort, um Wege im Alltag kurz zu halten. Gerade für jüngere Kinder sind kurze Anfahrtszeiten oft eine spürbare Entlastung.",
  },
  {
    question: "Gilt der Kita-Gutschein auch für Tagesmütter und Tagesväter?",
    answer:
      "Ja, der Kita-Gutschein kann auch für Kindertagespflege in Hamburg genutzt werden. Die Förderung wird ähnlich wie in Kitas angerechnet, teilweise gelten jedoch abweichende Kostensätze. Die zuständige Stelle informiert Sie, wie der Gutschein im konkreten Fall eingesetzt wird.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding">
      <div className="content-width">
        <h2 className="text-center">Häufig gestellte Fragen zur Kita-Suche in Hamburg</h2>
        <Accordion type="single" collapsible className="w-full">
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
