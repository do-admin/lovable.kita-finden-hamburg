import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import logoKitaFinden from "@/assets/logo-kita-finden-hamburg-horizontal.webp";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { hamburgerBezirke, kategorien } from "@/data/kitas";

// Helper to create URL-friendly slugs
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === "/kita-hinzufuegen") return location.pathname === "/kita-hinzufuegen";
    return false;
  };

  const isKitasActive = location.pathname === "/suche" || 
    location.pathname === "/kitas" || 
    location.pathname.startsWith("/kita/hamburg");
  
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
          <nav className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {/* Kitas Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`text-base font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${
                      isKitasActive ? "font-semibold" : ""
                    }`}
                  >
                    Kitas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Bezirke */}
                        <div>
                          <h3 className="font-semibold text-sm text-primary mb-3">Nach Bezirk</h3>
                          <ul className="space-y-1">
                            {Object.keys(hamburgerBezirke).map((bezirk) => (
                              <li key={bezirk}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={`/kita/hamburg/${slugify(bezirk)}`}
                                    className="block py-1.5 px-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                                  >
                                    {bezirk}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Kategorien */}
                        <div>
                          <h3 className="font-semibold text-sm text-primary mb-3">Nach Kategorie</h3>
                          <ul className="space-y-1">
                            {kategorien.slice(0, 8).map((kat) => (
                              <li key={kat.slug}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={`/kita/hamburg/kategorie/${kat.slug}`}
                                    className="block py-1.5 px-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                                  >
                                    {kat.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Top 10 Link */}
                        <div className="col-span-2 pt-3 mt-3 border-t border-border">
                          <NavigationMenuLink asChild>
                            <Link
                              to="/kita/hamburg/top-10"
                              className="flex items-center gap-2 py-2 px-2 text-sm font-medium text-primary hover:bg-secondary rounded-md transition-colors"
                            >
                              🏆 Top 10 Kitas in Hamburg
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
            <button className="px-6 py-2 rounded-full bg-[#E07856] text-white font-medium text-base hover:bg-[#D46845] transition-colors flex items-center gap-2">
              <LogIn size={20} />
              Sign in
            </button>
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
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2 border-t border-[#e5e7eb] pt-4">
            {/* Kitas with submenu */}
            <div>
              <button
                onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === "kitas" ? null : "kitas")}
                className={`w-full flex items-center justify-between text-base font-medium text-[#020617] hover:text-[#0f172a] py-2 ${
                  isKitasActive ? "font-semibold text-[#0f172a]" : ""
                }`}
              >
                Kitas
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === "kitas" ? "rotate-180" : ""}`} />
              </button>
              
              {mobileSubmenuOpen === "kitas" && (
                <div className="pl-4 mt-2 space-y-4 border-l-2 border-secondary">
                  {/* Bezirke */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bezirke</p>
                    <div className="grid grid-cols-2 gap-1">
                      {Object.keys(hamburgerBezirke).map((bezirk) => (
                        <Link
                          key={bezirk}
                          to={`/kita/hamburg/${slugify(bezirk)}`}
                          className="py-1.5 text-sm text-foreground hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {bezirk}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Kategorien */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Kategorien</p>
                    <div className="grid grid-cols-2 gap-1">
                      {kategorien.slice(0, 6).map((kat) => (
                        <Link
                          key={kat.slug}
                          to={`/kita/hamburg/kategorie/${kat.slug}`}
                          className="py-1.5 text-sm text-foreground hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {kat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Top 10 Link Mobile */}
                  <div className="pt-2 mt-2 border-t border-secondary">
                    <Link
                      to="/kita/hamburg/top-10"
                      className="flex items-center gap-2 py-1.5 text-sm font-medium text-primary hover:text-primary/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🏆 Top 10 Kitas in Hamburg
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
              className={`px-4 py-2 rounded-full border border-[#0f172a] text-base font-medium text-[#020617] hover:bg-[#0f172a] hover:text-white transition-all text-center mt-2 ${
                isActive("/kita-hinzufuegen") ? "bg-[#0f172a] text-white" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kita hinzufügen
            </Link>
            <button className="px-6 py-2 rounded-full bg-[#E07856] text-white font-medium text-base hover:bg-[#D46845] transition-colors flex items-center justify-center gap-2 mt-2">
              <LogIn size={20} />
              Sign in
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
