import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { getKitaById } from "@/data/kitas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Calendar,
  Users,
  Euro,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { KitaRankingWidget } from "@/components/KitaRankingWidget";
import { KitaCommentsSection } from "@/components/KitaCommentsSection";
import { NearbyKitas } from "@/components/NearbyKitas";

const KitaDetail = () => {
  const { id } = useParams();
  const kita = getKitaById(Number(id));

  if (!kita) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Kita nicht gefunden</h1>
            <p className="text-muted-foreground mb-8">
              Die gesuchte Kita existiert nicht oder wurde entfernt.
            </p>
            <Link to="/">
              <Button>Zur Startseite</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative">
          {/* Hero Image */}
          <div className="aspect-[21/9] md:aspect-[3/1] bg-muted relative">
            <img
              src={kita.heroImage}
              alt={kita.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-[1200px] mx-auto">
              {/* Neutrality Notice */}
              <p className="text-white/70 text-xs mb-3">
                Unabhängige Übersicht – keine eigene Bewertung
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2">
                    {kita.name}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80">
                    {kita.bezirk} · {kita.stadtteil} · {kita.traegerArt}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    className={`text-sm px-4 py-2 ${
                      kita.status === "frei"
                        ? "bg-success text-success-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {kita.status === "frei" ? "Plätze frei" : "Warteliste"}
                  </Badge>
                  <Button
                    size="lg"
                    className="hidden md:inline-flex"
                    onClick={() => document.getElementById("vormerken")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Jetzt vormerken
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Pills */}
        <section className="bg-white border-b border-border">
          <div className="max-w-[1200px] mx-auto px-6 py-5">
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm px-4 py-2 font-normal">
                <Users className="h-4 w-4 mr-2" />
                {kita.alter}
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2 font-normal">
                {kita.plaetze} Plätze
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2 font-normal">
                <Clock className="h-4 w-4 mr-2" />
                {kita.betreuungszeiten}
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2 font-normal">
                {kita.konzept}
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2 font-normal">
                {kita.traegerArt}
              </Badge>
              {kita.googleBewertung && (
                <Badge variant="outline" className="text-sm px-4 py-2 font-normal">
                  Google: {kita.googleBewertung} ★
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-16">
          {/* Back Link */}
          <BackButton className="mb-8" />

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-primary mb-5">Über diese Kita</h2>
                <div className="prose prose-slate max-w-none">
                  {kita.beschreibung.map((absatz, idx) => (
                    <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">
                      {absatz}
                    </p>
                  ))}
                </div>
              </section>

              {/* Schwerpunkte */}
              <section>
                <h2 className="text-2xl font-bold text-primary mb-5">Pädagogische Schwerpunkte</h2>
                <div className="flex flex-wrap gap-2">
                  {kita.schwerpunkte.map((schwerpunkt) => (
                    <Badge
                      key={schwerpunkt}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {schwerpunkt}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section>
                <h2 className="text-2xl font-bold text-primary mb-5">Eindrücke</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {kita.galerie.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] bg-muted rounded-xl overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${kita.name} Bild ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Comments Section */}
              <KitaCommentsSection />

              {/* Nearby Kitas Section for SEO internal linking */}
              <NearbyKitas currentKita={kita} limit={5} />

            </div>

            {/* Right Column - Sidebar */}
            <aside className="space-y-6">
              {/* Ranking & Voting Widget */}
              <KitaRankingWidget kitaId={kita.id.toString()} kitaName={kita.name} />

              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-bold text-primary mb-5">Kontakt & Infos</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Adresse</p>
                      <p className="text-sm text-muted-foreground">{kita.adresse}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Telefon</p>
                      <a
                        href={`tel:${kita.telefon.replace(/\s/g, "")}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {kita.telefon}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">E-Mail</p>
                      <a
                        href={`mailto:${kita.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {kita.email}
                      </a>
                    </div>
                  </div>

                  {kita.website && (
                    <div className="flex gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Website</p>
                        <a
                          href={`https://${kita.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {kita.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Öffnungszeiten</p>
                      <p className="text-sm text-muted-foreground">{kita.oeffnungszeiten}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Ferienregelung</p>
                      <p className="text-sm text-muted-foreground">{kita.ferienregelung}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Euro className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Elternbeitrag</p>
                      <p className="text-sm text-muted-foreground">{kita.elternbeitrag}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <a href={`tel:${kita.telefon.replace(/\s/g, "")}`}>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Direkt anrufen
                    </Button>
                  </a>
                  <a href={`mailto:${kita.email}`}>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      E-Mail schreiben
                    </Button>
                  </a>
                </div>
              </div>

              {/* Status Card */}
              <div
                className={`rounded-2xl p-6 ${
                  kita.status === "frei"
                    ? "bg-success/10 border border-success/20"
                    : "bg-accent/10 border border-accent/20"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    kita.status === "frei" ? "text-success" : "text-accent"
                  }`}
                >
                  {kita.statusText}
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Karte wird geladen...</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KitaDetail;
