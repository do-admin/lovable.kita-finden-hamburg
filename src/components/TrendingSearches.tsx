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

const TrendingSearches = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#f1f5f9] py-10 lg:py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <h3 className="text-[16px] lg:text-[18px] font-bold text-foreground mb-4">
          Beliebte Suchen
        </h3>
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {trendingTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => navigate(`/kitas?q=${encodeURIComponent(term)}`)}
              className="px-3 py-2 rounded-full border border-border bg-background hover:bg-muted text-[13px] font-medium text-foreground transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSearches;
