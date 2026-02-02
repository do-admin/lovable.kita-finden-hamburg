import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { kitas, type KitaDetail } from "@/data/kitas";

interface FeaturedListingsProps {
  city?: string;
  citySlug?: string;
  maxItems?: number;
  featuredIds?: number[];
  className?: string;
}

// Get featured kitas with priority logic
const getFeaturedKitas = (
  maxItems: number = 6,
  featuredIds?: number[]
): KitaDetail[] => {
  // 1. If explicit IDs provided, use those
  if (featuredIds && featuredIds.length > 0) {
    return kitas
      .filter((k) => featuredIds.includes(k.id))
      .slice(0, maxItems);
  }

  // 2. Sort by rating (highest first), then by name for stability
  const sorted = [...kitas].sort((a, b) => {
    const ratingA = a.googleBewertung || 0;
    const ratingB = b.googleBewertung || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return a.name.localeCompare(b.name);
  });

  return sorted.slice(0, maxItems);
};

const FeaturedListingItem = ({
  kita,
  citySlug,
}: {
  kita: KitaDetail;
  citySlug: string;
}) => {
  const detailUrl = `/kita/${kita.id}`;

  return (
    <article
      className={cn(
        "group flex flex-col sm:flex-row gap-4 p-4 rounded-xl",
        "border border-border/50 bg-card",
        "hover:shadow-md hover:border-border transition-all duration-200"
      )}
    >
      {/* Thumbnail */}
      <Link
        to={detailUrl}
        className="flex-shrink-0 w-full sm:w-40 h-32 sm:h-28 rounded-lg overflow-hidden bg-muted"
      >
        <img
          src={kita.heroImage}
          alt={kita.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <Link
            to={detailUrl}
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
          >
            {kita.name}
          </Link>

          {/* Rating */}
          {kita.googleBewertung && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-foreground">
                {kita.googleBewertung.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {kita.stadtteil}, {kita.bezirk}
          </span>
          {kita.telefon && (
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              {kita.telefon}
            </span>
          )}
          {kita.betreuungszeiten && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {kita.betreuungszeiten}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {kita.beschreibung[0]}
        </p>

        {/* CTA Link */}
        <Link
          to={detailUrl}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-auto"
        >
          Mehr anzeigen
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

const FeaturedListings = ({
  city = "Hamburg",
  citySlug = "hamburg",
  maxItems = 4,
  featuredIds,
  className,
}: FeaturedListingsProps) => {
  const featuredKitas = getFeaturedKitas(maxItems, featuredIds);

  return (
    <section
      className={cn("py-8 md:py-10 bg-muted/30", className)}
      aria-labelledby="featured-listings-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2
            id="featured-listings-heading"
            className="text-lg md:text-xl font-semibold text-foreground"
          >
            Empfohlene Kitas
          </h2>

          <Link
            to="/suche"
            className={cn(
              "inline-flex items-center gap-1 text-sm font-medium text-primary",
              "hover:underline"
            )}
          >
            Alle anzeigen
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Listings Grid - tighter spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {featuredKitas.map((kita) => (
            <FeaturedListingItem
              key={kita.id}
              kita={kita}
              citySlug={citySlug}
            />
          ))}
        </div>

        {/* Bottom CTA - smaller */}
        <div className="mt-5 text-center">
          <Link
            to="/suche"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm",
              "bg-primary text-primary-foreground font-medium",
              "hover:bg-primary/90 transition-colors"
            )}
          >
            Alle Kitas in {city} durchsuchen
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
