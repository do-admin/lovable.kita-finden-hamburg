import { Badge } from "./ui/badge";

interface KitaCardProps {
  name: string;
  description: string;
  district: string;
  neighborhood: string;
  capacity?: string;
  tags: string[];
}

const KitaCard = ({ name, description, district, neighborhood, capacity, tags }: KitaCardProps) => {
  return (
    <article className="card-shadow rounded-lg p-6 bg-card hover:shadow-lg transition-shadow cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      
      <div className="text-xs text-muted-foreground mb-4">
        Bezirk {district} · Stadtteil {neighborhood}
        {capacity && ` · ${capacity}`}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <a href="#details" className="text-sm text-primary hover:underline">
        Details zur Kita ansehen →
      </a>
    </article>
  );
};

export default KitaCard;
