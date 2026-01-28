import KitaCard from "./KitaCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section id="kitas" className="max-w-[1280px] mx-auto">
      <h2 className="mb-6">Beliebte Kitas in Hamburg</h2>
      <p className="text-muted-foreground mb-8">
        Hier siehst du eine erste Auswahl beliebter Kitas in Hamburg. Die Liste kannst du nach Bezirk, Stadtteil und weiteren Kriterien filtern.
      </p>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {kitas.map((kita) => (
            <CarouselItem key={kita.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <KitaCard {...kita} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-8">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default KitaListing;
