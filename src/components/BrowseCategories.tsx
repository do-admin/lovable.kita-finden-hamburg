import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface BrowseCategoriesProps {
  city?: CityConfig;
  categories?: BrowseCategory[];
  className?: string;
  /** If true, shows as a collapsible secondary section */
  collapsible?: boolean;
}

const CompactCategoryCard = ({
  category,
  city,
  isExpanded,
}: {
  category: BrowseCategory;
  city: CityConfig;
  isExpanded: boolean;
}) => {
  const Icon = category.icon;

  return (
    <article
      className={cn(
        "rounded-lg border border-border/40 p-3 transition-all duration-200",
        "hover:shadow-sm hover:border-border",
        category.accentColor
      )}
    >
      {/* Header */}
      <Link
        to={getCategoryUrl(city, category.slug)}
        className="flex items-center gap-2 group"
      >
        <div className="p-1.5 rounded-md bg-white/80 shadow-sm">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
      </Link>

      {/* Expanded sub-items */}
      {isExpanded && (
        <ul className="mt-2 space-y-1 pl-8">
          {category.subItems.map((subItem) => {
            const count = getKitaCount(subItem.filterKey, subItem.filterValue);
            return (
              <li key={subItem.slug}>
                <Link
                  to={getSubItemUrl(subItem.filterKey, subItem.filterValue)}
                  className={cn(
                    "flex items-center justify-between py-1 text-xs text-foreground",
                    "hover:text-primary transition-colors"
                  )}
                >
                  <span>{subItem.label}</span>
                  <span className="text-muted-foreground">({count})</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
};

const BrowseCategories = ({
  city = defaultCity,
  categories = browseCategories,
  className,
  collapsible = false,
}: BrowseCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (collapsible) {
    return (
      <section
        className={cn("py-6 md:py-8 bg-muted/20", className)}
        aria-labelledby="browse-categories-heading"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between mb-4">
              <h2
                id="browse-categories-heading"
                className="text-lg md:text-xl font-semibold text-foreground"
              >
                Alle Kategorien
              </h2>
              <CollapsibleTrigger
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium text-primary",
                  "hover:underline px-3 py-1.5 rounded-md hover:bg-primary/5 transition-colors"
                )}
              >
                {isOpen ? "Einklappen" : "Alle Kategorien anzeigen"}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
            </div>

            {/* Collapsed state: show compact grid with just icons and titles */}
            {!isOpen && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {categories.map((category) => (
                  <CompactCategoryCard
                    key={category.id}
                    category={category}
                    city={city}
                    isExpanded={false}
                  />
                ))}
              </div>
            )}

            {/* Expanded state: show full grid with sub-items */}
            <CollapsibleContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                {categories.map((category) => (
                  <CompactCategoryCard
                    key={category.id}
                    category={category}
                    city={city}
                    isExpanded={true}
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    );
  }

  // Non-collapsible version (original but more compact)
  return (
    <section
      className={cn("py-8 md:py-10 bg-background", className)}
      aria-labelledby="browse-categories-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-5">
          <h2
            id="browse-categories-heading"
            className="text-xl md:text-2xl font-bold text-foreground"
          >
            Kitas nach Kategorien entdecken
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Finde die passende Kita in {city.name} – nach Betreuungsform,
            Pädagogik oder Stadtteil
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map((category) => (
            <CompactCategoryCard
              key={category.id}
              category={category}
              city={city}
              isExpanded={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
