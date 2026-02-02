import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import HomepageFilters from "./HomepageFilters";
import { FilterState } from "@/types/filters";

interface MobileFilterDrawerProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hasLocation: boolean;
  onRequestLocation: () => void;
  activeFilterCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileFilterDrawer = ({
  filters,
  onFiltersChange,
  onReset,
  searchQuery,
  onSearchChange,
  hasLocation,
  onRequestLocation,
  activeFilterCount,
  open,
  onOpenChange,
}: MobileFilterDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 lg:hidden"
        >
          <Filter className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="text-left">Filter</SheetTitle>
        </SheetHeader>
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          <HomepageFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            onReset={onReset}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            hasLocation={hasLocation}
            onRequestLocation={onRequestLocation}
            className="border-0 p-0"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterDrawer;
