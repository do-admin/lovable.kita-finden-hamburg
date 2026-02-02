import { useNavigate } from "react-router-dom";

const trendingTerms = [
  "Kita Altona",
  "Montessori Eimsbüttel",
  "Krippe Winterhude",
  "Notfallbetreuung",
  "Eltern-Kind-Gruppe",
  "Sprachförderung Kita",
  "Kita mit Mittagessen",
  "Kita Hamburg Nord"
];

const TrendingSearchesCompact = () => {
  const navigate = useNavigate();

  const handleTermClick = (term: string) => {
    // Update URL with search term - DirectorySection will pick it up
    const params = new URLSearchParams(window.location.search);
    params.set("q", term);
    navigate(`/?${params.toString()}`);
  };

  return (
    <section className="w-full bg-muted/50 py-4">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground mr-1">
            Beliebte Suchen:
          </span>
          {trendingTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleTermClick(term)}
              className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSearchesCompact;
