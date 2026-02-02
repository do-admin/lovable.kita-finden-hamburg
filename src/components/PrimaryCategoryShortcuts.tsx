import { Link } from "react-router-dom";
import { ChevronRight, Baby, MapPin, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  browseCategories,
  getKitaCount,
  getSubItemUrl,
  getCategoryUrl,
  defaultCity,
  type CityConfig,
} from "@/data/browse-categories";

interface PrimaryCategoryShortcutsProps {
  city?: CityConfig;
  className?: string;
}

// Only show these high-intent categories
const primaryCategoryIds = ["betreuungsform", "stadtteile", "zeiten", "alter"];

const PrimaryCategoryShortcuts = ({
  city = defaultCity,
  className,
}: PrimaryCategoryShortcutsProps) => {
  const primaryCategories = browseCategories.filter((cat) =>
    primaryCategoryIds.includes(cat.id)
  );

  return (
    <section
      className={cn("py-6 md:py-8 bg-background", className)}
      aria-labelledby="primary-categories-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 id="primary-categories-heading" className="sr-only">
          Schnellzugriff auf Kategorien
        </h2>

        {/* Compact 2x2 or 4-column grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {primaryCategories.map((category) => {
            const Icon = category.icon;
            // Show only top 3 sub-items
            const topItems = category.subItems.slice(0, 3);

            return (
              <article
                key={category.id}
                className={cn(
                  "rounded-lg border border-border/50 p-3 md:p-4 transition-all duration-200",
                  "hover:shadow-sm hover:border-border",
                  category.accentColor
                )}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-white/80 shadow-sm">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Inline sub-items */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {topItems.map((subItem) => {
                    const count = getKitaCount(
                      subItem.filterKey,
                      subItem.filterValue
                    );
                    return (
                      <Link
                        key={subItem.slug}
                        to={getSubItemUrl(subItem.filterKey, subItem.filterValue)}
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          "bg-white/60 hover:bg-white text-foreground",
                          "transition-colors border border-border/30"
                        )}
                      >
                        {subItem.label}{" "}
                        <span className="text-muted-foreground">({count})</span>
                      </Link>
                    );
                  })}
                </div>

                {/* CTA Link */}
                <Link
                  to={getCategoryUrl(city, category.slug)}
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-medium text-primary",
                    "hover:underline"
                  )}
                >
                  Alle anzeigen
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrimaryCategoryShortcuts;
