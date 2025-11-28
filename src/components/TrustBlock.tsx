import logoBMFSFJ from "@/assets/logo-bmfsfj.svg";
import logoHamburg from "@/assets/logo-hamburg.png";
import logoAWO from "@/assets/logo-awo.png";
import logoDiakonie from "@/assets/logo-diakonie.svg";

const TrustBlock = () => {
  const partners = [
    {
      name: "BMFSFJ",
      description: "Offizieller Partner",
      url: "https://www.bmfsfj.de",
      logo: logoBMFSFJ
    },
    {
      name: "hamburg.de",
      description: "Hamburgs Kita-Behörde",
      url: "https://www.hamburg.de/bsb/",
      logo: logoHamburg
    },
    {
      name: "AWO Hamburg",
      description: "Kooperationspartner",
      url: "https://www.awo-hamburg.de",
      logo: logoAWO
    },
    {
      name: "Diakonie Hamburg",
      description: "Soziale Verantwortung",
      url: "https://www.diakonie-hamburg.de",
      logo: logoDiakonie
    }
  ];

  return (
    <section className="py-12 border-t border-border bg-muted/20">
      <div className="container-custom">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Daten basieren auf offiziellen Quellen
        </p>
        
        <div className="flex flex-wrap items-end justify-center gap-8">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-[140px] h-[50px] flex items-center justify-center"
              title={partner.description}
            >
              <div className="w-full h-full flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-[45px] max-w-[130px] object-contain"
                />
              </div>
            </a>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Wir arbeiten mit offiziellen und etablierten Partnern zusammen, um dir verlässliche Informationen zur Verfügung zu stellen.
        </p>
      </div>
    </section>
  );
};

export default TrustBlock;
