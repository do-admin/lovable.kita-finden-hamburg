import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/data/ratgeber-articles";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RatgeberSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  isMobile?: boolean;
}

const RatgeberSidebar = ({ selectedCategories, onCategoryChange, isMobile = false }: RatgeberSidebarProps) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const sidebarContent = (
    <>
      {/* Filter Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">Alle Themen</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <label 
              key={category} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
                className="border-muted-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Kita hinzufügen CTA */}
      <div className="bg-muted/50 rounded-xl p-5 border border-border">
        <h3 className="font-medium text-foreground mb-2">Kita hinzufügen</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ihre Kita fehlt noch? Tragen Sie sie kostenlos ein.
        </p>
        <Button 
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md transition-all"
        >
          <Link to="/kita-hinzufuegen">Jetzt eintragen</Link>
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mb-6">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full p-4 bg-card rounded-xl border border-border">
            <h1 className="text-2xl font-extrabold text-primary">Ratgeber</h1>
            <ChevronDown 
              className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 px-1">
          {sidebarContent}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <aside className="sticky top-24">
      <h1 className="text-[28px] font-extrabold text-primary mb-6">Ratgeber</h1>
      {sidebarContent}
    </aside>
  );
};

export default RatgeberSidebar;
