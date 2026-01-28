import logoKitaFinden from "@/assets/logo-kita-finden-hamburg.webp";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-custom py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div>
            <img src={logoKitaFinden} alt="Kita finden Hamburg" className="h-12 md:h-16 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihr unabhängiger Wegweiser zur passenden Kita in Hamburg.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground">Startseite</a></li>
              <li><a href="#ratgeber" className="hover:text-foreground">Ratgeber</a></li>
              <li><a href="#kitas" className="hover:text-foreground">Kita-Suche</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Weitere hilfreiche Angebote</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://kita-gutschein-hamburg.de" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  kita-gutschein-hamburg.de
                </a>
              </li>
              <li>
                <a href="https://beste-kita-hamburg.de" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  beste-kita-hamburg.de
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Über uns</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">Über das Projekt</a></li>
              <li><a href="#contact" className="hover:text-foreground">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#impressum" className="hover:text-foreground">Impressum</a></li>
              <li><a href="#datenschutz" className="hover:text-foreground">Datenschutz</a></li>
              <li><a href="#barrierefreiheit" className="hover:text-foreground">Barrierefreiheit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 kita-finden-hamburg.de – Ein unabhängiges Informationsangebot zur Kita-Suche in Hamburg.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
