import { FilterState } from "@/pages/Suche";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SearchFilters from "./SearchFilters";

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const MobileFilterSheet = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onReset,
}: MobileFilterSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left text-xl font-bold text-primary">
            Filter & Sortieren
          </SheetTitle>
        </SheetHeader>
        
        <SearchFilters
          filters={filters}
          onFiltersChange={(newFilters) => {
            onFiltersChange(newFilters);
          }}
          onReset={() => {
            onReset();
            onOpenChange(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
