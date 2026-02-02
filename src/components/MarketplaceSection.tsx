import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  ChevronDown,
  Filter,
  RotateCcw,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { kitas, type KitaDetail } from "@/data/kitas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

// Filter configuration
const filterConfig = {
  betreuungsform: {
    label: "Betreuungsform",
    options: [
      { value: "krippe", label: "Krippe" },
      { value: "elementar", label: "Elementar" },
      { value: "hort", label: "Hort" },
      { value: "ganztag", label: "Ganztag" },
    ],
  },
  stadtteile: {
    label: "Stadtteile",
    options: [
      { value: "Hamburg-Mitte", label: "Hamburg-Mitte" },
      { value: "Altona", label: "Altona" },
      { value: "Eimsbüttel", label: "Eimsbüttel" },
      { value: "Hamburg-Nord", label: "Hamburg-Nord" },
    ],
    showMore: true,
  },
  oeffnungszeiten: {
    label: "Öffnungszeiten",
    options: [
      { value: "ganztag", label: "Ganztagsbetreuung" },
      { value: "teilzeit", label: "Teilzeit" },
      { value: "erweitert", label: "Erweiterte Zeiten" },
    ],
  },
  alter: {
    label: "Altersgruppe",
    options: [
      { value: "U3", label: "Unter 3 Jahre (U3)" },
      { value: "Ü3", label: "Über 3 Jahre (Ü3)" },
      { value: "Vorschule", label: "Vorschule" },
    ],
  },
  paedagogik: {
    label: "Pädagogik",
    options: [
      { value: "Montessori", label: "Montessori" },
      { value: "Waldorf", label: "Waldorf" },
      { value: "Situationsansatz", label: "Situationsansatz" },
      { value: "Naturpädagogik", label: "Naturpädagogik" },
    ],
  },
  besonderheiten: {
    label: "Besonderheiten",
    options: [
      { value: "Integrativ", label: "Integrativ" },
      { value: "Bio-Essen", label: "Bio-Essen" },
      { value: "Außenbereich", label: "Außenbereich" },
      { value: "Bilingual", label: "Mehrsprachig" },
    ],
  },
};

type FilterState = {
  betreuungsform: string[];
  stadtteile: string[];
  oeffnungszeiten: string[];
  alter: string[];
  paedagogik: string[];
  besonderheiten: string[];
};

const initialFilters: FilterState = {
  betreuungsform: [],
  stadtteile: [],
  oeffnungszeiten: [],
  alter: [],
  paedagogik: [],
  besonderheiten: [],
};

// Filter kitas based on selected filters
const filterKitas = (allKitas: KitaDetail[], filters: FilterState): KitaDetail[] => {
  return allKitas.filter((kita) => {
    // Betreuungsform
    if (filters.betreuungsform.length > 0) {
      const hasMatch = filters.betreuungsform.some((f) =>
        kita.betreuungsart.some((b) => b.toLowerCase() === f.toLowerCase())
      );
      if (!hasMatch && !filters.betreuungsform.includes("ganztag")) return false;
      if (
        filters.betreuungsform.includes("ganztag") &&
        kita.oeffnungszeitenKategorie !== "ganztag" &&
        !hasMatch
      )
        return false;
    }

    // Stadtteile (Bezirk)
    if (filters.stadtteile.length > 0) {
      if (!filters.stadtteile.includes(kita.bezirk)) return false;
    }

    // Öffnungszeiten
    if (filters.oeffnungszeiten.length > 0) {
      if (!filters.oeffnungszeiten.includes(kita.oeffnungszeitenKategorie)) return false;
    }

    // Altersgruppe
    if (filters.alter.length > 0) {
      const hasAgeMatch = filters.alter.some((ageFilter) => {
        if (ageFilter === "U3")
          return kita.alter.includes("0") || kita.alter.includes("1") || kita.alter.includes("2");
        if (ageFilter === "Ü3")
          return kita.alter.includes("3") || kita.alter.includes("4") || kita.alter.includes("5");
        if (ageFilter === "Vorschule") return kita.alter.includes("5") || kita.alter.includes("6");
        return false;
      });
      if (!hasAgeMatch) return false;
    }

    // Pädagogik
    if (filters.paedagogik.length > 0) {
      if (!filters.paedagogik.includes(kita.konzept)) return false;
    }

    // Besonderheiten
    if (filters.besonderheiten.length > 0) {
      const hasFeature = filters.besonderheiten.some((f) => kita.besonderheiten.includes(f));
      if (!hasFeature) return false;
    }

    return true;
  });
};

// Sort by rating (highest first), then by name
const sortKitas = (kitaList: KitaDetail[]): KitaDetail[] => {
  return [...kitaList].sort((a, b) => {
    const ratingA = a.googleBewertung || 0;
    const ratingB = b.googleBewertung || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return a.name.localeCompare(b.name);
  });
};

// Filter Group Component
const FilterGroup = ({
  groupKey,
  config,
  filters,
  onFilterChange,
  defaultOpen = false,
}: {
  groupKey: keyof FilterState;
  config: (typeof filterConfig)[keyof typeof filterConfig];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string, checked: boolean) => void;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const selectedCount = filters[groupKey].length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border/50">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left hover:bg-muted/30 transition-colors">
        <span className="text-sm font-medium text-foreground flex items-center gap-2">
          {config.label}
          {selectedCount > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-3">
        <div className="space-y-2 pt-1">
          {config.options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`${groupKey}-${option.value}`}
                checked={filters[groupKey].includes(option.value)}
                onCheckedChange={(checked) => onFilterChange(groupKey, option.value, !!checked)}
                className="h-4 w-4"
              />
              <Label
                htmlFor={`${groupKey}-${option.value}`}
                className="text-sm text-foreground cursor-pointer leading-none"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Filter Sidebar Content
const FilterContent = ({
  filters,
  onFilterChange,
  onReset,
}: {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string, checked: boolean) => void;
  onReset: () => void;
}) => {
  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  return (
    <div className="space-y-0">
      <FilterGroup
        groupKey="betreuungsform"
        config={filterConfig.betreuungsform}
        filters={filters}
        onFilterChange={onFilterChange}
        defaultOpen
      />
      <FilterGroup
        groupKey="stadtteile"
        config={filterConfig.stadtteile}
        filters={filters}
        onFilterChange={onFilterChange}
        defaultOpen
      />
      <FilterGroup
        groupKey="oeffnungszeiten"
        config={filterConfig.oeffnungszeiten}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <FilterGroup
        groupKey="alter"
        config={filterConfig.alter}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <FilterGroup
        groupKey="paedagogik"
        config={filterConfig.paedagogik}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <FilterGroup
        groupKey="besonderheiten"
        config={filterConfig.besonderheiten}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Filter zurücksetzen
        </button>
      )}
    </div>
  );
};

// Featured Listing Item (same as before)
const FeaturedListingItem = ({ kita }: { kita: KitaDetail }) => {
  const detailUrl = `/kita/${kita.id}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl",
        "border border-border/60 bg-card",
        "hover:shadow-lg hover:border-primary/30 transition-all duration-200"
      )}
    >
      {/* Thumbnail */}
      <Link
        to={detailUrl}
        className="flex-shrink-0 w-full sm:w-32 md:w-36 h-32 sm:h-28 rounded-lg overflow-hidden bg-muted"
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
            className="text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight"
          >
            {kita.name}
          </Link>

          {/* Rating badge */}
          {kita.googleBewertung && (
            <div className="flex items-center gap-1 flex-shrink-0 bg-amber-50 px-2 py-1 rounded-md">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-amber-700">
                {kita.googleBewertung.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Meta row with icons */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[140px]">{kita.stadtteil}</span>
          </span>
          {kita.telefon && (
            <span className="flex items-center gap-1 hidden md:flex">
              <Phone className="h-3.5 w-3.5" />
              <span>{kita.telefon}</span>
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

// Main Component
const MarketplaceSection = ({
  city = "Hamburg",
  maxItems = 6,
  className,
}: {
  city?: string;
  maxItems?: number;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked ? [...prev[key], value] : prev[key].filter((v) => v !== value),
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const filteredKitas = useMemo(() => {
    const filtered = filterKitas(kitas, filters);
    return sortKitas(filtered).slice(0, maxItems);
  }, [filters, maxItems]);

  const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <section
      className={cn("py-10 md:py-14 bg-muted/30", className)}
      aria-labelledby="marketplace-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Mobile Filter Button */}
        {isMobile && (
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full mb-4 flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-left">Filter</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100%-80px)] pb-4">
                <FilterContent
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleReset}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                  {filteredKitas.length} Ergebnisse anzeigen
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Two-Panel Layout */}
        <div className="flex gap-6">
          {/* LEFT: Sticky Filter Sidebar (Desktop only) */}
          {!isMobile && (
            <aside className="w-[280px] flex-shrink-0">
              <div className="sticky top-24 bg-card border border-border/60 rounded-xl p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                <h3 className="text-base font-semibold text-foreground mb-4">Filter</h3>
                <FilterContent
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleReset}
                />
              </div>
            </aside>
          )}

          {/* RIGHT: Featured Listings */}
          <div className="flex-1 min-w-0">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <h2
                  id="marketplace-heading"
                  className="text-2xl md:text-3xl font-bold text-foreground"
                >
                  Empfohlene Kitas
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Schnelle Abkürzung – direkt zu passenden Einrichtungen in {city}
                </p>
              </div>

              <Link
                to="/suche"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline self-start sm:self-auto"
              >
                Alle anzeigen
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Active Filters Pills (Desktop) */}
            {!isMobile && activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(filters).map(([key, values]) =>
                  values.map((value) => (
                    <button
                      key={`${key}-${value}`}
                      onClick={() => handleFilterChange(key as keyof FilterState, value, false)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {value}
                      <X className="h-3 w-3" />
                    </button>
                  ))
                )}
                <button
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Alle entfernen
                </button>
              </div>
            )}

            {/* Listings Grid */}
            {filteredKitas.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredKitas.map((kita) => (
                  <FeaturedListingItem key={kita.id} kita={kita} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border/60">
                <p className="text-muted-foreground mb-4">
                  Keine Kitas gefunden, die den Filterkriterien entsprechen.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Filter zurücksetzen
                </Button>
              </div>
            )}

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
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
