const articles = [
  {
    title: "Kita-Suche in Hamburg: So finden Sie die passende Einrichtung",
    description: "Welche Schritte bei der Suche wichtig sind, wie Sie Prioritäten setzen und worauf Sie bei Besichtigungsterminen achten sollten."
  },
  {
    title: "Kita-Gutschein Hamburg: Voraussetzungen, Antrag & Fristen",
    description: "Ein verständlicher Überblick über Anspruch, Berechnung und den Online-Antrag für den Kita-Gutschein."
  },
  {
    title: "Eingewöhnung: Wie Ihr Kind gut in der Kita ankommt",
    description: "Tipps zur Vorbereitung, typische Phasen der Eingewöhnung und sinnvolle Absprachen mit der Kita."
  }
];

const RatgeberSection = () => {
  return (
    <section id="ratgeber">
      <h2>Ratgeber für Praxis & Kita-Alltag</h2>
      <p className="text-muted-foreground mb-8">
        Unser Ratgeber unterstützt Sie mit praxisnahen Artikeln zu Themen wie Kita-Suche, Kita-Gutschein, Eingewöhnung und Zusammenarbeit mit Trägern. Die Inhalte werden regelmäßig aktualisiert und bauen auf der Erfahrung von Fachleuten und Eltern in Hamburg auf.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.title} className="card-shadow rounded-lg p-6 bg-card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-3">{article.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.description}</p>
            <a href="#artikel" className="text-sm text-primary hover:underline">
              Zum Artikel →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RatgeberSection;
