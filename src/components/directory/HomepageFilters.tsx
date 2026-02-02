import { useState } from "react";
import { Search, RotateCcw, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { hamburgerBezirke } from "@/data/kitas";
import {
  FilterState,
  betreuungsartOptionen,
  oeffnungszeitenOptionen,
  besonderheitenOptionen,
  konzeptOptionen,
} from "@/types/filters";

interface HomepageFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hasLocation: boolean;
  onRequestLocation: () => void;
  className?: string;
}

const stadtteile = Object.values(hamburgerBezirke).flat().sort();

const HomepageFilters = ({
  filters,
  onFiltersChange,
  onReset,
  searchQuery,
  onSearchChange,
  hasLocation,
  onRequestLocation,
  className,
}: HomepageFiltersProps) => {
  const [showMoreStadtteile, setShowMoreStadtteile] = useState(false);

  const handleCheckboxChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K] extends (infer T)[] ? T : never,
    checked: boolean
  ) => {
    const currentValues = filters[key] as any[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFiltersChange({ ...filters, [key]: newValues });
  };

  const toggleQuickFilter = (key: keyof FilterState, value: any) => {
    if (key === "plaetzeFrei") {
      onFiltersChange({
        ...filters,
        plaetzeFrei: filters.plaetzeFrei === value ? "alle" : value,
      });
    } else if (key === "betreuungsart") {
      const current = filters.betreuungsart;
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onFiltersChange({ ...filters, betreuungsart: newValues as FilterState["betreuungsart"] });
    }
  };

  const displayedStadtteile = showMoreStadtteile
    ? stadtteile
    : stadtteile.slice(0, 8);

  const activeCount =
    filters.bezirke.length +
    filters.stadtteile.length +
    filters.betreuungsart.length +
    filters.oeffnungszeiten.length +
    filters.besonderheiten.length +
    filters.konzepte.length +
    (filters.plaetzeFrei !== "alle" ? 1 : 0);

  return (
    <div className={cn("bg-card rounded-xl border border-border p-4", className)}>
      {/* Search within results */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="In Ergebnissen suchen…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Quick status toggles */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => toggleQuickFilter("plaetzeFrei", "frei")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            filters.plaetzeFrei === "frei"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-foreground hover:bg-muted"
          )}
        >
          Plätze frei
        </button>
        <button
          onClick={() => toggleQuickFilter("betreuungsart", "krippe")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            filters.betreuungsart.includes("krippe")
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-foreground hover:bg-muted"
          )}
        >
          Nur U3
        </button>
      </div>

      {/* Location button */}
      {!hasLocation && (
        <button
          onClick={onRequestLocation}
          className="w-full mb-4 p-2.5 bg-muted/50 rounded-lg flex items-center justify-center gap-2 text-xs text-foreground hover:bg-muted transition-colors"
        >
          <MapPin className="h-3.5 w-3.5" />
          Standort aktivieren
        </button>
      )}

      {/* Filter groups */}
      <div className="space-y-1">
        {/* Stadtteile */}
        <FilterGroup title="Stadtteile" defaultOpen>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {displayedStadtteile.map((stadtteil) => (
              <div key={stadtteil} className="flex items-center gap-2">
                <Checkbox
                  id={`stadtteil-${stadtteil}`}
                  checked={filters.stadtteile.includes(stadtteil)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("stadtteile", stadtteil, !!checked)
                  }
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`stadtteil-${stadtteil}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {stadtteil}
                </Label>
              </div>
            ))}
          </div>
          {stadtteile.length > 8 && (
            <button
              onClick={() => setShowMoreStadtteile(!showMoreStadtteile)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {showMoreStadtteile
                ? "Weniger anzeigen"
                : `+${stadtteile.length - 8} weitere`}
            </button>
          )}
        </FilterGroup>

        {/* Betreuungsform */}
        <FilterGroup title="Betreuungsform">
          <div className="space-y-2">
            {betreuungsartOptionen.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <Checkbox
                  id={`betreuung-${opt.value}`}
                  checked={filters.betreuungsart.includes(opt.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("betreuungsart", opt.value, !!checked)
                  }
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`betreuung-${opt.value}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </FilterGroup>

        {/* Öffnungszeiten */}
        <FilterGroup title="Öffnungszeiten">
          <div className="space-y-2">
            {oeffnungszeitenOptionen.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <Checkbox
                  id={`zeit-${opt.value}`}
                  checked={filters.oeffnungszeiten.includes(opt.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("oeffnungszeiten", opt.value, !!checked)
                  }
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`zeit-${opt.value}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </FilterGroup>

        {/* Pädagogik */}
        <FilterGroup title="Pädagogik">
          <div className="space-y-2">
            {konzeptOptionen.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <Checkbox
                  id={`konzept-${opt.value}`}
                  checked={filters.konzepte.includes(opt.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("konzepte", opt.value, !!checked)
                  }
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`konzept-${opt.value}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </FilterGroup>

        {/* Besonderheiten */}
        <FilterGroup title="Besonderheiten">
          <div className="space-y-2">
            {besonderheitenOptionen.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <Checkbox
                  id={`besonderheit-${opt.value}`}
                  checked={filters.besonderheiten.includes(opt.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("besonderheiten", opt.value, !!checked)
                  }
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`besonderheit-${opt.value}`}
                  className="text-xs text-foreground cursor-pointer"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </FilterGroup>
      </div>

      {/* Reset button */}
      {activeCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="w-full text-xs gap-2"
          >
            <RotateCcw className="h-3 w-3" />
            Filter zurücksetzen ({activeCount})
          </Button>
        </div>
      )}
    </div>
  );
};

// Collapsible filter group component
const FilterGroup = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-3">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default HomepageFilters;
