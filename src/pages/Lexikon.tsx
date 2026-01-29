import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LexikonSidebar from "@/components/LexikonSidebar";
import LexikonHero from "@/components/LexikonHero";
import LexikonCard from "@/components/LexikonCard";
import lexikonData from "@/data/lexikon.json";
import { useIsMobile } from "@/hooks/use-mobile";

const Lexikon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  // Convert lexikon data to array and sort alphabetically
  const lexikonEntries = useMemo(() => {
    return Object.entries(lexikonData)
      .map(([term, definition]) => ({ term, definition }))
      .sort((a, b) => a.term.localeCompare(b.term, 'de'));
  }, []);

  // Filter entries based on search term
  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) return lexikonEntries;
    
    const lowerSearch = searchTerm.toLowerCase();
    return lexikonEntries.filter(
      entry =>
        entry.term.toLowerCase().includes(lowerSearch) ||
        entry.definition.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, lexikonEntries]);

  // Group entries by first letter
  const groupedEntries = useMemo(() => {
    const groups: Record<string, typeof lexikonEntries> = {};
    
    filteredEntries.forEach(entry => {
      const firstLetter = entry.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(entry);
    });
    
    return groups;
  }, [filteredEntries]);

  const sortedLetters = Object.keys(groupedEntries).sort();
  
  // Get all available letters from unfiltered data
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    lexikonEntries.forEach(entry => {
      letters.add(entry.term[0].toUpperCase());
    });
    return Array.from(letters).sort();
  }, [lexikonEntries]);

  const handleLetterClick = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 section-padding">
        <div className="container-custom">
          {/* Mobile Layout */}
          {isMobile && (
            <div className="max-w-[900px] mx-auto">
              <LexikonSidebar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                availableLetters={availableLetters}
                onLetterClick={handleLetterClick}
                isMobile={true}
              />
              
              <LexikonHero />
              
              {/* Entries */}
              <div id="entries" className="space-y-10">
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Keine Einträge gefunden für "{searchTerm}"
                    </p>
                  </div>
                ) : (
                  sortedLetters.map(letter => (
                    <div key={letter} id={`letter-${letter}`}>
                      <div className="mb-4 pb-2 border-b border-border">
                        <h2 className="text-2xl font-bold text-foreground">
                          {letter}
                        </h2>
                      </div>
                      <div className="grid gap-4">
                        {groupedEntries[letter].map((entry, index) => (
                          <LexikonCard 
                            key={entry.term}
                            term={entry.term}
                            definition={entry.definition}
                            accentColor={index % 2 === 0 ? "primary" : "success"}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Entry Count */}
              {filteredEntries.length > 0 && (
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  {filteredEntries.length} {filteredEntries.length === 1 ? 'Begriff' : 'Begriffe'}
                  {searchTerm && ` für "${searchTerm}"`}
                </div>
              )}
            </div>
          )}

          {/* Desktop Layout - Two Columns */}
          {!isMobile && (
            <div className="flex gap-10 max-w-[1200px] mx-auto">
              {/* Left Sidebar - 25-30% */}
              <div className="w-[280px] flex-shrink-0">
                <LexikonSidebar 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  availableLetters={availableLetters}
                  onLetterClick={handleLetterClick}
                />
              </div>
              
              {/* Right Content Area - 70-75% */}
              <div className="flex-1 min-w-0">
                <LexikonHero />
                
                {/* Entries - 2 columns */}
                <div id="entries" className="space-y-10">
                  {filteredEntries.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        Keine Einträge gefunden für "{searchTerm}"
                      </p>
                    </div>
                  ) : (
                    sortedLetters.map(letter => (
                      <div key={letter} id={`letter-${letter}`}>
                        <div className="mb-4 pb-2 border-b border-border">
                          <h2 className="text-2xl font-bold text-foreground">
                            {letter}
                          </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {groupedEntries[letter].map((entry, index) => (
                            <LexikonCard 
                              key={entry.term}
                              term={entry.term}
                              definition={entry.definition}
                              accentColor={index % 2 === 0 ? "primary" : "success"}
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Entry Count */}
                {filteredEntries.length > 0 && (
                  <div className="mt-10 text-center text-sm text-muted-foreground">
                    {filteredEntries.length} {filteredEntries.length === 1 ? 'Begriff' : 'Begriffe'}
                    {searchTerm && ` für "${searchTerm}"`}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lexikon;
