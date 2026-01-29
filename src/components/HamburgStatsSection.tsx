import { useEffect, useRef, useState } from "react";
import hamburgMap from "@/assets/hamburg-map-background.webp";

interface StatCard {
  targetValue: number;
  prefix: string;
  suffix: string;
  label: string;
  subtext: string;
}

const stats: StatCard[] = [
  {
    targetValue: 1280,
    prefix: "+",
    suffix: "",
    label: "Kitas in Hamburg",
    subtext: "aktuell gelistet & täglich aktualisiert",
  },
  {
    targetValue: 52000,
    prefix: "~",
    suffix: "",
    label: "Betreuungsplätze",
    subtext: "in allen Bezirken verfügbar",
  },
  {
    targetValue: 45,
    prefix: "+",
    suffix: " Konzepte",
    label: "pädagogische Schwerpunkte",
    subtext: "von Montessori bis Inklusion",
  },
];

// Easing function for smooth count-up
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

// Format number with German thousand separator
const formatNumber = (num: number): string => {
  return num.toLocaleString("de-DE");
};

const useCountUp = (
  targetValue: number,
  duration: number,
  shouldStart: boolean
) => {
  const [currentValue, setCurrentValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const value = Math.floor(easedProgress * targetValue);

      setCurrentValue(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, shouldStart]);

  return currentValue;
};

const StatCardComponent = ({
  stat,
  isVisible,
  isMobile,
}: {
  stat: StatCard;
  isVisible: boolean;
  isMobile: boolean;
}) => {
  const duration = isMobile ? 2800 : 2200;
  const count = useCountUp(stat.targetValue, duration, isVisible);

  return (
    <div
      className="bg-white rounded-[24px] shadow-lg p-6 md:p-7 w-[90%] md:w-[280px] lg:w-[300px] h-[140px] md:h-[150px]
                 hover:scale-[1.04] hover:shadow-xl hover:border-accent/50 
                 transition-all duration-300 border border-transparent
                 flex flex-col items-center justify-center text-center"
    >
      {/* Animated Number */}
      <div className="text-[26px] md:text-[30px] lg:text-[34px] font-extrabold text-primary leading-none mb-2">
        {stat.prefix}
        {formatNumber(count)}
        {stat.suffix}
      </div>

      {/* Label */}
      <div className="text-[15px] md:text-[16px] font-medium text-foreground mb-1">
        {stat.label}
      </div>

      {/* Subtext */}
      <div className="text-[13px] md:text-[14px] text-muted-foreground">
        {stat.subtext}
      </div>
    </div>
  );
};

const HamburgStatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[700px] md:min-h-[550px] lg:min-h-[600px] bg-white overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Hamburg Map Background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url(${hamburgMap})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "sepia(100%) saturate(300%) hue-rotate(220deg)",
          transform: "scale(1.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom flex flex-col items-center">
        {/* Headline */}
        <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-extrabold text-primary text-center mb-12 md:mb-16">
          Hamburg – Deine Kita-Welt
        </h2>

        {/* Stats Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-5 lg:gap-8 w-full">
          {stats.map((stat, index) => (
            <StatCardComponent
              key={index}
              stat={stat}
              isVisible={isVisible}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HamburgStatsSection;
