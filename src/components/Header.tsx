import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoKitaFinden from "@/assets/logo-kita-finden-hamburg.webp";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/#kitas") return location.pathname === "/" && location.hash === "#kitas";
    if (path === "/#ratgeber") return location.pathname === "/" && location.hash === "#ratgeber";
    if (path === "/#wissen") return location.pathname === "/" && location.hash === "#wissen";
    if (path === "/kita-hinzufuegen") return location.pathname === "/kita-hinzufuegen";
    return false;
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
            <a 
              href="/#kitas" 
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                isActive("/#kitas") ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              Kitas
            </a>
            <a 
              href="/#ratgeber" 
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                isActive("/#ratgeber") ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              Ratgeber
            </a>
            <a 
              href="/#wissen" 
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] hover:border-b-2 hover:border-[#0f172a] hover:pb-[2px] transition-all ${
                isActive("/#wissen") ? "font-semibold border-b-2 border-[#0f172a] pb-[2px]" : ""
              }`}
            >
              Wissen
            </a>
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
            <a 
              href="/#kitas" 
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                isActive("/#kitas") ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kitas
            </a>
            <a 
              href="/#ratgeber" 
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                isActive("/#ratgeber") ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Ratgeber
            </a>
            <a 
              href="/#wissen" 
              className={`text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                isActive("/#wissen") ? "font-semibold text-[#0f172a]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Wissen
            </a>
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
