import { FilterState } from "@/types/filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SearchFilters from "./SearchFilters";

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  hasLocation: boolean;
  onRequestLocation: () => void;
}

const MobileFilterSheet = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onReset,
  hasLocation,
  onRequestLocation,
}: MobileFilterSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left text-xl font-bold text-primary">
            Filter & Sortieren
          </SheetTitle>
        </SheetHeader>

        <SearchFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          onReset={onReset}
          hasLocation={hasLocation}
          onRequestLocation={onRequestLocation}
        />

        <div className="mt-6 sticky bottom-0 bg-white py-4 border-t">
          <Button
            className="w-full"
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Ergebnisse anzeigen
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
