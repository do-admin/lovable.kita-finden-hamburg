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
    <section className="w-full bg-[#e0f2fe] py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <h3 className="text-[20px] lg:text-[22px] font-semibold text-foreground mb-5">
          Beliebte Suchen
        </h3>
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {trendingTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => navigate(`/kitas?q=${encodeURIComponent(term)}`)}
              className="px-4 py-2.5 rounded-full border border-border bg-background hover:bg-muted text-[16px] font-medium text-foreground transition-colors"
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
