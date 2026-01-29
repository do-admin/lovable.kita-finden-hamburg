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
    <article className="card-shadow rounded-xl bg-card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      {/* Placeholder Image */}
      <div className="aspect-[4/3] w-full">
        <img 
          src="/placeholder.svg" 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15px] md:text-[16px] font-semibold mb-2 leading-tight">{name}</h3>
        <p className="text-muted-foreground text-[12px] md:text-[13px] mb-3 leading-relaxed line-clamp-2">{description}</p>
        
        <div className="text-[11px] md:text-[12px] text-muted-foreground mb-3">
          Bezirk {district} · Stadtteil {neighborhood}
          {capacity && ` · ${capacity}`}
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] md:text-[11px] px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
        
        <a href="#details" className="text-[12px] md:text-[13px] text-primary hover:underline font-medium">
          Details zur Kita ansehen →
        </a>
      </div>
    </article>
  );
};

export default KitaCard;
