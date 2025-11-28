import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

  const toggleDistrict = (districtName: string) => {
    setOpenDistricts(prev =>
      prev.includes(districtName)
        ? prev.filter(d => d !== districtName)
        : [...prev, districtName]
    );
  };

  return (
    <aside className="bg-background">
      <div className="sticky top-20">
        <h2 className="text-xl font-semibold mb-2">Kitas nach Bezirk & Stadtteil</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Wähl einen Bezirk und dann den passenden Stadtteil, um Kitas in deiner Umgebung anzuzeigen.
        </p>
        
        <div className="space-y-1">
          {districts.map((district) => (
            <div key={district.name} className="border-b border-border">
              <button
                onClick={() => toggleDistrict(district.name)}
                className="w-full flex items-center justify-between py-3 text-left font-medium hover:text-primary transition-colors"
              >
                {district.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDistricts.includes(district.name) ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {openDistricts.includes(district.name) && (
                <ul className="pb-3 pl-4 space-y-2">
                  {district.neighborhoods.map((neighborhood) => (
                    <li key={neighborhood}>
                      <a
                        href={`#${neighborhood.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
      </div>
    </aside>
  );
};

export default DistrictNavigation;
