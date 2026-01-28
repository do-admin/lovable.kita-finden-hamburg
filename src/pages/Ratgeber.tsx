import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const articles = [
  {
    category: "Kita-Suche",
    title: "Kita-Suche in Hamburg: So finden Sie die passende Einrichtung",
    description: "Welche Schritte bei der Suche wichtig sind, wie Sie Prioritäten setzen und worauf Sie bei Besichtigungsterminen achten sollten.",
    readTime: "8 Min. Lesezeit"
  },
  {
    category: "Kita-Gutschein",
    title: "Kita-Gutschein Hamburg: Voraussetzungen, Antrag & Fristen",
    description: "Ein verständlicher Überblick über Anspruch, Berechnung und den Online-Antrag für den Kita-Gutschein.",
    readTime: "10 Min. Lesezeit"
  },
  {
    category: "Eingewöhnung",
    title: "Eingewöhnung: Wie Ihr Kind gut in der Kita ankommt",
    description: "Tipps zur Vorbereitung, typische Phasen der Eingewöhnung und sinnvolle Absprachen mit der Kita.",
    readTime: "7 Min. Lesezeit"
  },
  {
    category: "Kita-Träger",
    title: "Kita-Träger in Hamburg: Wer steckt hinter den Einrichtungen?",
    description: "Überblick über öffentliche, freie und kirchliche Träger in der Hansestadt und ihre Besonderheiten.",
    readTime: "6 Min. Lesezeit"
  },
  {
    category: "Betreuungszeiten",
    title: "Betreuungszeiten & Modelle: Von Halbtags bis Ganztag",
    description: "Welche Betreuungsmodelle es in Hamburg gibt und wie sie sich unterscheiden.",
    readTime: "5 Min. Lesezeit"
  },
  {
    category: "Pädagogik",
    title: "Pädagogische Konzepte: Montessori, Reggio & mehr",
    description: "Ein Überblick über verschiedene pädagogische Ansätze und was sie für den Kita-Alltag bedeuten.",
    readTime: "9 Min. Lesezeit"
  },
  {
    category: "Inklusion",
    title: "Inklusion & besondere Bedarfe in der Kita",
    description: "Wie Hamburger Kitas Kinder mit zusätzlichem Unterstützungsbedarf begleiten.",
    readTime: "7 Min. Lesezeit"
  },
  {
    category: "Kosten",
    title: "Kosten & Elternbeiträge: Was Familien einplanen sollten",
    description: "Ein Überblick über die Kostenstruktur und was Eltern in Hamburg finanziell erwartet.",
    readTime: "6 Min. Lesezeit"
  },
  {
    category: "Recht",
    title: "Rechte & Pflichten von Eltern in der Kita",
    description: "Wichtige rechtliche Grundlagen für Eltern verständlich erklärt.",
    readTime: "8 Min. Lesezeit"
  }
];

const categories = [...new Set(articles.map(a => a.category))];

const Ratgeber = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = !searchTerm.trim() || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="container-custom pt-[80px] pb-[60px]">
          <div className="max-w-[680px] mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ratgeber
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Praxisnahe Artikel zu Themen wie Kita-Suche, Kita-Gutschein, 
              Eingewöhnung und Zusammenarbeit mit Trägern.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-[540px] mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Artikel suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-border bg-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-muted/30">
        <div className="container-custom py-4">
          <div className="max-w-[900px] mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background border border-border text-foreground hover:bg-muted'
                }`}
              >
                Alle Themen
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Content */}
      <section className="flex-1 section-padding">
        <div className="container-custom">
          <div className="max-w-[900px] mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Keine Artikel gefunden für "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredArticles.map((article, index) => (
                  <Card 
                    key={index} 
                    className="border-border hover:shadow-md transition-shadow duration-200 group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {article.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {article.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Entry Count */}
            {filteredArticles.length > 0 && (
              <div className="mt-12 text-center text-sm text-muted-foreground">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'} 
                {searchTerm && ` für "${searchTerm}"`}
                {selectedCategory && ` in "${selectedCategory}"`}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ratgeber;
