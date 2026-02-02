import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ArrowRight, X, Search, Star } from "lucide-react";
import { KitaDetail } from "@/data/kitas";
import { FilterState } from "@/types/filters";
import { formatDistance } from "@/hooks/useGeolocation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}

interface SearchResultsProps {
  results: KitaWithDistance[];
  totalCount: number;
  searchQuery: string;
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string) => void;
  loading?: boolean;
}

const ITEMS_PER_PAGE = 9;

// Get filter label for display
const getFilterLabel = (key: keyof FilterState, value: string): string => {
  const labels: Record<string, Record<string, string>> = {
    betreuungsart: { krippe: "Krippe", elementar: "Elementar", hort: "Hort" },
    oeffnungszeiten: { ganztag: "Ganztag", teilzeit: "Teilzeit", erweitert: "Erweitert" },
    plaetzeFrei: { frei: "Plätze frei", warteliste: "Warteliste" },
  };
  return labels[key]?.[value] || value;
};

// Active filter chips component
const ActiveFilters = ({
  filters,
  onRemove,
}: {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value?: string) => void;
}) => {
  const chips: { key: keyof FilterState; value: string; label: string }[] = [];

  // Collect all active filters
  filters.bezirke.forEach(v => chips.push({ key: "bezirke", value: v, label: v }));
  filters.stadtteile.forEach(v => chips.push({ key: "stadtteile", value: v, label: v }));
  filters.betreuungsart.forEach(v => chips.push({ key: "betreuungsart", value: v, label: getFilterLabel("betreuungsart", v) }));
  filters.oeffnungszeiten.forEach(v => chips.push({ key: "oeffnungszeiten", value: v, label: getFilterLabel("oeffnungszeiten", v) }));
  filters.besonderheiten.forEach(v => chips.push({ key: "besonderheiten", value: v, label: v }));
  filters.konzepte.forEach(v => chips.push({ key: "konzepte", value: v, label: v }));
  if (filters.plaetzeFrei !== "alle") {
    chips.push({ key: "plaetzeFrei", value: filters.plaetzeFrei, label: getFilterLabel("plaetzeFrei", filters.plaetzeFrei) });
  }
  if (filters.radius) {
    chips.push({ key: "radius", value: String(filters.radius), label: `${filters.radius} km Umkreis` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {chips.map((chip, i) => (
        <Badge
          key={`${String(chip.key)}-${chip.value}-${i}`}
          variant="secondary"
          className="pl-3 pr-1.5 py-1.5 gap-1.5 cursor-pointer hover:bg-secondary/80"
          onClick={() => onRemove(chip.key, chip.value)}
        >
          {chip.label}
          <X className="h-3 w-3" />
        </Badge>
      ))}
    </div>
  );
};

// Empty state component
const EmptyState = ({ searchQuery, hasFilters }: { searchQuery: string; hasFilters: boolean }) => (
  <div className="text-center py-16 px-4">
    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
      <Search className="h-8 w-8 text-muted-foreground" />
    </div>
    <h2 className="text-xl font-semibold text-foreground mb-3">
      Keine Kitas gefunden
    </h2>
    <p className="text-muted-foreground max-w-md mx-auto mb-6">
      {searchQuery
        ? `Für "${searchQuery}" wurden keine Ergebnisse gefunden.`
        : "Für die gewählten Filter wurden keine Kitas gefunden."}
    </p>
    <div className="space-y-2 text-sm text-muted-foreground">
      <p className="font-medium">Tipps:</p>
      <ul className="space-y-1">
        <li>• Versuche einen anderen Suchbegriff</li>
        <li>• Wähle einen größeren Umkreis</li>
        {hasFilters && <li>• Entferne einige Filter</li>}
        <li>• Suche nach einem Stadtteil oder Bezirk</li>
      </ul>
    </div>
  </div>
);

// Kita card component
const KitaCard = ({ kita }: { kita: KitaWithDistance }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(kita.adresse)}`;

  return (
    <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Image */}
      <div className="aspect-[4/3] w-full relative">
        <img
          src={kita.heroImage}
          alt={kita.name}
          className="w-full h-full object-cover"
        />
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={kita.status === "frei" ? "default" : "secondary"}
            className={kita.status === "frei" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {kita.status === "frei" ? "Plätze frei" : "Warteliste"}
          </Badge>
        </div>
        {/* Distance Badge */}
        {kita.distance !== undefined && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {formatDistance(kita.distance)}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15px] md:text-[16px] font-semibold text-foreground mb-1 leading-tight">
          {kita.name}
        </h3>

        {/* Rating */}
        {kita.googleBewertung && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{kita.googleBewertung}</span>
          </div>
        )}

        {/* Address */}
        <p className="text-sm text-muted-foreground mb-3">
          {kita.adresse}
        </p>

        {/* Meta Info */}
        <div className="text-xs text-muted-foreground mb-3">
          {kita.bezirk} · {kita.stadtteil} · {kita.alter}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {kita.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] md:text-[11px] px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {kita.tags.length > 4 && (
            <Badge variant="outline" className="text-[10px] md:text-[11px] px-2 py-0.5">
              +{kita.tags.length - 4}
            </Badge>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <Link to={`/kita/${kita.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              Details ansehen
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="px-3" title="Route starten">
              <Navigation className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
};

const SearchResults = ({
  results,
  totalCount,
  searchQuery,
  filters,
  onRemoveFilter,
  loading = false,
}: SearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const hasActiveFilters =
    filters.bezirke.length > 0 ||
    filters.stadtteile.length > 0 ||
    filters.betreuungsart.length > 0 ||
    filters.oeffnungszeiten.length > 0 ||
    filters.besonderheiten.length > 0 ||
    filters.konzepte.length > 0 ||
    filters.plaetzeFrei !== "alle" ||
    filters.radius !== null;

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {results.length} {results.length === 1 ? "Kita" : "Kitas"} gefunden
          {searchQuery && (
            <span className="font-normal text-muted-foreground">
              {" "}für „{searchQuery}"
            </span>
          )}
        </h1>
        {results.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            Zeige {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, results.length)} von {results.length}
          </p>
        )}
        {totalCount > results.length && (
          <p className="text-sm text-muted-foreground mt-1">
            {totalCount - results.length} weitere durch Filter ausgeblendet
          </p>
        )}
      </div>

      {/* Active Filter Chips */}
      <ActiveFilters filters={filters} onRemove={onRemoveFilter} />

      {/* Results or Empty State */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-secondary" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-3 bg-secondary rounded w-1/2" />
                <div className="h-3 bg-secondary rounded w-full" />
                <div className="flex gap-2">
                  <div className="h-6 bg-secondary rounded w-16" />
                  <div className="h-6 bg-secondary rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState searchQuery={searchQuery} hasFilters={hasActiveFilters} />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedResults.map((kita) => (
              <KitaCard key={kita.id} kita={kita} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
