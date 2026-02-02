import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCompact from "@/components/directory/HeroCompact";
import TrendingSearchesCompact from "@/components/directory/TrendingSearchesCompact";
import DirectorySection from "@/components/directory/DirectorySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Compact Hero + Trending Searches */}
      <HeroCompact />
      <TrendingSearchesCompact />
      
      {/* Main Directory Section (Filter Sidebar + Listings Feed) */}
      <DirectorySection />
      
      <Footer />
    </div>
  );
};

export default Index;
