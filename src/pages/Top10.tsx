import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { kitas } from "@/data/kitas";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, MapPin, Star, Navigation, Trophy, ChevronUp } from "lucide-react";

interface KitaWithVotes {
  id: number;
  name: string;
  stadtteil: string;
  bezirk: string;
  beschreibung: string[];
  heroImage: string;
  googleBewertung?: number;
  adresse: string;
  betreuungsart: ("krippe" | "elementar" | "hort")[];
  konzept: string;
  vote_count: number;
  votes_weekly: number;
}

const Top10Page = () => {
  const [topKitas, setTopKitas] = useState<KitaWithVotes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopKitas = async () => {
      try {
        // Fetch all vote counts
        const { data: votes, error } = await supabase
          .from("kita_votes")
          .select("*")
          .order("votes_weekly", { ascending: false });

        if (error) {
          console.error("Error fetching votes:", error);
          setTopKitas([]);
          setLoading(false);
          return;
        }

        // Map votes to kitas
        let result: KitaWithVotes[] = [];

        // Add kitas with votes
        for (const vote of votes || []) {
          const kita = kitas.find((k) => k.id.toString() === vote.kita_id);
          if (kita) {
            result.push({
              ...kita,
              vote_count: vote.vote_count,
              votes_weekly: vote.votes_weekly,
            });
          }
        }

        // Sort by weekly votes
        result.sort((a, b) => b.votes_weekly - a.votes_weekly);

        // If fewer than 10, add editorial selections
        if (result.length < 10) {
          const allIds = new Set(result.map((k) => k.id));
          const editorial = kitas
            .filter((k) => !allIds.has(k.id))
            .slice(0, 10 - result.length);

          result = [
            ...result,
            ...editorial.map((k) => ({
              ...k,
              vote_count: 0,
              votes_weekly: 0,
            })),
          ];
        }

        setTopKitas(result.slice(0, 10));
      } catch (err) {
        console.error("Error loading top kitas:", err);
        setTopKitas([]);
      } finally {
        setLoading(false);
      }
    };

    loadTopKitas();
  }, []);

  const betreuungsartLabels = {
    krippe: "U3",
    elementar: "Ü3",
    hort: "Hort",
  };

  const openGoogleMaps = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dark Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Trophy className="h-4 w-4" />
            <span>Wöchentliches Ranking</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Top 10 Kitas in Hamburg
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Basierend auf den Stimmen dieser Woche – gewählt von Eltern für Eltern.
          </p>
        </div>
      </section>

      <main className="py-12">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* CTA to vote */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <p className="text-muted-foreground text-sm">
              Die Ergebnisse werden wöchentlich aktualisiert
            </p>
            <Link to="/kita/hamburg/voting">
              <Button variant="outline" size="sm">
                <ChevronUp className="h-4 w-4 mr-1" />
                Jetzt abstimmen
              </Button>
            </Link>
          </div>

          {/* Rankings List */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-pulse text-muted-foreground">
                  Wird geladen...
                </div>
              </div>
            ) : topKitas.length > 0 ? (
              topKitas.map((kita, index) => (
                <article
                  key={kita.id}
                  className="bg-white rounded-xl border border-border p-4 md:p-5 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      <div
                        className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-lg ${
                          index === 0
                            ? "bg-amber-500 text-white"
                            : index === 1
                            ? "bg-slate-400 text-white"
                            : index === 2
                            ? "bg-amber-700 text-white"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="flex-shrink-0 hidden sm:block">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-muted overflow-hidden">
                        <img
                          src={kita.heroImage || "/placeholder.svg"}
                          alt={kita.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/kita/${kita.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="font-bold text-foreground line-clamp-1 text-base md:text-lg">
                          {kita.name}
                        </h3>
                      </Link>

                      {/* Meta Line */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {kita.stadtteil}
                        </span>
                        <span>•</span>
                        <span>
                          {kita.betreuungsart
                            .map((b) => betreuungsartLabels[b])
                            .join(" / ")}
                        </span>
                        {kita.googleBewertung && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {kita.googleBewertung}
                            </span>
                          </>
                        )}
                      </div>

                      {/* One-liner */}
                      <p className="text-sm text-foreground/80 line-clamp-1 mt-1 hidden md:block">
                        {kita.beschreibung[0]?.substring(0, 100)}...
                      </p>
                    </div>

                    {/* Vote count + CTAs */}
                    <div className="flex-shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      {/* Vote Count Badge */}
                      <div className="flex flex-col items-center justify-center min-w-[64px] h-[64px] md:h-[72px] rounded-xl bg-primary/10 border border-primary/20">
                        <ChevronUp className="h-4 w-4 text-primary" />
                        <span className="text-lg font-bold text-primary tabular-nums">
                          {kita.votes_weekly}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="hidden sm:flex flex-col gap-1">
                        <Link to={`/kita/${kita.id}`}>
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            Details <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full text-xs"
                          onClick={() => openGoogleMaps(kita.adresse)}
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Route
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Noch keine Kitas im Ranking. Sei der/die Erste!
                </p>
                <Link to="/kita/hamburg/voting" className="mt-4 inline-block">
                  <Button>Jetzt abstimmen</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Disclosure */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-muted/50 rounded-xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-3">
                So entsteht das Ranking
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stimmen der Community bestimmen die Platzierung</li>
                <li>• 1 Stimme pro Einrichtung und Gerät pro Woche</li>
                <li>• Ranking wird wöchentlich (Sonntag 23:59 Uhr) zurückgesetzt</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                Stand:{" "}
                {new Date().toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 bg-primary/10 rounded-2xl border border-primary/20 p-6 text-center">
            <h3 className="font-bold text-foreground mb-2">
              Deine Lieblings-Kita ist nicht dabei?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stimme jetzt ab und bringe sie ins Ranking!
            </p>
            <Link to="/kita/hamburg/voting">
              <Button>
                <ChevronUp className="h-4 w-4 mr-2" />
                Zur Abstimmung
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Top10Page;
