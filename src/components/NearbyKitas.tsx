import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { kitas, type KitaDetail, hamburgerBezirke } from "@/data/kitas";
import { calculateDistance, formatDistance } from "@/hooks/useGeolocation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface NearbyKitasProps {
  currentKita: KitaDetail;
  limit?: number;
}

// Get adjacent districts for a given bezirk
const getAdjacentBezirke = (bezirk: string): string[] => {
  const adjacencyMap: Record<string, string[]> = {
    "Altona": ["Eimsbüttel", "Hamburg-Mitte"],
    "Eimsbüttel": ["Altona", "Hamburg-Nord"],
    "Hamburg-Nord": ["Eimsbüttel", "Wandsbek"],
    "Hamburg-Mitte": ["Altona", "Hamburg-Nord", "Wandsbek", "Bergedorf", "Harburg"],
    "Wandsbek": ["Hamburg-Nord", "Hamburg-Mitte", "Bergedorf"],
    "Bergedorf": ["Hamburg-Mitte", "Wandsbek"],
    "Harburg": ["Hamburg-Mitte"],
  };
  return adjacencyMap[bezirk] || [];
};

export const NearbyKitas = ({ currentKita, limit = 6 }: NearbyKitasProps) => {
  // Calculate distances from current kita
  const kitasWithDistance = kitas
    .filter((k) => k.id !== currentKita.id)
    .map((kita) => ({
      ...kita,
      distance: calculateDistance(
        currentKita.coordinates.lat,
        currentKita.coordinates.lng,
        kita.coordinates.lat,
        kita.coordinates.lng
      ),
    }));

  // Sort: same district first, then adjacent districts, then by distance
  const adjacentBezirke = getAdjacentBezirke(currentKita.bezirk);
  
  const sortedKitas = kitasWithDistance.sort((a, b) => {
    // Same district priority
    const aSameDistrict = a.bezirk === currentKita.bezirk ? 0 : 1;
    const bSameDistrict = b.bezirk === currentKita.bezirk ? 0 : 1;
    if (aSameDistrict !== bSameDistrict) return aSameDistrict - bSameDistrict;
    
    // Same stadtteil priority within same bezirk
    if (a.bezirk === currentKita.bezirk && b.bezirk === currentKita.bezirk) {
      const aSameStadtteil = a.stadtteil === currentKita.stadtteil ? 0 : 1;
      const bSameStadtteil = b.stadtteil === currentKita.stadtteil ? 0 : 1;
      if (aSameStadtteil !== bSameStadtteil) return aSameStadtteil - bSameStadtteil;
    }
    
    // Adjacent district priority
    const aAdjacent = adjacentBezirke.includes(a.bezirk) ? 0 : 1;
    const bAdjacent = adjacentBezirke.includes(b.bezirk) ? 0 : 1;
    if (aAdjacent !== bAdjacent) return aAdjacent - bAdjacent;
    
    // Finally, sort by distance
    return a.distance - b.distance;
  });

  const nearbyKitas = sortedKitas.slice(0, limit);

  if (nearbyKitas.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Weitere Kitas in der Nähe
      </h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {nearbyKitas.map((kita) => (
            <CarouselItem key={kita.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Link
                to={`/kita/${kita.id}`}
                className="block rounded-lg border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <AspectRatio ratio={1}>
                  <img
                    src="/placeholder.svg"
                    alt={kita.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-1.5">
                    {kita.name}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{kita.stadtteil}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ca. {formatDistance(kita.distance)}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </section>
  );
};
