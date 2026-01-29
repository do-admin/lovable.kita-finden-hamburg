import { FilterState } from "@/pages/Suche";
import { Button } from "@/components/ui/button";
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

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const bezirke = [
  "Altona",
  "Bergedorf",
  "Eimsbüttel",
  "Hamburg-Mitte",
  "Hamburg-Nord",
  "Harburg",
  "Wandsbek",
];

const alterOptionen = [
  { value: "0-3", label: "0–3 Jahre (Krippe)" },
  { value: "3-6", label: "3–6 Jahre (Kindergarten)" },
  { value: "6+", label: "6+ Jahre (Hort)" },
];

const konzepte = [
  "Montessori",
  "Reggio",
  "Waldorf",
  "Naturpädagogik",
  "Inklusion",
  "Musikalisch",
  "Bewegung",
  "Bilingual",
  "Sprachförderung",
];

const betreuungszeiten = [
  { value: "halbtags", label: "Halbtags" },
  { value: "ganztags", label: "Ganztags" },
  { value: "7-14", label: "7–14 Uhr" },
  { value: "8-16", label: "8–16 Uhr" },
];

const plaetzeOptionen = [
  { value: "alle", label: "Alle anzeigen" },
  { value: "ja", label: "Plätze frei" },
  { value: "warteliste", label: "Warteliste" },
  { value: "nein", label: "Keine Plätze" },
];

const sortierOptionen = [
  { value: "entfernung", label: "Entfernung (am nächsten)" },
  { value: "alphabetisch", label: "Alphabetisch" },
  { value: "plaetze", label: "Meiste freie Plätze" },
  { value: "neueste", label: "Neueste Einträge" },
];

const SearchFilters = ({ filters, onFiltersChange, onReset }: SearchFiltersProps) => {
  const handleCheckboxChange = (
    key: "bezirke" | "alter" | "konzepte" | "betreuungszeiten",
    value: string,
    checked: boolean
  ) => {
    const newValues = checked
      ? [...filters[key], value]
      : filters[key].filter((v) => v !== value);
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
          onValueChange={(value) =>
            onFiltersChange({ ...filters, sortierung: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortierOptionen.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={["bezirke", "konzepte"]} className="space-y-2">
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

        {/* Alter */}
        <AccordionItem value="alter" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Alter des Kindes
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {alterOptionen.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`alter-${opt.value}`}
                    checked={filters.alter.includes(opt.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("alter", opt.value, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`alter-${opt.value}`}
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
            Pädagogische Konzepte
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {konzepte.map((konzept) => (
                <div key={konzept} className="flex items-center gap-2">
                  <Checkbox
                    id={`konzept-${konzept}`}
                    checked={filters.konzepte.includes(konzept)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("konzepte", konzept, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`konzept-${konzept}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {konzept}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Betreuungszeiten */}
        <AccordionItem value="betreuungszeiten" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Betreuungszeiten
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {betreuungszeiten.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`zeit-${opt.value}`}
                    checked={filters.betreuungszeiten.includes(opt.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("betreuungszeiten", opt.value, !!checked)
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

        {/* Plätze frei */}
        <AccordionItem value="plaetze" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            Verfügbarkeit
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {plaetzeOptionen.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`plaetze-${opt.value}`}
                    checked={filters.plaetzeFrei === opt.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFiltersChange({
                          ...filters,
                          plaetzeFrei: opt.value as FilterState["plaetzeFrei"],
                        });
                      }
                    }}
                  />
                  <Label
                    htmlFor={`plaetze-${opt.value}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        <Button className="w-full" size="lg">
          Filter anwenden
        </Button>
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
