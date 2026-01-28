import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RatgeberSidebar from "@/components/RatgeberSidebar";
import RatgeberHero from "@/components/RatgeberHero";
import RatgeberCard from "@/components/RatgeberCard";
import { ratgeberArticles } from "@/data/ratgeber-articles";
import { useIsMobile } from "@/hooks/use-mobile";

const Ratgeber = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const filteredArticles = useMemo(() => {
    if (selectedCategories.length === 0) {
      return ratgeberArticles;
    }
    return ratgeberArticles.filter(article => 
      selectedCategories.includes(article.category)
    );
  }, [selectedCategories]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 section-padding">
        <div className="container-custom">
          {/* Mobile Layout */}
          {isMobile && (
            <div className="max-w-[900px] mx-auto">
              <RatgeberSidebar 
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                isMobile={true}
              />
              
              <RatgeberHero />
              
              {/* Articles Grid */}
              <div id="articles" className="grid gap-6">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Keine Artikel in den ausgewählten Kategorien gefunden.
                    </p>
                  </div>
                ) : (
                  filteredArticles.map((article, index) => (
                    <RatgeberCard 
                      key={article.slug} 
                      article={article}
                      accentColor={index % 2 === 0 ? "primary" : "success"}
                    />
                  ))
                )}
              </div>
              
              {/* Entry Count */}
              {filteredArticles.length > 0 && (
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'}
                  {selectedCategories.length > 0 && ` in ${selectedCategories.length} ${selectedCategories.length === 1 ? 'Kategorie' : 'Kategorien'}`}
                </div>
              )}
            </div>
          )}

          {/* Desktop Layout - Two Columns */}
          {!isMobile && (
            <div className="flex gap-10 max-w-[1200px] mx-auto">
              {/* Left Sidebar - 25-30% */}
              <div className="w-[280px] flex-shrink-0">
                <RatgeberSidebar 
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                />
              </div>
              
              {/* Right Content Area - 70-75% */}
              <div className="flex-1 min-w-0">
                <RatgeberHero />
                
                {/* Articles Grid - 2 columns */}
                <div id="articles" className="grid md:grid-cols-2 gap-6">
                  {filteredArticles.length === 0 ? (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        Keine Artikel in den ausgewählten Kategorien gefunden.
                      </p>
                    </div>
                  ) : (
                    filteredArticles.map((article, index) => (
                      <RatgeberCard 
                        key={article.slug} 
                        article={article}
                        accentColor={index % 2 === 0 ? "primary" : "success"}
                      />
                    ))
                  )}
                </div>
                
                {/* Entry Count */}
                {filteredArticles.length > 0 && (
                  <div className="mt-10 text-center text-sm text-muted-foreground">
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'}
                    {selectedCategories.length > 0 && ` in ${selectedCategories.length} ${selectedCategories.length === 1 ? 'Kategorie' : 'Kategorien'}`}
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

export default Ratgeber;
