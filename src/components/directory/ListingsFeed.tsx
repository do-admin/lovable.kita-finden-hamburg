import { Link } from "react-router-dom";
import { MapPin, Star, Navigation, ChevronRight, Badge } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type KitaDetail } from "@/data/kitas";
import { FilterState, sortierungOptionen } from "@/types/filters";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}

interface ListingsFeedProps {
  results: KitaWithDistance[];
  totalCount: number;
  sortierung: FilterState["sortierung"];
  onSortChange: (sort: FilterState["sortierung"]) => void;
  hasLocation: boolean;
  loading?: boolean;
}

const ListingCard = ({
  kita,
  isRecommended = false,
}: {
  kita: KitaWithDistance;
  isRecommended?: boolean;
}) => {
  const detailUrl = `/kita/${kita.id}`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    kita.adresse
  )}`;

  return (
    <article
      className={cn(
        "group flex flex-col sm:flex-row gap-3 p-3 sm:p-4 rounded-lg",
        "border border-border/60 bg-card",
        "hover:shadow-sm hover:border-border transition-all duration-200"
      )}
    >
      {/* Thumbnail */}
      <Link
        to={detailUrl}
        className="flex-shrink-0 w-full sm:w-32 h-24 sm:h-24 rounded-md overflow-hidden bg-muted relative"
      >
        <img
          src={kita.heroImage}
          alt={kita.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isRecommended && (
          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded">
            Empfohlen
          </span>
        )}
        {kita.status === "frei" && (
          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-medium rounded">
            Plätze frei
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            to={detailUrl}
            className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
          >
            {kita.name}
          </Link>

          {/* Rating */}
          {kita.googleBewertung && (
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-foreground">
                {kita.googleBewertung.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground mb-1.5">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {kita.stadtteil}
            {kita.distance !== undefined && (
              <span className="text-primary font-medium ml-1">
                ({kita.distance.toFixed(1)} km)
              </span>
            )}
          </span>
          <span>{kita.betreuungszeiten}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {kita.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-auto">
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Mehr anzeigen
            <ChevronRight className="h-3 w-3" />
          </Link>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Navigation className="h-3 w-3" />
            Route
          </a>
        </div>
      </div>
    </article>
  );
};

const ListingsFeed = ({
  results,
  totalCount,
  sortierung,
  onSortChange,
  hasLocation,
  loading = false,
}: ListingsFeedProps) => {
  // Mark first 4 items as recommended if they have high ratings
  const getIsRecommended = (index: number, kita: KitaWithDistance) => {
    return index < 4 && (kita.googleBewertung || 0) >= 4.5;
  };

  return (
    <div>
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Kitas in Hamburg
          </h1>
          <p className="text-sm text-muted-foreground">
            {loading ? (
              "Lade Ergebnisse..."
            ) : (
              <>
                {results.length} von {totalCount} Ergebnissen
              </>
            )}
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sortieren:</span>
          <Select
            value={sortierung}
            onValueChange={(value) =>
              onSortChange(value as FilterState["sortierung"])
            }
          >
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortierungOptionen.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.value === "entfernung" && !hasLocation}
                  className="text-xs"
                >
                  {opt.label}
                  {opt.value === "entfernung" && !hasLocation && " (Standort)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-muted/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Keine Kitas gefunden. Versuche, deine Filter anzupassen.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((kita, index) => (
            <ListingCard
              key={kita.id}
              kita={kita}
              isRecommended={getIsRecommended(index, kita)}
            />
          ))}
        </div>
      )}

      {/* Load more hint */}
      {results.length > 0 && results.length < totalCount && (
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Zeige {results.length} von {totalCount} Kitas
          </p>
        </div>
      )}
    </div>
  );
};

export default ListingsFeed;
