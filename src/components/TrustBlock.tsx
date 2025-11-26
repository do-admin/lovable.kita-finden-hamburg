const TrustBlock = () => {
  const partners = [
    {
      name: "BMFSFJ",
      description: "Offizieller Partner",
      url: "https://www.bmfsfj.de"
    },
    {
      name: "BSB Hamburg",
      description: "Hamburgs Kita-Behörde",
      url: "https://www.hamburg.de/bsb/"
    },
    {
      name: "AWO Hamburg",
      description: "Kooperationspartner",
      url: "https://www.awo-hamburg.de"
    },
    {
      name: "Diakonie Hamburg",
      description: "Soziale Verantwortung",
      url: "https://www.diakonie-hamburg.de"
    },
    {
      name: "NDR",
      description: "Medienpartner",
      url: "https://www.ndr.de"
    }
  ];

  return (
    <section className="py-12 border-t border-border bg-muted/20">
      <div className="container-custom">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Daten basieren auf offiziellen Quellen
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title={partner.description}
            >
              <div className="h-[60px] px-6 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                <div className="text-center">
                  <div className="text-xs font-semibold text-foreground/60 group-hover:text-foreground transition-colors">
                    {partner.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    {partner.description}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Wir arbeiten mit offiziellen und etablierten Partnern zusammen, um Ihnen verlässliche Informationen zur Verfügung zu stellen.
        </p>
      </div>
    </section>
  );
};

export default TrustBlock;
