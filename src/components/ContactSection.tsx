import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/kontakt");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-12 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-primary-foreground text-[18px] md:text-[22px] mb-2">Fragen zur Kita-Suche?</h2>
            <p className="text-primary-foreground/70 text-[13px] md:text-[15px]">
              Schreib uns – wir helfen dir gerne weiter.
            </p>
          </div>
          <button 
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-medium text-[14px] hover:bg-white/90 transition-colors"
          >
            Kontakt aufnehmen
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
