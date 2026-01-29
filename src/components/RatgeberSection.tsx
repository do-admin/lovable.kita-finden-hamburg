import { Link, useNavigate } from "react-router-dom";
import { ratgeberArticles } from "@/data/ratgeber-articles";

const RatgeberSection = () => {
  const navigate = useNavigate();
  // Show first 3 articles on the homepage
  const displayedArticles = ratgeberArticles.slice(0, 3);

  return (
    <section id="ratgeber" className="max-w-[880px] mx-auto">
      <h2 className="mb-6">Ratgeber für Praxis & Kita-Alltag</h2>
      <p className="text-muted-foreground mb-8">
        Unser Ratgeber unterstützt dich mit praxisnahen Artikeln zu Themen wie Kita-Suche, Kita-Gutschein, Eingewöhnung und Zusammenarbeit mit Trägern. Die Inhalte werden regelmäßig aktualisiert und bauen auf der Erfahrung von Fachleuten und Eltern in Hamburg auf.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <article key={article.slug} className="card-shadow rounded-lg bg-card hover:shadow-lg transition-shadow overflow-hidden">
            {/* Placeholder Image */}
            <div className="aspect-[4/3] w-full">
              <img 
                src="/placeholder.svg" 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3">{article.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.description}</p>
              <button 
                onClick={() => {
                  navigate(`/ratgeber/${article.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-sm text-primary hover:underline"
              >
                Zum Artikel →
              </button>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => {
            navigate("/ratgeber");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-primary hover:underline font-medium"
        >
          Alle Ratgeber-Artikel anzeigen →
        </button>
      </div>
    </section>
  );
};

export default RatgeberSection;
