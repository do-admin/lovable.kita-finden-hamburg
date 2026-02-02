import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Navigation, Star, ChevronRight } from "lucide-react";
import { kitas, kategorien, getKitasByKategorie, KitaDetail } from "@/data/kitas";
import { formatDistance, calculateDistance, useGeolocation } from "@/hooks/useGeolocation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Kita card component
const KitaCard = ({ kita, distance }: { kita: KitaDetail; distance?: number }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(kita.adresse)}`;

  return (
    <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-[4/3] w-full relative">
        <img src={kita.heroImage} alt={kita.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <Badge
            variant={kita.status === "frei" ? "default" : "secondary"}
            className={kita.status === "frei" ? "bg-green-600 hover:bg-green-700" : ""}
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
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{kita.googleBewertung}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-3">{kita.adresse}</p>
        <div className="text-xs text-muted-foreground mb-3">{kita.bezirk} · {kita.stadtteil}</div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {kita.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">{tag}</Badge>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex gap-2 mt-auto">
          <Link to={`/kita/${kita.id}`} className="flex-1">
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

// Category FAQ
const CategoryFAQ = ({ name, description, count }: { name: string; description: string; count: number }) => {
  const faqs = [
    {
      q: `Was ist ${name}?`,
      a: description
    },
    {
      q: `Wie viele ${name}-Kitas gibt es in Hamburg?`,
      a: `Aktuell sind ${count} Kitas mit diesem Angebot in unserem Verzeichnis gelistet.`
    },
    {
      q: `Wie finde ich die beste ${name}-Kita?`,
      a: `Vergleichen Sie die Kitas anhand unserer transparenten Kriterien: Bewertungen, Betreuungsschlüssel, Öffnungszeiten und pädagogisches Konzept. Nutzen Sie die Filterfunktion für eine gezielte Suche.`
    },
    {
      q: `Was kostet ein Platz in einer ${name}-Kita?`,
      a: `Die Kosten richten sich nach dem Hamburger Kita-Gutschein-System und sind einkommensabhängig. Bis zu 5 Stunden täglich sind für Kinder ab 1 Jahr kostenfrei.`
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-primary mb-6">Häufige Fragen zu {name}</h2>
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

const KategoriePage = () => {
  const { kategorie: kategorieSlug } = useParams<{ kategorie: string }>();
  const { latitude, longitude } = useGeolocation();
  const hasLocation = latitude !== null && longitude !== null;

  // Find matching category
  const kategorie = kategorien.find(k => k.slug === kategorieSlug);

  if (!kategorie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 pb-16 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Kategorie nicht gefunden</h1>
          <Link to="/suche">
            <Button>Zur Kita-Suche</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const results = getKitasByKategorie(kategorie);

  // Add distance to results
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

  // Related categories
  const relatedCategories = kategorien.filter(k => k.slug !== kategorieSlug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Startseite</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/kita/hamburg" className="hover:text-primary">Hamburg</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{kategorie.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              {kategorie.name} in Hamburg
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {kategorie.description}. Finden Sie die passende Kita mit transparenten Informationen zu Konzept, Bewertungen und freien Plätzen.
            </p>
          </div>

          {/* Related Categories */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Weitere Kategorien</h2>
            <div className="flex flex-wrap gap-2">
              {relatedCategories.map(cat => (
                <Link key={cat.slug} to={`/kita/hamburg/kategorie/${cat.slug}`}>
                  <Badge variant="outline" className="hover:bg-secondary cursor-pointer py-1.5 px-3">
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {displayedResults.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedResults.map(kita => (
                  <KitaCard key={kita.id} kita={kita} distance={kita.distance} />
                ))}
              </div>

              {results.length > 12 && (
                <div className="mt-10 text-center">
                  <Link to={`/suche?${kategorie.filter}=${encodeURIComponent(kategorie.value)}`}>
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
                Aktuell keine Kitas in dieser Kategorie gelistet.
              </p>
              <Link to="/suche" className="inline-block mt-4">
                <Button>Alle Kitas durchsuchen</Button>
              </Link>
            </div>
          )}

          {/* FAQ Section */}
          <CategoryFAQ name={kategorie.name} description={kategorie.description} count={results.length} />

          {/* All Categories Overview */}
          <section className="mt-16">
            <h2 className="text-xl font-bold text-primary mb-6">Alle Kategorien</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kategorien.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/kita/hamburg/kategorie/${cat.slug}`}
                  className={`p-4 bg-white rounded-xl border hover:shadow-md transition-shadow text-center ${cat.slug === kategorieSlug ? 'ring-2 ring-primary' : ''}`}
                >
                  <span className="font-medium text-foreground">{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KategoriePage;
