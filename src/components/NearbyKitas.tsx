import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { kitas, type KitaDetail, hamburgerBezirke } from "@/data/kitas";
import { calculateDistance, formatDistance } from "@/hooks/useGeolocation";

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

export const NearbyKitas = ({ currentKita, limit = 5 }: NearbyKitasProps) => {
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
      
      <ul className="space-y-3">
        {nearbyKitas.map((kita) => (
          <li key={kita.id}>
            <Link
              to={`/kita/${kita.id}`}
              className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-muted/30 transition-all group"
            >
              <div className="min-w-0">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors block truncate">
                  {kita.name}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {kita.stadtteil}, {kita.bezirk}
                </span>
              </div>
              
              <span className="text-sm text-muted-foreground flex-shrink-0">
                ca. {formatDistance(kita.distance)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
