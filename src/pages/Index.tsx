import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendingSearches from "@/components/TrendingSearches";
import PopularDistricts from "@/components/PopularDistricts";
import SearchModule from "@/components/SearchModule";
import InfoSection from "@/components/InfoSection";
import KitaListing from "@/components/KitaListing";
import QualityCriteria from "@/components/QualityCriteria";
import RatgeberSection from "@/components/RatgeberSection";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import TrustBlock from "@/components/TrustBlock";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrendingSearches />
      <PopularDistricts />
      <SearchModule />
      <InfoSection />
      <TrustBlock />
      
      {/* Main content - full width */}
      <div className="container-custom section-padding">
        <div className="max-w-[1400px] mx-auto space-y-[80px]">
          <KitaListing />
          <QualityCriteria />
          <RatgeberSection />
        </div>
      </div>
      
      {/* Full-width sections */}
      <FAQ />
      <ContactSection />
      
      <div className="container-custom">
        {/* Cross-project links */}
        <section className="section-padding max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Weitere hilfreiche Angebote</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a href="https://kita-gutschein-hamburg.de" target="_blank" rel="noopener noreferrer" className="card-shadow rounded-lg p-6 bg-card hover:shadow-lg transition-shadow group">
              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">kita-gutschein-hamburg.de</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Rechner und Informationen rund um den Kita-Gutschein in Hamburg
              </p>
              <span className="text-sm text-primary inline-flex items-center gap-2">
                Mehr erfahren
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
            <a href="https://beste-kita-hamburg.de" target="_blank" rel="noopener noreferrer" className="card-shadow rounded-lg p-6 bg-card hover:shadow-lg transition-shadow group">
              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">beste-kita-hamburg.de</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Überblick über ausgewählte, besonders gut bewertete Kitas in Hamburg
              </p>
              <span className="text-sm text-primary inline-flex items-center gap-2">
                Mehr erfahren
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
