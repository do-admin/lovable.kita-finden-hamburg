import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Navigation, Star, ChevronRight } from "lucide-react";
import { kitas, hamburgerBezirke, getKitasByBezirk, getKitasByStadtteil, KitaDetail } from "@/data/kitas";
import { formatDistance, calculateDistance, useGeolocation } from "@/hooks/useGeolocation";
import { useNavigationContext, useScrollRestore } from "@/hooks/useNavigationContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Helper to create URL-friendly slugs
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Reverse lookup: find original name from slug
const findBezirkFromSlug = (slug: string): string | null => {
  return Object.keys(hamburgerBezirke).find(b => slugify(b) === slug) || null;
};

const findStadtteilFromSlug = (slug: string): { bezirk: string; stadtteil: string } | null => {
  for (const [bezirk, stadtteile] of Object.entries(hamburgerBezirke)) {
    const stadtteil = stadtteile.find(s => slugify(s) === slug);
    if (stadtteil) return { bezirk, stadtteil };
  }
  return null;
};

// Kita card component (simplified for this page)
const KitaCard = ({ kita, distance, onNavigate }: { kita: KitaDetail; distance?: number; onNavigate?: () => void }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(kita.adresse)}`;

  return (
    <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-[4/3] w-full relative">
        <img src={kita.heroImage} alt={kita.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <Badge
            variant={kita.status === "frei" ? "default" : "secondary"}
            className={kita.status === "frei" ? "bg-success hover:bg-success/90" : ""}
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
            <Star className="h-4 w-4 fill-primary text-primary" />
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
          <Link to={`/kita/${kita.id}`} className="flex-1" onClick={onNavigate}>
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

// FAQ section for the district
const DistrictFAQ = ({ name, count }: { name: string; count: number }) => {
  const faqs = [
    {
      q: `Wie viele Kitas gibt es in ${name}?`,
      a: `Aktuell sind ${count} Kitas in ${name} in unserem Verzeichnis gelistet. Die Anzahl kann sich durch Neuaufnahmen ändern.`
    },
    {
      q: `Wie finde ich einen Kita-Platz in ${name}?`,
      a: `Nutzen Sie unsere Filterfunktion, um Kitas nach Betreuungsart, Öffnungszeiten und pädagogischem Konzept zu filtern. Bei vielen Kitas können Sie sich direkt vormerken lassen.`
    },
    {
      q: `Was kostet ein Kita-Platz in ${name}?`,
      a: `In Hamburg sind Kita-Plätze für Kinder ab dem ersten Lebensjahr bis zur Einschulung für bis zu 5 Stunden am Tag kostenfrei. Längere Betreuungszeiten sind einkommensabhängig gestaffelt.`
    },
    {
      q: `Welche pädagogischen Konzepte gibt es in ${name}?`,
      a: `In ${name} finden Sie Kitas mit verschiedenen Konzepten wie Montessori, Waldorf, Reggio, Naturpädagogik und integrative Einrichtungen. Nutzen Sie unsere Filter für eine gezielte Suche.`
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-primary mb-6">Häufige Fragen zu Kitas in {name}</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl border px-5">
            <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

const StadtteilPage = () => {
  const { bezirk: bezirkSlug, stadtteil: stadtteilSlug } = useParams<{ bezirk?: string; stadtteil?: string }>();
  const { latitude, longitude } = useGeolocation();
  const hasLocation = latitude !== null && longitude !== null;
  const { saveContext } = useNavigationContext();
  const { restoreScroll } = useScrollRestore();

  // Restore scroll position on mount
  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  // Determine if we're viewing a Bezirk or Stadtteil
  let pageTitle = "";
  let pageDescription = "";
  let results: KitaDetail[] = [];
  let relatedLinks: { name: string; slug: string }[] = [];
  let breadcrumb: { name: string; path: string }[] = [];

  if (stadtteilSlug) {
    // Viewing a specific Stadtteil
    const match = findStadtteilFromSlug(stadtteilSlug);
    if (match) {
      pageTitle = `Kitas in ${match.stadtteil}`;
      pageDescription = `Finden Sie die beste Kita in ${match.stadtteil} (${match.bezirk}). Alle Kindertagesstätten mit Bewertungen, Konzepten und freien Plätzen.`;
      results = getKitasByStadtteil(match.stadtteil);
      
      // Related: other Stadtteile in same Bezirk
      const siblings = hamburgerBezirke[match.bezirk as keyof typeof hamburgerBezirke] || [];
      relatedLinks = siblings
        .filter(s => s !== match.stadtteil)
        .slice(0, 6)
        .map(s => ({ name: s, slug: `/kita/hamburg/${slugify(match.bezirk)}/${slugify(s)}` }));
      
      breadcrumb = [
        { name: "Hamburg", path: "/kita/hamburg" },
        { name: match.bezirk, path: `/kita/hamburg/${slugify(match.bezirk)}` },
        { name: match.stadtteil, path: "" },
      ];
    }
  } else if (bezirkSlug && bezirkSlug !== "hamburg") {
    // Viewing a Bezirk
    const bezirk = findBezirkFromSlug(bezirkSlug);
    if (bezirk) {
      pageTitle = `Kitas in ${bezirk}`;
      pageDescription = `Übersicht aller Kindertagesstätten im Bezirk ${bezirk}. Finden Sie Krippen, Elementar-Kitas und Horte in Ihrer Nähe.`;
      results = getKitasByBezirk(bezirk);
      
      // Related: Stadtteile in this Bezirk
      const stadtteile = hamburgerBezirke[bezirk as keyof typeof hamburgerBezirke] || [];
      relatedLinks = stadtteile.slice(0, 8).map(s => ({
        name: s,
        slug: `/kita/hamburg/${bezirkSlug}/${slugify(s)}`
      }));
      
      breadcrumb = [
        { name: "Hamburg", path: "/kita/hamburg" },
        { name: bezirk, path: "" },
      ];
    }
  } else {
    // City-level: Hamburg overview
    pageTitle = "Kitas in Hamburg";
    pageDescription = "Finden Sie die passende Kita in Hamburg. Über 1.000 Kindertagesstätten in allen Bezirken mit transparenten Informationen.";
    results = kitas;
    
    // Related: all Bezirke
    relatedLinks = Object.keys(hamburgerBezirke).map(b => ({
      name: b,
      slug: `/kita/hamburg/${slugify(b)}`
    }));
    
    breadcrumb = [{ name: "Hamburg", path: "" }];
  }

  // Add distance to results if location available
  const resultsWithDistance = results.map(k => ({
    ...k,
    distance: hasLocation ? calculateDistance(latitude!, longitude!, k.coordinates.lat, k.coordinates.lng) : undefined
  })).sort((a, b) => {
    if (hasLocation && a.distance !== undefined && b.distance !== undefined) {
      return a.distance - b.distance;
    }
    return a.name.localeCompare(b.name, "de");
  });

  const displayedResults = resultsWithDistance.slice(0, 12);

  const handleNavigate = () => {
    const label = stadtteilSlug 
      ? `Zurück zu ${findStadtteilFromSlug(stadtteilSlug)?.stadtteil || "Stadtteile"}`
      : bezirkSlug 
        ? `Zurück zu ${findBezirkFromSlug(bezirkSlug) || "Bezirke"}`
        : "Zurück zu Hamburg";
    saveContext(label);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          {/* Hero */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </div>

          {/* Related Links (Stadtteile/Bezirke) */}
          {relatedLinks.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {stadtteilSlug ? "Weitere Stadtteile" : bezirkSlug !== "hamburg" ? "Stadtteile in diesem Bezirk" : "Bezirke in Hamburg"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedLinks.map(link => (
                  <Link key={link.slug} to={link.slug}>
                    <Badge variant="outline" className="hover:bg-secondary cursor-pointer py-1.5 px-3">
                      {link.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {displayedResults.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedResults.map(kita => (
                  <KitaCard key={kita.id} kita={kita} distance={kita.distance} onNavigate={handleNavigate} />
                ))}
              </div>

              {results.length > 12 && (
                <div className="mt-10 text-center">
                  <Link to={`/suche?bezirk=${encodeURIComponent(breadcrumb[breadcrumb.length - 1]?.name || "Hamburg")}`}>
                    <Button size="lg">
                      Alle {results.length} Kitas anzeigen
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted/50 rounded-2xl p-12 text-center">
              <p className="text-lg text-muted-foreground">
                Aktuell keine Kitas in diesem Bereich gelistet.
              </p>
              <Link to="/" className="inline-block mt-4">
                <Button>Zur Startseite</Button>
              </Link>
            </div>
          )}

          {/* FAQ Section */}
          <DistrictFAQ name={breadcrumb[breadcrumb.length - 1]?.name || "Hamburg"} count={results.length || kitas.length} />

          {/* Internal Links to other Bezirke */}
          {bezirkSlug === "hamburg" || !bezirkSlug ? null : (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-primary mb-6">Weitere Bezirke in Hamburg</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(hamburgerBezirke)
                  .filter(b => slugify(b) !== bezirkSlug)
                  .map(b => (
                    <Link
                      key={b}
                      to={`/kita/hamburg/${slugify(b)}`}
                      className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow text-center"
                    >
                      <span className="font-medium text-foreground">{b}</span>
                    </Link>
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StadtteilPage;
