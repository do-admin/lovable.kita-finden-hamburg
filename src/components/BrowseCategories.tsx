import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  browseCategories,
  getKitaCount,
  getSubItemUrl,
  getCategoryUrl,
  defaultCity,
  type CityConfig,
  type BrowseCategory,
} from "@/data/browse-categories";

interface BrowseCategoriesProps {
  city?: CityConfig;
  categories?: BrowseCategory[];
  className?: string;
}

const CategoryCard = ({
  category,
  city,
}: {
  category: BrowseCategory;
  city: CityConfig;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <article
      className={cn(
        "rounded-xl border border-border/50 p-5 transition-all duration-200",
        "hover:shadow-md hover:border-border",
        "focus-within:ring-2 focus-within:ring-primary/20",
        category.accentColor
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-white/80 shadow-sm">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {category.title}
        </h3>
      </div>

      {/* Sub-items list */}
      <ul className="space-y-2 mb-4">
        {category.subItems
          .slice(0, isExpanded ? undefined : 4)
          .map((subItem) => {
            const count = getKitaCount(subItem.filterKey, subItem.filterValue);
            return (
              <li key={subItem.slug}>
                <Link
                  to={getSubItemUrl(subItem.filterKey, subItem.filterValue)}
                  className={cn(
                    "flex items-center justify-between py-1.5 px-2 -mx-2 rounded-md",
                    "text-sm text-foreground hover:bg-white/60 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <span>{subItem.label}</span>
                  <span className="text-muted-foreground text-xs">
                    ({count})
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>

      {/* Show more button for mobile */}
      {category.subItems.length > 4 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary hover:underline mb-3 md:hidden focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
        >
          {isExpanded ? "Weniger anzeigen" : `+${category.subItems.length - 4} weitere`}
        </button>
      )}

      {/* CTA Link */}
      <Link
        to={getCategoryUrl(city, category.slug)}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium text-primary",
          "hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
        )}
      >
        Alle anzeigen
        <ChevronRight className="h-4 w-4" />
      </Link>
    </article>
  );
};

const BrowseCategories = ({
  city = defaultCity,
  categories = browseCategories,
  className,
}: BrowseCategoriesProps) => {
  return (
    <section
      className={cn("py-12 md:py-16 bg-background", className)}
      aria-labelledby="browse-categories-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <h2
            id="browse-categories-heading"
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            Kitas nach Kategorien entdecken
          </h2>
          <p className="mt-2 text-muted-foreground">
            Finden Sie die passende Kita in {city.name} – nach Betreuungsform,
            Pädagogik oder Stadtteil
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
