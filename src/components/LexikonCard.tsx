import { useEffect, useRef, useState } from "react";

interface LexikonCardProps {
  term: string;
  definition: string;
  accentColor?: "primary" | "success";
}

const LexikonCard = ({ term, definition, accentColor = "primary" }: LexikonCardProps) => {
  const accentClass = accentColor === "success" ? "bg-success" : "bg-primary";
  const cardRef = useRef<HTMLDivElement>(null);
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
    <div 
      ref={cardRef}
      className={`relative bg-card hover:bg-muted/30 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden
        ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
        transition-all duration-500 ease-out`}
    >
      {/* Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentClass}`} />
      
      <div className="p-6 pt-7">
        {/* Term */}
        <h3 className="text-lg font-bold text-foreground mb-3">
          {term}
        </h3>
        
        {/* Definition */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {definition}
        </p>
      </div>
    </div>
  );
};

export default LexikonCard;
