import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendingSearches from "@/components/TrendingSearches";
import BrowseCategories from "@/components/BrowseCategories";
import FeaturedListings from "@/components/FeaturedListings";
import PopularDistricts from "@/components/PopularDistricts";
import SearchModule from "@/components/SearchModule";
import InfoSection from "@/components/InfoSection";
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
      <BrowseCategories />
      <FeaturedListings />
      <SearchModule />
      <HowToUse />
      <InfoSection />
      
      {/* Trust Block */}
      <TrustBlock />
      
      {/* Hamburg Stats Section */}
      <HamburgStatsSection />
      
      {/* Ratgeber Section */}
      <section className="bg-[#f1f5f9] py-[80px]">
        <div className="max-w-[1400px] mx-auto px-6">
          <RatgeberSection />
        </div>
      </section>
      
      <ContactSection />
      
      <PopularDistricts />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
