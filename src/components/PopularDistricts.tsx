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
  return (
    <section id="beliebte-stadtteile" className="bg-white">
      <div className="container-custom section-padding">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="mb-4 text-center">Beliebte Stadtteile in Hamburg</h2>
          <p className="text-foreground text-center mb-10 max-w-[600px] mx-auto">
            Wähle einen Stadtteil, um Kitas in deiner Nähe zu finden
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-2">
            {districts.map((district) => (
              <div key={district.name} className="mb-6">
                <h3 className="text-[15px] font-semibold text-foreground mb-3">
                  {district.name}
                </h3>
                <ul className="space-y-1.5">
                  {district.neighborhoods.map((neighborhood) => (
                    <li key={neighborhood}>
                      <a
                        href={`/kitas?stadtteil=${encodeURIComponent(neighborhood)}`}
                        className="text-[14px] text-muted-foreground hover:text-primary hover:underline transition-colors"
                      >
                        {neighborhood}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDistricts;
