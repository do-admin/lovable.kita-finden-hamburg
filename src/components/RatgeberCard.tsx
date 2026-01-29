import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { RatgeberArticle } from "@/data/ratgeber-articles";

interface RatgeberCardProps {
  article: RatgeberArticle;
  accentColor?: "primary" | "success";
}

const RatgeberCard = ({ article, accentColor = "primary" }: RatgeberCardProps) => {
  const accentClass = accentColor === "success" ? "bg-success" : "bg-primary";
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link to={`/ratgeber/${article.slug}`} className="block group">
      <article 
        ref={cardRef}
        className={`relative bg-card hover:bg-muted/30 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden h-full
          ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
          transition-all duration-500 ease-out`}
      >
        {/* Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${accentClass} z-10`} />
        
        {/* Placeholder Image */}
        <div className="aspect-[16/9] w-full">
          <img 
            src="/placeholder.svg" 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          {/* Read Time Badge */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-medium text-muted-foreground">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
              {article.readTime}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {article.description}
          </p>
          
          {/* Read More Link */}
          <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
            Weiterlesen →
          </span>
        </div>
      </article>
    </Link>
  );
};

export default RatgeberCard;
