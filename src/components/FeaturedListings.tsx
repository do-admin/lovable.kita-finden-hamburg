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
        "group relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-xl",
        "border border-border/60 bg-card",
        "hover:shadow-lg hover:border-primary/30 transition-all duration-200"
      )}
    >
      {/* Thumbnail */}
      <Link
        to={detailUrl}
        className="flex-shrink-0 w-full sm:w-36 md:w-44 h-36 sm:h-32 rounded-lg overflow-hidden bg-muted"
      >
        <img
          src={kita.heroImage}
          alt={kita.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Header row with name and rating */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link
            to={detailUrl}
            className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight"
          >
            {kita.name}
          </Link>

          {/* Rating badge */}
          {kita.googleBewertung && (
            <div className="flex items-center gap-1.5 flex-shrink-0 bg-amber-50 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-amber-700">
                {kita.googleBewertung.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Meta row with icons */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground/70" />
            <span>{kita.adresse.split(",")[0]}, {kita.stadtteil}</span>
          </span>
          {kita.telefon && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-muted-foreground/70" />
              <span>{kita.telefon}</span>
            </span>
          )}
          {kita.betreuungszeiten && (
            <span className="flex items-center gap-1.5 hidden md:flex">
              <Clock className="h-4 w-4 text-muted-foreground/70" />
              <span>{kita.betreuungszeiten}</span>
            </span>
          )}
        </div>

        {/* Description with inline "Mehr anzeigen" */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {kita.beschreibung[0]}{" "}
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline whitespace-nowrap"
          >
            Mehr anzeigen
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </article>
  );
};

const FeaturedListings = ({
  city = "Hamburg",
  citySlug = "hamburg",
  maxItems = 6,
  featuredIds,
  className,
}: FeaturedListingsProps) => {
  const featuredKitas = getFeaturedKitas(maxItems, featuredIds);

  return (
    <section
      className={cn("py-12 md:py-16 bg-muted/30", className)}
      aria-labelledby="featured-listings-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2
              id="featured-listings-heading"
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              Empfohlene Kitas
            </h2>
            <p className="mt-2 text-muted-foreground">
              Schnelle Abkürzung – direkt zu passenden Einrichtungen in {city}
            </p>
          </div>

          <Link
            to="/suche"
            className={cn(
              "inline-flex items-center gap-1 text-sm font-medium text-primary",
              "hover:underline self-start sm:self-auto"
            )}
          >
            Alle anzeigen
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredKitas.map((kita) => (
            <FeaturedListingItem
              key={kita.id}
              kita={kita}
              citySlug={citySlug}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/suche"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
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
