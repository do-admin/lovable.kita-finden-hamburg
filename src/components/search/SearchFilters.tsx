import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin } from "lucide-react";
import { hamburgerBezirke } from "@/data/kitas";
import {
  FilterState,
  betreuungsartOptionen,
  oeffnungszeitenOptionen,
  besonderheitenOptionen,
  konzeptOptionen,
  radiusOptionen,
  sortierungOptionen,
} from "@/types/filters";

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  hasLocation: boolean;
  onRequestLocation: () => void;
}

const bezirke = Object.keys(hamburgerBezirke);

const SearchFilters = ({
  filters,
  onFiltersChange,
  onReset,
  hasLocation,
  onRequestLocation,
}: SearchFiltersProps) => {
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

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h2 className="text-xl font-bold text-primary mb-5">Filter & Sortieren</h2>

      {/* Sortierung */}
      <div className="mb-5">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Sortierung
        </Label>
        <Select
          value={filters.sortierung}
          onValueChange={(value: FilterState["sortierung"]) =>
            onFiltersChange({ ...filters, sortierung: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortierungOptionen.map((opt) => (
              <SelectItem 
                key={opt.value} 
                value={opt.value}
                disabled={opt.value === "entfernung" && !hasLocation}
              >
                {opt.label}
                {opt.value === "entfernung" && !hasLocation && " (Standort nötig)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Radius Filter - only if location available */}
      {hasLocation && (
        <div className="mb-5 p-3 bg-secondary/50 rounded-lg">
          <Label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Umkreis
          </Label>
          <Select
            value={filters.radius?.toString() || "none"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, radius: value === "none" ? null : Number(value) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {radiusOptionen.map((opt) => (
                <SelectItem key={opt.value?.toString() || "none"} value={opt.value?.toString() || "none"}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Location request button if no location */}
      {!hasLocation && (
        <button
          onClick={onRequestLocation}
          className="w-full mb-5 p-3 bg-secondary/50 rounded-lg flex items-center justify-center gap-2 text-sm text-foreground hover:bg-secondary transition-colors"
        >
          <MapPin className="h-4 w-4" />
          Standort aktivieren für Entfernungsanzeige
        </button>
      )}

      <Accordion type="multiple" defaultValue={["betreuungsart", "oeffnungszeiten"]} className="space-y-2">
        {/* Betreuungsart */}
        <AccordionItem value="betreuungsart" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Betreuungsart
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {betreuungsartOptionen.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`betreuung-${opt.value}`}
                    checked={filters.betreuungsart.includes(opt.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("betreuungsart", opt.value, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`betreuung-${opt.value}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Öffnungszeiten */}
        <AccordionItem value="oeffnungszeiten" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Öffnungszeiten
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {oeffnungszeitenOptionen.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`zeit-${opt.value}`}
                    checked={filters.oeffnungszeiten.includes(opt.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("oeffnungszeiten", opt.value, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`zeit-${opt.value}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Pädagogische Konzepte */}
        <AccordionItem value="konzepte" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Pädagogik
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {konzeptOptionen.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`konzept-${opt.value}`}
                    checked={filters.konzepte.includes(opt.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("konzepte", opt.value, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`konzept-${opt.value}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Besonderheiten */}
        <AccordionItem value="besonderheiten" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Besonderheiten
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {besonderheitenOptionen.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`besonderheit-${opt.value}`}
                    checked={filters.besonderheiten.includes(opt.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("besonderheiten", opt.value, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`besonderheit-${opt.value}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Bezirke */}
        <AccordionItem value="bezirke" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Bezirke
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {bezirke.map((bezirk) => (
                <div key={bezirk} className="flex items-center gap-2">
                  <Checkbox
                    id={`bezirk-${bezirk}`}
                    checked={filters.bezirke.includes(bezirk)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("bezirke", bezirk, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`bezirk-${bezirk}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {bezirk}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Verfügbarkeit */}
        <AccordionItem value="verfuegbarkeit" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Verfügbarkeit
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <RadioGroup
              value={filters.plaetzeFrei}
              onValueChange={(value: FilterState["plaetzeFrei"]) =>
                onFiltersChange({ ...filters, plaetzeFrei: value })
              }
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="alle" id="plaetze-alle" />
                <Label htmlFor="plaetze-alle" className="text-sm cursor-pointer">
                  Alle anzeigen
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="frei" id="plaetze-frei" />
                <Label htmlFor="plaetze-frei" className="text-sm cursor-pointer">
                  Nur mit freien Plätzen
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="warteliste" id="plaetze-warteliste" />
                <Label htmlFor="plaetze-warteliste" className="text-sm cursor-pointer">
                  Warteliste möglich
                </Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      <div className="mt-6">
        <button
          onClick={onReset}
          className="w-full text-center text-sm text-accent hover:underline"
        >
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
