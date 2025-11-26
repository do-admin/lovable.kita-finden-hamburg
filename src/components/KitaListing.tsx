import KitaCard from "./KitaCard";

const kitas = [
  {
    name: "Stadtküken Kita Mühlenhof",
    location: "Wandsbek",
    description: "Ruhige, naturnahe Kita mit klarem Tagesablauf und liebevoller Begleitung.",
    district: "Wandsbek",
    neighborhood: "Wandsbek",
    capacity: "ca. 60 Kinder",
    tags: ["Naturpädagogik", "Bewegung", "Sprache"]
  },
  {
    name: "Kita Rasselbande",
    location: "Harburg",
    description: "Familiäre Einrichtung mit besonders kleinen Gruppen und persönlicher Betreuung.",
    district: "Harburg",
    neighborhood: "Harburg",
    capacity: "ca. 25 Kinder",
    tags: ["Familiär", "Kleine Gruppen", "Persönliche Begleitung"]
  },
  {
    name: "Kita Villa Blumenfeld",
    location: "Blankenese",
    description: "Stilvolle Villa mit kreativ gestalteten Räumen und klaren Strukturen im Alltag.",
    district: "Altona",
    neighborhood: "Blankenese",
    capacity: "ca. 50 Kinder",
    tags: ["Kreativität", "Sprache", "Natur"]
  },
  {
    name: "Kita Marzipanfabrik",
    location: "Bahrenfeld",
    description: "Modern umgebautes Fabrikgebäude mit viel Raum für Bewegung und Projektarbeit.",
    district: "Altona",
    neighborhood: "Bahrenfeld",
    capacity: "ca. 70 Kinder",
    tags: ["Projektarbeit", "Bewegung", "Musik"]
  },
  {
    name: "Kita Alsterzwerge",
    location: "Winterhude",
    description: "Zentrale Lage mit modernen Räumen und strukturiertem Tagesablauf.",
    district: "Hamburg-Nord",
    neighborhood: "Winterhude",
    tags: ["Sprache", "Bewegung", "Natur"]
  },
  {
    name: "Kita Sonnendeck",
    location: "Barmbek",
    description: "Großzügige Außenflächen und eine lebendige, freundliche Atmosphäre.",
    district: "Hamburg-Nord",
    neighborhood: "Barmbek-Nord",
    tags: ["Bewegung", "Kreativität", "Urban"]
  },
  {
    name: "Kita Elbwichtel",
    location: "Ottensen",
    description: "Warme, kreative Umgebung mit vielen Möglichkeiten zum Rollenspiel.",
    district: "Altona",
    neighborhood: "Ottensen",
    tags: ["Kreativität", "Sprache", "Sozialkompetenz"]
  },
  {
    name: "Kita Waldpfade",
    location: "Volksdorf",
    description: "Naturverbundene Kita am Waldrand mit ruhigem, stabilen Tagesablauf.",
    district: "Wandsbek",
    neighborhood: "Volksdorf",
    tags: ["Naturpädagogik", "Bewegung", "Ruhige Lage"]
  }
];

const KitaListing = () => {
  return (
    <section id="kitas">
      <h2>Beliebte Kitas in Hamburg (Auswahl)</h2>
      <p className="text-muted-foreground mb-8">
        Hier sehen Sie eine erste Auswahl beliebter Kitas in Hamburg. Die Liste kann nach Bezirk, Stadtteil und weiteren Kriterien gefiltert werden.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kitas.map((kita) => (
          <KitaCard key={kita.name} {...kita} />
        ))}
      </div>
    </section>
  );
};

export default KitaListing;
