import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { kitas } from "@/data/kitas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, MapPin, Star } from "lucide-react";

interface KitaWithVotes {
  id: number;
  name: string;
  stadtteil: string;
  bezirk: string;
  beschreibung: string[];
  heroImage: string;
  googleBewertung?: number;
  vote_count: number;
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
          .order("vote_count", { ascending: false });

        if (error) {
          console.error("Error fetching votes:", error);
          setTopKitas([]);
          setLoading(false);
          return;
        }

        // Map votes to kitas with minimum vote requirement (5 votes)
        const minVotes = 5;
        let result: KitaWithVotes[] = [];

        // Add kitas with votes
        for (const vote of votes || []) {
          if (vote.vote_count >= minVotes) {
            const kita = kitas.find((k) => k.id.toString() === vote.kita_id);
            if (kita) {
              result.push({
                ...kita,
                vote_count: vote.vote_count,
              });
            }
          }
        }

        // If fewer than 10, add editorial selections without votes
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-12 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Top 10 Kitas in Hamburg
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Die am meisten empfohlenen Kindertagesstätten in Hamburg. Diese
              Ranking wird durch die Stimmen unserer Community bestimmt und zeigt
              die Einrichtungen, die Eltern am meisten vertrauen.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Rankings List */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Wird geladen...</p>
                </div>
              ) : topKitas.length > 0 ? (
                topKitas.map((kita, index) => (
                  <Link key={kita.id} to={`/kita/${kita.id}`}>
                    <article className="bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                      {/* Rank Number */}
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                            {index + 1}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2">
                            {kita.name}
                          </h3>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {kita.stadtteil}
                            </span>
                            {kita.googleBewertung && (
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                {kita.googleBewertung}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-foreground mb-4 line-clamp-2">
                            {kita.beschreibung[0]}
                          </p>

                          {/* Vote Count */}
                          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            👍 {kita.vote_count}{" "}
                            {kita.vote_count === 1
                              ? "Empfehlung"
                              : "Empfehlungen"}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex-shrink-0 flex flex-col gap-2">
                          <Button size="sm">
                            Details <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Noch keine Kitas im Ranking. Seien Sie die erste Person, die
                    eine Kita empfiehlt!
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar: Methodology & Info */}
            <aside className="space-y-6">
              {/* Methodology Card */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-primary mb-4">
                  So entsteht das Ranking
                </h2>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">👍</span>
                    <span>
                      <strong>Stimmen der Community</strong> – Eltern empfehlen
                      Kitas, die ihnen gefallen
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">⭐</span>
                    <span>
                      <strong>Qualität & Ausstattung</strong> – Google-Bewertungen
                      und öffentliche Daten
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">📊</span>
                    <span>
                      <strong>Aktualität</strong> – Regelmäßig aktualisierte Daten
                      von Hamburgischen Behörden
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">✏️</span>
                    <span>
                      <strong>Editorial</strong> – Ergänzung durch Fachexpertise,
                      wenn weniger als 10 Kitas Stimmen haben
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-primary/10 rounded-2xl border border-primary/20 p-6 text-center">
                <h3 className="font-bold text-foreground mb-2">
                  Haben Sie eine Lieblings-Kita?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Empfehlen Sie Ihre Kita und helfen Sie anderen Eltern, die
                  beste Wahl zu treffen.
                </p>
                <Link to="/">
                  <Button variant="default" className="w-full">
                    Zur Suche
                  </Button>
                </Link>
              </div>

              {/* Info Card */}
              <div className="bg-muted/30 rounded-2xl p-6">
                <p className="text-xs text-muted-foreground">
                  <strong>Stand:</strong>{" "}
                  {new Date().toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Dieses Ranking wird in Echtzeit aktualisiert, wenn neue
                  Empfehlungen eingehen.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Top10Page;
