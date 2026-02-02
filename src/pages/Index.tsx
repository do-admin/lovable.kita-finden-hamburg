import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendingSearches from "@/components/TrendingSearches";
import MarketplaceSection from "@/components/MarketplaceSection";
import PopularDistricts from "@/components/PopularDistricts";
import SearchModule from "@/components/SearchModule";

import HowToUse from "@/components/HowToUse";
import HamburgStatsSection from "@/components/HamburgStatsSection";
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
      <MarketplaceSection />
      <SearchModule />
      <HowToUse />
      
      
      {/* Trust Block */}
      <TrustBlock />
      
      {/* Hamburg Stats Section */}
      <HamburgStatsSection />
      
      
      <ContactSection />
      
      <PopularDistricts />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
