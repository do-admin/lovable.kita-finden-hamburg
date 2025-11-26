const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="text-lg font-medium">kita-finden-hamburg.de</div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#kitas" className="text-sm font-medium hover:underline hover:text-foreground/80">Kitas</a>
            <a href="#traeger" className="text-sm font-medium hover:underline hover:text-foreground/80">Träger</a>
            <a href="#wissen" className="text-sm font-medium hover:underline hover:text-foreground/80">Wissen</a>
            <a href="#ratgeber" className="text-sm font-medium hover:underline hover:text-foreground/80">Ratgeber</a>
            <a href="#kita-hinzufuegen" className="text-sm font-medium hover:underline hover:text-foreground/80">Kita hinzufügen</a>
          </nav>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>DE</span>
            <a href="#login" className="hover:text-foreground">Login</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
