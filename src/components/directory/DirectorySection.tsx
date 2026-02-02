import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import HomepageFilters from "./HomepageFilters";
import ListingsFeed from "./ListingsFeed";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { kitas, KitaDetail } from "@/data/kitas";
import { FilterState, initialFilters } from "@/types/filters";
import { useGeolocation, calculateDistance } from "@/hooks/useGeolocation";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}

const DirectorySection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { latitude, longitude, requestLocation, loading: locationLoading } = useGeolocation();

  const hasLocation = latitude !== null && longitude !== null;

  // Local search within results
  const [localSearch, setLocalSearch] = useState("");

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    const bezirke = searchParams.get("bezirk")?.split(",").filter(Boolean) || [];
    const stadtteile = searchParams.get("stadtteil")?.split(",").filter(Boolean) || [];
    const betreuungsart = (searchParams.get("betreuung")?.split(",").filter(Boolean) || []) as FilterState["betreuungsart"];
    const oeffnungszeiten = (searchParams.get("zeit")?.split(",").filter(Boolean) || []) as FilterState["oeffnungszeiten"];
    const besonderheiten = searchParams.get("besonderheit")?.split(",").filter(Boolean) || [];
    const konzepte = searchParams.get("konzept")?.split(",").filter(Boolean) || [];
    const plaetzeFrei = (searchParams.get("frei") as FilterState["plaetzeFrei"]) || "alle";
    const sortierung = (searchParams.get("sort") as FilterState["sortierung"]) || "relevanz";

    return {
      bezirke,
      stadtteile,
      betreuungsart,
      oeffnungszeiten,
      besonderheiten,
      konzepte,
      plaetzeFrei,
      radius: null,
      sortierung,
    };
  });

  // Update URL when filters change
  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.bezirke.length) params.set("bezirk", newFilters.bezirke.join(","));
    if (newFilters.stadtteile.length) params.set("stadtteil", newFilters.stadtteile.join(","));
    if (newFilters.betreuungsart.length) params.set("betreuung", newFilters.betreuungsart.join(","));
    if (newFilters.oeffnungszeiten.length) params.set("zeit", newFilters.oeffnungszeiten.join(","));
    if (newFilters.besonderheiten.length) params.set("besonderheit", newFilters.besonderheiten.join(","));
    if (newFilters.konzepte.length) params.set("konzept", newFilters.konzepte.join(","));
    if (newFilters.plaetzeFrei !== "alle") params.set("frei", newFilters.plaetzeFrei);
    if (newFilters.sortierung !== "relevanz") params.set("sort", newFilters.sortierung);

    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setLocalSearch("");
    updateFilters(initialFilters);
  }, [updateFilters]);

  const handleSortChange = useCallback((sort: FilterState["sortierung"]) => {
    updateFilters({ ...filters, sortierung: sort });
  }, [filters, updateFilters]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results: KitaWithDistance[] = kitas.map(kita => ({
      ...kita,
      distance: hasLocation
        ? calculateDistance(latitude!, longitude!, kita.coordinates.lat, kita.coordinates.lng)
        : undefined,
    }));

    // Filter by local search
    if (localSearch) {
      const query = localSearch.toLowerCase();
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

    // Sort results
    if (filters.sortierung === "entfernung" && hasLocation) {
      results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (filters.sortierung === "alphabetisch") {
      results.sort((a, b) => a.name.localeCompare(b.name, "de"));
    } else {
      // Default: sort by rating (recommended first)
      results.sort((a, b) => (b.googleBewertung || 0) - (a.googleBewertung || 0));
    }

    return results;
  }, [filters, localSearch, hasLocation, latitude, longitude]);

  const activeFilterCount =
    filters.bezirke.length +
    filters.stadtteile.length +
    filters.betreuungsart.length +
    filters.oeffnungszeiten.length +
    filters.besonderheiten.length +
    filters.konzepte.length +
    (filters.plaetzeFrei !== "alle" ? 1 : 0);

  return (
    <section className="py-8 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Mobile filter button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <MobileFilterDrawer
            filters={filters}
            onFiltersChange={updateFilters}
            onReset={resetFilters}
            searchQuery={localSearch}
            onSearchChange={setLocalSearch}
            hasLocation={hasLocation}
            onRequestLocation={requestLocation}
            activeFilterCount={activeFilterCount}
            open={mobileFilterOpen}
            onOpenChange={setMobileFilterOpen}
          />
        </div>

        {/* Two-column layout */}
        <div className="flex gap-6">
          {/* Left: Sticky filter sidebar (desktop only) */}
          <aside className="hidden lg:block w-[280px] xl:w-[300px] flex-shrink-0">
            <div className="sticky top-6">
              <HomepageFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onReset={resetFilters}
                searchQuery={localSearch}
                onSearchChange={setLocalSearch}
                hasLocation={hasLocation}
                onRequestLocation={requestLocation}
              />
            </div>
          </aside>

          {/* Right: Listings feed */}
          <div className="flex-1 min-w-0">
            <ListingsFeed
              results={filteredResults}
              totalCount={kitas.length}
              sortierung={filters.sortierung}
              onSortChange={handleSortChange}
              hasLocation={hasLocation}
              loading={locationLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorySection;
