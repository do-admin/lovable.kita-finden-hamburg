import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight, Navigation, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { kitas, type KitaDetail } from "@/data/kitas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDistance, calculateDistance, useGeolocation } from "@/hooks/useGeolocation";
import SearchFilters from "@/components/search/SearchFilters";
import { FilterState, initialFilters } from "@/types/filters";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}

// Sort by rating (highest first), then by name
const sortKitas = (kitaList: KitaWithDistance[]): KitaWithDistance[] => {
  return [...kitaList].sort((a, b) => {
    const ratingA = a.googleBewertung || 0;
    const ratingB = b.googleBewertung || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return a.name.localeCompare(b.name);
  });
};

// Filter kitas based on selected filters
const filterKitas = (allKitas: KitaWithDistance[], filters: FilterState): KitaWithDistance[] => {
  return allKitas.filter((kita) => {
    // Bezirke
    if (filters.bezirke.length > 0) {
      if (!filters.bezirke.includes(kita.bezirk)) return false;
    }

    // Betreuungsart
    if (filters.betreuungsart.length > 0) {
      const hasMatch = filters.betreuungsart.some((f) =>
        kita.betreuungsart.some((b) => b.toLowerCase() === f.toLowerCase())
      );
      if (!hasMatch) return false;
    }

    // Öffnungszeiten
    if (filters.oeffnungszeiten.length > 0) {
      if (!filters.oeffnungszeiten.includes(kita.oeffnungszeitenKategorie)) return false;
    }

    // Pädagogik/Konzepte
    if (filters.konzepte.length > 0) {
      if (!filters.konzepte.includes(kita.konzept)) return false;
    }

    // Besonderheiten
    if (filters.besonderheiten.length > 0) {
      const hasFeature = filters.besonderheiten.some((f) => kita.besonderheiten.includes(f));
      if (!hasFeature) return false;
    }

    // Verfügbarkeit
    if (filters.plaetzeFrei === "frei") {
      if (kita.status !== "frei") return false;
    } else if (filters.plaetzeFrei === "warteliste") {
      if (kita.status !== "warteliste") return false;
    }

    return true;
  });
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
  const { latitude, longitude, requestLocation } = useGeolocation();
  const hasLocation = latitude !== null && longitude !== null;
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

    // Apply radius filter if location available
    let results = filtered;
    if (filters.radius && hasLocation) {
      results = filtered.filter(k => k.distance !== undefined && k.distance <= filters.radius!);
    }
    
    // Sort based on sortierung
    if (filters.sortierung === "entfernung" && hasLocation) {
      results = [...results].sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (filters.sortierung === "alphabetisch") {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name, "de"));
    } else {
      // Default: sort by rating
      results = sortKitas(results);
    }
    
    return results.slice(0, maxItems);
  }, [hasLocation, latitude, longitude, maxItems, filters]);

  const activeFilterCount =
    filters.bezirke.length +
    filters.stadtteile.length +
    filters.betreuungsart.length +
    filters.oeffnungszeiten.length +
    filters.besonderheiten.length +
    filters.konzepte.length +
    (filters.plaetzeFrei !== "alle" ? 1 : 0) +
    (filters.radius ? 1 : 0);

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
                Filter & Sortieren
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-left">Filter & Sortieren</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100%-80px)] pb-4">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onReset={handleReset}
                  hasLocation={hasLocation}
                  onRequestLocation={requestLocation}
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
            <aside className="w-[280px] xl:w-[300px] flex-shrink-0">
              <div className="sticky top-24">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onReset={handleReset}
                  hasLocation={hasLocation}
                  onRequestLocation={requestLocation}
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
