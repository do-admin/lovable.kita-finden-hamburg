import { ExternalLink } from "lucide-react";

const knowledgeArticles = [
  { title: "Kita-Träger in Hamburg", description: "Überblick über öffentliche, freie und kirchliche Träger in der Hansestadt." },
  { title: "Kita-Gutschein Hamburg", description: "Wie der Kita-Gutschein funktioniert und wie Sie ihn beantragen." },
  { title: "Betreuungszeiten & Modelle", description: "Von Halbtags bis Ganztag – welche Modelle es gibt und wie sie sich unterscheiden." },
  { title: "Eingewöhnung in der Kita", description: "Tipps für einen guten Start in den Kita-Alltag." },
  { title: "Pädagogische Konzepte", description: "Montessori, Reggio, Naturpädagogik und mehr im Überblick." },
  { title: "Inklusion & besondere Bedarfe", description: "Wie Kitas Kinder mit zusätzlichem Unterstützungsbedarf begleiten." },
  { title: "Kosten & Elternbeiträge", description: "Was Eltern in Hamburg finanziell einplanen sollten." },
  { title: "Rechte & Pflichten von Eltern", description: "Wichtige rechtliche Grundlagen verständlich erklärt." }
];

const KnowledgeSidebar = () => {
  return (
    <aside className="bg-background">
      <div className="sticky top-20 space-y-8">
        <section id="wissen">
          <h2 className="text-xl font-semibold mb-4">Wissen rund um Kitas in Hamburg</h2>
          <div className="space-y-4">
            {knowledgeArticles.map((article) => (
              <a
                key={article.title}
                href="#article"
                className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <h3 className="text-sm font-medium mb-1 group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground">{article.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Vertrauenspartner & Erwähnungen</h3>
          <p className="text-sm text-muted-foreground mb-4">
            „Kita finden Hamburg" wird von Familien, Fachkräften und Partnern genutzt, um einen transparenten Überblick über die Kitalandschaft in Hamburg zu bekommen. In Zukunft können hier Logos von Medienberichten, Verbänden oder Kooperationspartnern eingebunden werden.
          </p>
          <div className="flex flex-wrap gap-3 items-center opacity-30">
            <div className="w-20 h-8 bg-muted rounded" />
            <div className="w-20 h-8 bg-muted rounded" />
            <div className="w-20 h-8 bg-muted rounded" />
          </div>
        </section>
      </div>
    </aside>
  );
};

export default KnowledgeSidebar;
