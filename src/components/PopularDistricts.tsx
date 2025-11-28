import { Badge } from "@/components/ui/badge";

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

const PopularDistricts = () => {
  // Extract all neighborhoods from all districts
  const allNeighborhoods = districts.flatMap(district => district.neighborhoods);

  return (
    <section className="bg-muted/30">
      <div className="container-custom section-padding">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="mb-6 text-center">Beliebte Stadtteile in Hamburg</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-[600px] mx-auto">
            Wähle einen Stadtteil, um Kitas in deiner Nähe zu finden
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {allNeighborhoods.map((neighborhood) => (
              <a
                key={neighborhood}
                href={`/kitas?stadtteil=${encodeURIComponent(neighborhood)}`}
                className="inline-block"
              >
                <Badge 
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors px-4 py-2 text-sm"
                >
                  {neighborhood}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDistricts;
