import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoKitaFinden from "@/assets/logo-kita-finden-hamburg-horizontal.webp";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === "/#kitas") return location.pathname === "/" && location.hash === "#kitas";
    if (path === "/#ratgeber") return location.pathname === "/" && location.hash === "#ratgeber";
    if (path === "/#wissen") return location.pathname === "/" && location.hash === "#wissen";
    if (path === "/kita-hinzufuegen") return location.pathname === "/kita-hinzufuegen";
    return false;
  };

  const handleKitasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname === "/") {
      // Already on homepage, just scroll
      const element = document.getElementById("kitas");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage first, then scroll after delay
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("kitas");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };
  
  return (
    <header className="w-full bg-background sticky top-0 z-50 border-b border-[#e5e7eb]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-1.5">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="cursor-pointer flex-shrink-0"
          >
            <img 
              src={logoKitaFinden} 
              alt="Kita finden Hamburg" 
              className="h-14 sm:h-16 md:h-[72px] w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/suche"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                location.pathname === "/suche" || location.pathname === "/kitas" ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              Kitas
            </Link>
            <Link 
              to="/faq"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                location.pathname === "/faq" ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/lexikon"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                location.pathname === "/lexikon" ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              Lexikon
            </Link>
            <Link 
              to="/ratgeber"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                location.pathname === "/ratgeber" || location.pathname.startsWith("/ratgeber/") ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              Ratgeber
            </Link>
            <Link 
              to="/kita-hinzufuegen"
              className={`px-4 py-2 rounded-full border border-[#0f172a] text-base font-medium text-[#020617] hover:bg-[#0f172a] hover:text-white transition-all ${
                isActive("/kita-hinzufuegen") ? "bg-[#0f172a] text-white" : ""
              }`}
            >
              Kita hinzufügen
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-[#e5e7eb] pt-4">
            <Link 
              to="/suche"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                location.pathname === "/suche" || location.pathname === "/kitas" ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kitas
            </Link>
            <Link 
              to="/faq"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                location.pathname === "/faq" ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              to="/lexikon"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                location.pathname === "/lexikon" ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Lexikon
            </Link>
            <Link 
              to="/ratgeber"
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                location.pathname === "/ratgeber" || location.pathname.startsWith("/ratgeber/") ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Ratgeber
            </Link>
            <Link 
              to="/kita-hinzufuegen"
              className={`px-4 py-2 rounded-full border border-[#0f172a] text-base font-medium text-[#020617] hover:bg-[#0f172a] hover:text-white transition-all text-center ${
                isActive("/kita-hinzufuegen") ? "bg-[#0f172a] text-white" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kita hinzufügen
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
