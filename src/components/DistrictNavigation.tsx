import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const districts = [
  {
    name: "Hamburg-Mitte",
    neighborhoods: ["Altstadt", "Neustadt", "St. Georg", "Hammerbrook", "HafenCity", "Rothenburgsort", "Borgfelde", "Hamm", "Horn", "Billstedt", "Billbrook", "Veddel", "Wilhelmsburg", "Kleiner Grasbrook", "Steinwerder", "Waltershof", "Finkenwerder", "Neuwerk"]
  },
  {
    name: "Altona",
    neighborhoods: ["Altona-Altstadt", "Altona-Nord", "Ottensen", "Bahrenfeld", "Othmarschen", "Groß Flottbek", "Iserbrook", "Nienstedten", "Blankenese", "Rissen", "Sternschanze"]
  },
  {
    name: "Eimsbüttel",
    neighborhoods: ["Eimsbüttel", "Harvestehude", "Hoheluft-West", "Rotherbaum", "Lokstedt", "Niendorf", "Schnelsen", "Stellingen", "Eidelstedt"]
  },
  {
    name: "Hamburg-Nord",
    neighborhoods: ["Winterhude", "Uhlenhorst", "Hohenfelde", "Barmbek-Süd", "Barmbek-Nord", "Dulsberg", "Eilbek", "Alsterdorf", "Fuhlsbüttel", "Groß Borstel", "Ohlsdorf", "Langenhorn"]
  },
  {
    name: "Wandsbek",
    neighborhoods: ["Wandsbek", "Marienthal", "Jenfeld", "Tonndorf", "Farmsen-Berne", "Bramfeld", "Steilshoop", "Rahlstedt", "Wellingsbüttel", "Sasel", "Poppenbüttel", "Hummelsbüttel", "Duvenstedt", "Lemsahl-Mellingstedt", "Bergstedt", "Volksdorf", "Meiendorf"]
  },
  {
    name: "Bergedorf",
    neighborhoods: ["Bergedorf", "Lohbrügge", "Allermöhe", "Curslack", "Neuengamme", "Altengamme", "Kirchwerder", "Ochsenwerder", "Reitbrook", "Spadenland", "Tatenberg"]
  },
  {
    name: "Harburg",
    neighborhoods: ["Harburg", "Eißendorf", "Heimfeld", "Marmstorf", "Rönneburg", "Langenbek", "Sinstorf", "Wilstorf", "Neuland", "Gut Moor", "Altenwerder", "Hausbruch", "Moorburg", "Neugraben-Fischbek"]
  }
];

const DistrictNavigation = () => {
  const [openDistricts, setOpenDistricts] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDistrict = (districtName: string) => {
    setOpenDistricts(prev =>
      prev.includes(districtName)
        ? prev.filter(d => d !== districtName)
        : [...prev, districtName]
    );
  };

  const SidebarContent = () => (
    <>
      <h2 className="mb-4">Kitas nach Bezirk & Stadtteil</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Wähl einen Bezirk und dann den passenden Stadtteil, um Kitas in deiner Umgebung anzuzeigen.
      </p>
      
      <div className="space-y-4">
        {districts.map((district) => (
          <div key={district.name} className="border-b border-border pb-4">
            <button
              onClick={() => toggleDistrict(district.name)}
              className="w-full flex items-center justify-between text-left font-medium hover:text-primary transition-colors"
            >
              {district.name}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openDistricts.includes(district.name) ? "rotate-180" : ""
                }`}
              />
            </button>
            
            {openDistricts.includes(district.name) && (
              <ul className="mt-4 pl-4 space-y-4">
                {district.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood}>
                    <a
                      href={`/kitas?stadtteil=${encodeURIComponent(neighborhood)}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {neighborhood}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-background">
        <div>
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Offcanvas Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg">
              <Menu className="h-5 w-5 mr-2" />
              Stadtteile
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Stadtteile</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DistrictNavigation;
