import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight, Navigation, ChevronDown, Filter, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { kitas, hamburgerBezirke, type KitaDetail } from "@/data/kitas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { formatDistance, calculateDistance, useGeolocation } from "@/hooks/useGeolocation";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}

// Filter configuration
const filterConfig = {
  betreuungsform: {
    label: "Betreuungsform",
    options: [
      { value: "krippe", label: "Krippe" },
      { value: "elementar", label: "Elementar" },
      { value: "hort", label: "Hort" },
    ],
  },
  bezirke: {
    label: "Bezirke",
    options: Object.keys(hamburgerBezirke).map(b => ({ value: b, label: b })),
  },
  oeffnungszeiten: {
    label: "Öffnungszeiten",
    options: [
      { value: "ganztag", label: "Ganztagsbetreuung" },
      { value: "teilzeit", label: "Teilzeit" },
      { value: "erweitert", label: "Erweiterte Zeiten" },
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
      { value: "Outdoor", label: "Außenbereich" },
      { value: "Bilingual", label: "Mehrsprachig" },
    ],
  },
};

type FilterState = {
  betreuungsform: string[];
  bezirke: string[];
  oeffnungszeiten: string[];
  paedagogik: string[];
  besonderheiten: string[];
};

const initialFilters: FilterState = {
  betreuungsform: [],
  bezirke: [],
  oeffnungszeiten: [],
  paedagogik: [],
  besonderheiten: [],
};

// Filter kitas based on selected filters
const filterKitas = (allKitas: KitaWithDistance[], filters: FilterState): KitaWithDistance[] => {
  return allKitas.filter((kita) => {
    if (filters.betreuungsform.length > 0) {
      const hasMatch = filters.betreuungsform.some((f) =>
        kita.betreuungsart.some((b) => b.toLowerCase() === f.toLowerCase())
      );
      if (!hasMatch) return false;
    }

    if (filters.bezirke.length > 0) {
      if (!filters.bezirke.includes(kita.bezirk)) return false;
    }

    if (filters.oeffnungszeiten.length > 0) {
      if (!filters.oeffnungszeiten.includes(kita.oeffnungszeitenKategorie)) return false;
    }

    if (filters.paedagogik.length > 0) {
      if (!filters.paedagogik.includes(kita.konzept)) return false;
    }

    if (filters.besonderheiten.length > 0) {
      const hasFeature = filters.besonderheiten.some((f) => kita.besonderheiten.includes(f));
      if (!hasFeature) return false;
    }

    return true;
  });
};

// Sort by rating (highest first), then by name
const sortKitas = (kitaList: KitaWithDistance[]): KitaWithDistance[] => {
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
                id={`marketplace-${groupKey}-${option.value}`}
                checked={filters[groupKey].includes(option.value)}
                onCheckedChange={(checked) => onFilterChange(groupKey, option.value, !!checked)}
                className="h-4 w-4"
              />
              <Label
                htmlFor={`marketplace-${groupKey}-${option.value}`}
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
        groupKey="bezirke"
        config={filterConfig.bezirke}
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

// Kita Card Component
const KitaCard = ({ kita, distance }: { kita: KitaDetail; distance?: number }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(kita.adresse)}`;

  return (
    <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-[4/3] w-full relative">
        <img src={kita.heroImage} alt={kita.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <Badge
            variant={kita.status === "frei" ? "default" : "secondary"}
            className={kita.status === "frei" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {kita.status === "frei" ? "Plätze frei" : "Warteliste"}
          </Badge>
        </div>
        {distance !== undefined && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {formatDistance(distance)}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15px] md:text-[16px] font-semibold text-foreground mb-1">{kita.name}</h3>
        {kita.googleBewertung && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{kita.googleBewertung}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-3">{kita.adresse}</p>
        <div className="text-xs text-muted-foreground mb-3">{kita.alter} · {kita.betreuungszeiten}</div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {kita.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">{tag}</Badge>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex gap-2 mt-auto">
          <Link to={`/kita/${kita.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              Details <ArrowRight className="h-4 w-4 ml-1" />
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
  const { latitude, longitude } = useGeolocation();
  const hasLocation = latitude !== null && longitude !== null;
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

  const displayedKitas = useMemo((): KitaWithDistance[] => {
    const kitasWithDistance: KitaWithDistance[] = kitas.map(k => ({
      ...k,
      distance: hasLocation ? calculateDistance(latitude!, longitude!, k.coordinates.lat, k.coordinates.lng) : undefined
    }));

    // Apply filters
    const filtered = filterKitas(kitasWithDistance, filters);
    
    // Sort by distance if available, otherwise by rating
    if (hasLocation) {
      return filtered
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, maxItems);
    }
    
    return sortKitas(filtered).slice(0, maxItems);
  }, [hasLocation, latitude, longitude, maxItems, filters]);

  const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <section
      className={cn("py-10 md:py-14 bg-muted/30", className)}
      aria-labelledby="marketplace-heading"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2
            id="marketplace-heading"
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Empfohlene Kitas in {city}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schnelle Abkürzung – direkt zu passenden Einrichtungen in {city}
          </p>
        </div>

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
                  {displayedKitas.length} Ergebnisse anzeigen
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

          {/* RIGHT: Kita Grid */}
          <div className="flex-1 min-w-0">
            {displayedKitas.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedKitas.map(kita => (
                  <KitaCard key={kita.id} kita={kita} distance={kita.distance} />
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-2xl p-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  Keine Kitas gefunden, die Ihren Filterkriterien entsprechen.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Filter zurücksetzen
                </Button>
              </div>
            )}

            {/* View All Button */}
            <div className="mt-10 text-center">
              <Link to="/suche">
                <Button size="lg">
                  Alle Kitas durchsuchen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
