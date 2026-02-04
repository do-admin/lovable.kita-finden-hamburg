import { useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { kitas, type KitaDetail } from "@/data/kitas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KitaWithDistance extends KitaDetail {
  distance?: number;
}
import { formatDistance, calculateDistance, useGeolocation } from "@/hooks/useGeolocation";

// Sort by rating (highest first), then by name
const sortKitas = (kitaList: KitaDetail[]): KitaDetail[] => {
  return [...kitaList].sort((a, b) => {
    const ratingA = a.googleBewertung || 0;
    const ratingB = b.googleBewertung || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return a.name.localeCompare(b.name);
  });
};

// Kita Card Component (matching subpage style)
const KitaCard = ({ kita, distance }: { kita: KitaDetail; distance?: number }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(kita.adresse)}`;

  return (
    <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-[4/3] w-full relative">
        <img src={kita.heroImage} alt={kita.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <Badge
            variant={kita.status === "frei" ? "default" : "secondary"}
            className={kita.status === "frei" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {kita.status === "frei" ? "Plätze frei" : "Warteliste"}
          </Badge>
        </div>
        {distance !== undefined && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {formatDistance(distance)}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15px] md:text-[16px] font-semibold text-foreground mb-1">{kita.name}</h3>
        {kita.googleBewertung && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{kita.googleBewertung}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-3">{kita.adresse}</p>
        <div className="text-xs text-muted-foreground mb-3">{kita.alter} · {kita.betreuungszeiten}</div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {kita.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">{tag}</Badge>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex gap-2 mt-auto">
          <Link to={`/kita/${kita.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              Details <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="px-3" title="Route starten">
              <Navigation className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
};

// Main Component
const MarketplaceSection = ({
  city = "Hamburg",
  maxItems = 6,
  className,
}: {
  city?: string;
  maxItems?: number;
  className?: string;
}) => {
  const { latitude, longitude } = useGeolocation();
  const hasLocation = latitude !== null && longitude !== null;

  const displayedKitas = useMemo((): KitaWithDistance[] => {
    const kitasWithDistance: KitaWithDistance[] = kitas.map(k => ({
      ...k,
      distance: hasLocation ? calculateDistance(latitude!, longitude!, k.coordinates.lat, k.coordinates.lng) : undefined
    }));
    
    // Sort by distance if available, otherwise by rating
    if (hasLocation) {
      return kitasWithDistance
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, maxItems);
    }
    
    return sortKitas(kitasWithDistance).slice(0, maxItems);
  }, [hasLocation, latitude, longitude, maxItems]);

  return (
    <section
      className={cn("py-10 md:py-14 bg-muted/30", className)}
      aria-labelledby="marketplace-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2
            id="marketplace-heading"
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Empfohlene Kitas in {city}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schnelle Abkürzung – direkt zu passenden Einrichtungen in {city}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedKitas.map(kita => (
            <KitaCard key={kita.id} kita={kita} distance={kita.distance} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link to="/suche">
            <Button size="lg">
              Alle Kitas durchsuchen
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
