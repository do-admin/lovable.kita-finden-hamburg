import { FilterState } from "@/pages/Suche";
import { X, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface Kita {
  id: number;
  name: string;
  adresse: string;
  bezirk: string;
  stadtteil: string;
  alter: string;
  plaetzeFrei: boolean;
  warteliste?: boolean;
  konzepte: string[];
  betreuungszeit: string;
}

interface SearchResultsProps {
  results: Kita[];
  totalCount: number;
  searchQuery: string;
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value: string) => void;
}

const ITEMS_PER_PAGE = 6;

const SearchResults = ({
  results,
  totalCount,
  searchQuery,
  filters,
  onRemoveFilter,
}: SearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Collect active filters for chips
  const activeFilters: { key: keyof FilterState; value: string; label: string }[] = [];
  
  filters.bezirke.forEach((b) => activeFilters.push({ key: "bezirke", value: b, label: b }));
  filters.alter.forEach((a) => activeFilters.push({ key: "alter", value: a, label: a }));
  filters.konzepte.forEach((k) => activeFilters.push({ key: "konzepte", value: k, label: k }));
  filters.betreuungszeiten.forEach((z) => activeFilters.push({ key: "betreuungszeiten", value: z, label: z }));
  if (filters.plaetzeFrei !== "alle") {
    const label = filters.plaetzeFrei === "ja" ? "Plätze frei" : 
                  filters.plaetzeFrei === "warteliste" ? "Warteliste" : "Keine Plätze";
    activeFilters.push({ key: "plaetzeFrei", value: filters.plaetzeFrei, label });
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          {results.length} Kitas gefunden
          {searchQuery && <span className="font-normal text-muted-foreground"> für: „{searchQuery}"</span>}
          {filters.bezirke.length === 1 && <span className="font-normal text-muted-foreground"> in {filters.bezirke[0]}</span>}
        </h1>
        
        <p className="text-base text-muted-foreground">
          Zeige {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, results.length)} von {results.length} Kitas
        </p>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeFilters.map((filter, idx) => (
              <Badge
                key={`${filter.key}-${filter.value}-${idx}`}
                variant="secondary"
                className="bg-accent text-accent-foreground pl-3 pr-2 py-1.5 text-sm flex items-center gap-1.5"
              >
                {filter.label}
                <button
                  onClick={() => onRemoveFilter(filter.key, filter.value)}
                  className="hover:bg-accent-foreground/10 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {paginatedResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paginatedResults.map((kita) => (
            <KitaCard key={kita.id} kita={kita} />
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-2xl p-12 text-center">
          <p className="text-lg text-muted-foreground">
            Keine Kitas gefunden. Versuche, deine Filter anzupassen.
          </p>
        </div>
      )}

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
    </div>
  );
};

const KitaCard = ({ kita }: { kita: Kita }) => {
  return (
    <article className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow duration-200">
      {/* Name */}
      <h3 className="text-lg font-bold text-primary mb-1">{kita.name}</h3>
      
      {/* Address */}
      <p className="text-sm text-muted-foreground mb-3">
        {kita.adresse}, {kita.stadtteil} · {kita.bezirk}
      </p>
      
      {/* Info Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-foreground">{kita.alter}</span>
        <span className="text-muted-foreground">·</span>
        
        {/* Availability Badge */}
        {kita.plaetzeFrei ? (
          <Badge className="bg-success text-success-foreground text-xs">
            Plätze frei
          </Badge>
        ) : kita.warteliste ? (
          <Badge className="bg-accent text-accent-foreground text-xs">
            Warteliste
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-xs">
            Keine Plätze
          </Badge>
        )}
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge variant="outline" className="text-xs font-normal">
          {kita.betreuungszeit}
        </Badge>
        {kita.konzepte.slice(0, 2).map((konzept) => (
          <Badge key={konzept} variant="outline" className="text-xs font-normal">
            {konzept}
          </Badge>
        ))}
        {kita.konzepte.length > 2 && (
          <Badge variant="outline" className="text-xs font-normal">
            +{kita.konzepte.length - 2}
          </Badge>
        )}
      </div>
      
      {/* CTA */}
      <Link
        to={`/kita/${kita.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Details ansehen
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
};

export default SearchResults;
