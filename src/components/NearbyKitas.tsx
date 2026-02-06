import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { kitas, type KitaDetail } from "@/data/kitas";
import { calculateDistance, formatDistance } from "@/hooks/useGeolocation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface NearbyKitasProps {
  currentKita: KitaDetail;
  limit?: number;
}

export const NearbyKitas = ({ currentKita, limit = 6 }: NearbyKitasProps) => {
  // Calculate distances from current kita and sort by nearest first
  const nearbyKitas = kitas
    .filter((k) => k.id !== currentKita.id)
    .map((kita) => ({
      ...kita,
      distance: calculateDistance(
        currentKita.coordinates.lat,
        currentKita.coordinates.lng,
        kita.coordinates.lat,
        kita.coordinates.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  if (nearbyKitas.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Weitere Kitas in der Nähe
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {nearbyKitas.map((kita) => (
          <Link
            key={kita.id}
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
        ))}
      </div>
    </section>
  );
};
