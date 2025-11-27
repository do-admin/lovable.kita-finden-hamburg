import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import lexikonData from "@/data/lexikon.json";

const Lexikon = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="container-custom pt-[80px] pb-[60px]">
          <div className="max-w-[680px] mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Kita-Lexikon
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Alle wichtigen Begriffe rund um Kita-Suche, Anmeldung und Betreuung in Hamburg – 
              verständlich erklärt.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-[540px] mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Begriff suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-border bg-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lexikon Content */}
      <section className="flex-1 section-padding">
        <div className="container-custom">
          <div className="max-w-[900px] mx-auto">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Keine Einträge gefunden für "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {sortedLetters.map(letter => (
                  <div key={letter} id={letter}>
                    <div className="mb-6 pb-2 border-b border-border">
                      <h2 className="text-3xl font-bold text-foreground">
                        {letter}
                      </h2>
                    </div>
                    
                    <div className="space-y-4">
                      {groupedEntries[letter].map((entry, index) => (
                        <Card 
                          key={index} 
                          className="border-border hover:shadow-md transition-shadow duration-200"
                        >
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-3 text-foreground">
                              {entry.term}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {entry.definition}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Entry Count */}
            {filteredEntries.length > 0 && (
              <div className="mt-12 text-center text-sm text-muted-foreground">
                {filteredEntries.length} {filteredEntries.length === 1 ? 'Begriff' : 'Begriffe'} 
                {searchTerm && ` für "${searchTerm}"`}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lexikon;
