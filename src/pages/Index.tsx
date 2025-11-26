import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchModule from "@/components/SearchModule";
import InfoSection from "@/components/InfoSection";
import DistrictNavigation from "@/components/DistrictNavigation";
import KitaListing from "@/components/KitaListing";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";
import QualityCriteria from "@/components/QualityCriteria";
import RatgeberSection from "@/components/RatgeberSection";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import AddKitaForm from "@/components/AddKitaForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SearchModule />
      <InfoSection />
      
      {/* Three-column layout */}
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[20%_55%_25%] gap-8 section-padding">
          {/* Left sidebar - Districts */}
          <div className="hidden lg:block">
            <DistrictNavigation />
          </div>
          
          {/* Center content */}
          <div className="space-y-16">
            <KitaListing />
            <QualityCriteria />
            <RatgeberSection />
          </div>
          
          {/* Right sidebar - Knowledge */}
          <div className="hidden lg:block">
            <KnowledgeSidebar />
          </div>
        </div>
      </div>
      
      {/* Full-width sections */}
      <FAQ />
      <div className="container-custom">
        <ContactSection />
        <AddKitaForm />
        
        {/* Cross-project links */}
        <section className="section-padding max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Weitere hilfreiche Angebote</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="https://kita-gutschein-hamburg.de" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline inline-flex items-center gap-2">
                kita-gutschein-hamburg.de – Rechner und Informationen rund um den Kita-Gutschein in Hamburg
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://beste-kita-hamburg.de" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline inline-flex items-center gap-2">
                beste-kita-hamburg.de – Überblick über ausgewählte, besonders gut bewertete Kitas in Hamburg
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
