import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LexikonSidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  availableLetters: string[];
  onLetterClick: (letter: string) => void;
  isMobile?: boolean;
}

const LexikonSidebar = ({ 
  searchTerm, 
  onSearchChange, 
  availableLetters,
  onLetterClick,
  isMobile = false 
}: LexikonSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const content = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Suche</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Begriff suchen..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 text-sm border-border bg-background"
          />
        </div>
      </div>

      {/* Alphabet Navigation */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Alphabetisch</h3>
        <div className="flex flex-wrap gap-1.5">
          {alphabet.map(letter => {
            const isAvailable = availableLetters.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => isAvailable && onLetterClick(letter)}
                disabled={!isAvailable}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                  isAvailable 
                    ? "bg-muted hover:bg-primary hover:text-primary-foreground text-foreground" 
                    : "bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-border">
        <div className="bg-accent/10 rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-2">Begriff fehlt?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Schlagen Sie uns einen neuen Begriff für das Lexikon vor.
          </p>
          <Button asChild className="w-full">
            <Link to="/kontakt">Vorschlag senden</Link>
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl"
        >
          <span className="font-semibold text-foreground">Filter & Navigation</span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-3 p-4 bg-card border border-border rounded-xl">
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="sticky top-24">
      <div className="bg-card border border-border rounded-2xl p-6">
        {content}
      </div>
    </div>
  );
};

export default LexikonSidebar;
