import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import MobileFilterSheet from "@/components/search/MobileFilterSheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export interface FilterState {
  bezirke: string[];
  alter: string[];
  konzepte: string[];
  betreuungszeiten: string[];
  plaetzeFrei: "alle" | "ja" | "nein" | "warteliste";
  sortierung: string;
}

const initialFilters: FilterState = {
  bezirke: [],
  alter: [],
  konzepte: [],
  betreuungszeiten: [],
  plaetzeFrei: "alle",
  sortierung: "entfernung",
};

// Mock data for demonstration - IDs match the detailed kitas in src/data/kitas.ts
const mockKitas = [
  {
    id: 1,
    name: "Montessori-Kita Altona",
    adresse: "Bahrenfelder Straße 125",
    bezirk: "Altona",
    stadtteil: "Ottensen",
    alter: "1-6 Jahre",
    plaetzeFrei: true,
    konzepte: ["Montessori", "Naturmaterialien"],
    betreuungszeit: "Ganztags",
  },
  {
    id: 2,
    name: "Städtische Kita Eimsbüttel",
    adresse: "Osterstraße 88",
    bezirk: "Eimsbüttel",
    stadtteil: "Eimsbüttel",
    alter: "0-6 Jahre",
    plaetzeFrei: false,
    warteliste: true,
    konzepte: ["Situationsansatz", "Sprachförderung"],
    betreuungszeit: "Ganztags",
  },
  {
    id: 3,
    name: "Natur-Kita Winterhude",
    adresse: "Stadthallenbrücke 1",
    bezirk: "Hamburg-Nord",
    stadtteil: "Winterhude",
    alter: "3-6 Jahre",
    plaetzeFrei: true,
    konzepte: ["Naturpädagogik", "Waldtage"],
    betreuungszeit: "Halbtags",
  },
  {
    id: 4,
    name: "Inklusions-Kita Hamburg-Nord",
    adresse: "Hamburger Straße 200",
    bezirk: "Hamburg-Nord",
    stadtteil: "Barmbek-Süd",
    alter: "0-6 Jahre",
    plaetzeFrei: true,
    konzepte: ["Inklusion", "Heilpädagogik"],
    betreuungszeit: "Ganztags",
  },
  {
    id: 5,
    name: "Elterninitiative Kinderladen St. Pauli",
    adresse: "Wohlwillstraße 12",
    bezirk: "Hamburg-Mitte",
    stadtteil: "St. Pauli",
    alter: "1-6 Jahre",
    plaetzeFrei: false,
    warteliste: true,
    konzepte: ["Elternmitarbeit", "Freispiel"],
    betreuungszeit: "Ganztags",
  },
];

const Suche = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    const bezirke = searchParams.get("bezirk")?.split(",").filter(Boolean) || [];
    const alter = searchParams.get("alter")?.split(",").filter(Boolean) || [];
    const konzepte = searchParams.get("konzept")?.split(",").filter(Boolean) || [];
    const betreuungszeiten = searchParams.get("zeit")?.split(",").filter(Boolean) || [];
    const plaetzeFrei = (searchParams.get("frei") as FilterState["plaetzeFrei"]) || "alle";
    const sortierung = searchParams.get("sort") || "entfernung";
    
    return { bezirke, alter, konzepte, betreuungszeiten, plaetzeFrei, sortierung };
  });

  const searchQuery = searchParams.get("q") || "";

  // Update URL when filters change
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (newFilters.bezirke.length) params.set("bezirk", newFilters.bezirke.join(","));
    if (newFilters.alter.length) params.set("alter", newFilters.alter.join(","));
    if (newFilters.konzepte.length) params.set("konzept", newFilters.konzepte.join(","));
    if (newFilters.betreuungszeiten.length) params.set("zeit", newFilters.betreuungszeiten.join(","));
    if (newFilters.plaetzeFrei !== "alle") params.set("frei", newFilters.plaetzeFrei);
    if (newFilters.sortierung !== "entfernung") params.set("sort", newFilters.sortierung);
    
    setSearchParams(params);
  };

  const resetFilters = () => {
    updateFilters(initialFilters);
  };

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = [...mockKitas];
    
    // Apply filters
    if (filters.bezirke.length > 0) {
      results = results.filter(k => filters.bezirke.includes(k.bezirk));
    }
    if (filters.konzepte.length > 0) {
      results = results.filter(k => k.konzepte.some(c => filters.konzepte.includes(c)));
    }
    if (filters.plaetzeFrei === "ja") {
      results = results.filter(k => k.plaetzeFrei);
    } else if (filters.plaetzeFrei === "nein") {
      results = results.filter(k => !k.plaetzeFrei && !k.warteliste);
    } else if (filters.plaetzeFrei === "warteliste") {
      results = results.filter(k => k.warteliste);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(k => 
        k.name.toLowerCase().includes(query) ||
        k.stadtteil.toLowerCase().includes(query) ||
        k.bezirk.toLowerCase().includes(query)
      );
    }
    
    // Sort
    if (filters.sortierung === "alphabetisch") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return results;
  }, [filters, searchQuery]);

  const activeFilterCount = 
    filters.bezirke.length + 
    filters.alter.length + 
    filters.konzepte.length + 
    filters.betreuungszeiten.length + 
    (filters.plaetzeFrei !== "alle" ? 1 : 0);

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
                />
              </div>
            </aside>

            {/* Results Area */}
            <div className="flex-1 min-w-0">
              <SearchResults
                results={filteredResults}
                totalCount={mockKitas.length}
                searchQuery={searchQuery}
                filters={filters}
                onRemoveFilter={(key, value) => {
                  const newFilters = { ...filters };
                  if (key === "bezirke" || key === "alter" || key === "konzepte" || key === "betreuungszeiten") {
                    newFilters[key] = filters[key].filter(v => v !== value);
                  } else if (key === "plaetzeFrei") {
                    newFilters.plaetzeFrei = "alle";
                  }
                  updateFilters(newFilters);
                }}
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
      />

      <Footer />
    </div>
  );
};

export default Suche;
