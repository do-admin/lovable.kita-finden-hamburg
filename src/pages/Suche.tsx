import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import MobileFilterSheet from "@/components/search/MobileFilterSheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { kitas, KitaDetail } from "@/data/kitas";
import { FilterState, initialFilters } from "@/types/filters";
import { useGeolocation, calculateDistance } from "@/hooks/useGeolocation";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}

const Suche = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { latitude, longitude, requestLocation, loading: locationLoading } = useGeolocation();

  const hasLocation = latitude !== null && longitude !== null;

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    const bezirke = searchParams.get("bezirk")?.split(",").filter(Boolean) || [];
    const stadtteile = searchParams.get("stadtteil")?.split(",").filter(Boolean) || [];
    const betreuungsart = (searchParams.get("betreuung")?.split(",").filter(Boolean) || []) as FilterState["betreuungsart"];
    const oeffnungszeiten = (searchParams.get("zeit")?.split(",").filter(Boolean) || []) as FilterState["oeffnungszeiten"];
    const besonderheiten = searchParams.get("besonderheit")?.split(",").filter(Boolean) || [];
    const konzepte = searchParams.get("konzept")?.split(",").filter(Boolean) || [];
    const plaetzeFrei = (searchParams.get("frei") as FilterState["plaetzeFrei"]) || "alle";
    const radiusParam = searchParams.get("radius");
    const radius = radiusParam ? Number(radiusParam) : null;
    const sortierung = (searchParams.get("sort") as FilterState["sortierung"]) || "relevanz";

    return {
      bezirke,
      stadtteile,
      betreuungsart,
      oeffnungszeiten,
      besonderheiten,
      konzepte,
      plaetzeFrei,
      radius,
      sortierung,
    };
  });

  const searchQuery = searchParams.get("q") || "";

  // Update URL when filters change
  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (newFilters.bezirke.length) params.set("bezirk", newFilters.bezirke.join(","));
    if (newFilters.stadtteile.length) params.set("stadtteil", newFilters.stadtteile.join(","));
    if (newFilters.betreuungsart.length) params.set("betreuung", newFilters.betreuungsart.join(","));
    if (newFilters.oeffnungszeiten.length) params.set("zeit", newFilters.oeffnungszeiten.join(","));
    if (newFilters.besonderheiten.length) params.set("besonderheit", newFilters.besonderheiten.join(","));
    if (newFilters.konzepte.length) params.set("konzept", newFilters.konzepte.join(","));
    if (newFilters.plaetzeFrei !== "alle") params.set("frei", newFilters.plaetzeFrei);
    if (newFilters.radius) params.set("radius", newFilters.radius.toString());
    if (newFilters.sortierung !== "relevanz") params.set("sort", newFilters.sortierung);

    setSearchParams(params);
  }, [searchQuery, setSearchParams]);

  const resetFilters = useCallback(() => {
    updateFilters(initialFilters);
  }, [updateFilters]);

  // Remove a single filter value
  const handleRemoveFilter = useCallback((key: keyof FilterState, value?: string) => {
    const newFilters = { ...filters };

    if (key === "bezirke" || key === "stadtteile" || key === "besonderheiten" || key === "konzepte") {
      newFilters[key] = filters[key].filter(v => v !== value);
    } else if (key === "betreuungsart") {
      newFilters.betreuungsart = filters.betreuungsart.filter(v => v !== value) as FilterState["betreuungsart"];
    } else if (key === "oeffnungszeiten") {
      newFilters.oeffnungszeiten = filters.oeffnungszeiten.filter(v => v !== value) as FilterState["oeffnungszeiten"];
    } else if (key === "plaetzeFrei") {
      newFilters.plaetzeFrei = "alle";
    } else if (key === "radius") {
      newFilters.radius = null;
    }

    updateFilters(newFilters);
  }, [filters, updateFilters]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results: KitaWithDistance[] = kitas.map(kita => ({
      ...kita,
      distance: hasLocation
        ? calculateDistance(latitude!, longitude!, kita.coordinates.lat, kita.coordinates.lng)
        : undefined,
    }));

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(k =>
        k.name.toLowerCase().includes(query) ||
        k.stadtteil.toLowerCase().includes(query) ||
        k.bezirk.toLowerCase().includes(query) ||
        k.adresse.toLowerCase().includes(query)
      );
    }

    // Filter by bezirke
    if (filters.bezirke.length > 0) {
      results = results.filter(k => filters.bezirke.includes(k.bezirk));
    }

    // Filter by stadtteile
    if (filters.stadtteile.length > 0) {
      results = results.filter(k => filters.stadtteile.includes(k.stadtteil));
    }

    // Filter by betreuungsart
    if (filters.betreuungsart.length > 0) {
      results = results.filter(k =>
        k.betreuungsart.some(b => filters.betreuungsart.includes(b))
      );
    }

    // Filter by öffnungszeiten
    if (filters.oeffnungszeiten.length > 0) {
      results = results.filter(k =>
        filters.oeffnungszeiten.includes(k.oeffnungszeitenKategorie)
      );
    }

    // Filter by besonderheiten
    if (filters.besonderheiten.length > 0) {
      results = results.filter(k =>
        k.besonderheiten.some(b => filters.besonderheiten.includes(b))
      );
    }

    // Filter by konzepte
    if (filters.konzepte.length > 0) {
      results = results.filter(k => filters.konzepte.includes(k.konzept));
    }

    // Filter by verfügbarkeit
    if (filters.plaetzeFrei === "frei") {
      results = results.filter(k => k.status === "frei");
    } else if (filters.plaetzeFrei === "warteliste") {
      results = results.filter(k => k.status === "warteliste");
    }

    // Filter by radius
    if (filters.radius && hasLocation) {
      results = results.filter(k => k.distance !== undefined && k.distance <= filters.radius!);
    }

    // Sort results
    if (filters.sortierung === "entfernung" && hasLocation) {
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (filters.sortierung === "alphabetisch") {
      results.sort((a, b) => a.name.localeCompare(b.name, "de"));
    }
    // 'relevanz' is default, no specific sorting

    return results;
  }, [filters, searchQuery, hasLocation, latitude, longitude]);

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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setMobileFilterOpen(true)}
              className="w-full justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter & Sortieren
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-[280px] xl:w-[300px] flex-shrink-0">
              <div className="sticky top-6">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={updateFilters}
                  onReset={resetFilters}
                  hasLocation={hasLocation}
                  onRequestLocation={requestLocation}
                />
              </div>
            </aside>

            {/* Results Area */}
            <div className="flex-1 min-w-0">
              <SearchResults
                results={filteredResults}
                totalCount={kitas.length}
                searchQuery={searchQuery}
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                loading={locationLoading}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        open={mobileFilterOpen}
        onOpenChange={setMobileFilterOpen}
        filters={filters}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
        hasLocation={hasLocation}
        onRequestLocation={requestLocation}
      />

      <Footer />
    </div>
  );
};

export default Suche;
