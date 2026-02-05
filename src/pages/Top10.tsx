import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { kitas } from "@/data/kitas";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Vote } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VotingHero } from "@/components/voting/VotingHero";
import { SocialProofRow } from "@/components/voting/SocialProofRow";
import { VotingList } from "@/components/voting/VotingList";
import { VotingDisclosure } from "@/components/voting/VotingDisclosure";

export interface KitaWithVotes {
  id: number;
  name: string;
  stadtteil: string;
  bezirk: string;
  beschreibung: string[];
  heroImage: string;
  googleBewertung?: number;
  alter: string;
  betreuungsart: ("krippe" | "elementar" | "hort")[];
  konzept: string;
  adresse: string;
  votes_weekly: number;
  vote_count: number;
}

// Helper to get current ISO week ID
function getCurrentWeekId(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-${weekNumber.toString().padStart(2, "0")}`;
}

const Top10Page = () => {
  const [kitasWithVotes, setKitasWithVotes] = useState<KitaWithVotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVoters, setTotalVoters] = useState(0);

  useEffect(() => {
    const loadVotingData = async () => {
      try {
        const currentWeek = getCurrentWeekId();

        // Fetch all vote counts
        const { data: votes, error } = await supabase
          .from("kita_votes")
          .select("*")
          .order("votes_weekly", { ascending: false });

        if (error) {
          console.error("Error fetching votes:", error);
        }

        // Count total unique voters this week
        const { count } = await supabase
          .from("kita_vote_logs")
          .select("*", { count: "exact", head: true })
          .eq("voting_week_id", currentWeek);

        setTotalVoters(count || 0);

        // Map kitas with their vote counts
        const kitasWithVoteData: KitaWithVotes[] = kitas.map((kita) => {
          const voteData = votes?.find((v) => v.kita_id === kita.id.toString());
          return {
            ...kita,
            votes_weekly: voteData?.votes_weekly || 0,
            vote_count: voteData?.vote_count || 0,
          };
        });

        // Sort by weekly votes
        kitasWithVoteData.sort((a, b) => b.votes_weekly - a.votes_weekly);

        setKitasWithVotes(kitasWithVoteData);
      } catch (err) {
        console.error("Error loading voting data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVotingData();
  }, []);

  const handleVoteSuccess = (kitaId: string, newWeeklyCount: number) => {
    setKitasWithVotes((prev) =>
      prev
        .map((k) =>
          k.id.toString() === kitaId
            ? { ...k, votes_weekly: newWeeklyCount }
            : k
        )
        .sort((a, b) => b.votes_weekly - a.votes_weekly)
    );
    setTotalVoters((prev) => prev + 1);
  };

  // Get top 10 kitas
  const top10Kitas = kitasWithVotes.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dark Hero Section */}
      <VotingHero />

      <main className="py-12">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Social Proof Row */}
          <SocialProofRow totalVoters={totalVoters} />

          {/* Tabs: Top 10 / Alle Kitas */}
          <Tabs defaultValue="top10" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="top10" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Top 10
              </TabsTrigger>
              <TabsTrigger value="alle" className="flex items-center gap-2">
                <Vote className="h-4 w-4" />
                Alle Kitas ({kitasWithVotes.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="top10">
              <VotingList
                kitas={top10Kitas}
                loading={loading}
                onVoteSuccess={handleVoteSuccess}
                showRank={true}
              />
            </TabsContent>

            <TabsContent value="alle">
              <VotingList
                kitas={kitasWithVotes}
                loading={loading}
                onVoteSuccess={handleVoteSuccess}
                showRank={false}
              />
            </TabsContent>
          </Tabs>

          {/* Disclosure */}
          <VotingDisclosure />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Top10Page;
