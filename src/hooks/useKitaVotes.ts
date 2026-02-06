import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface VoteData {
  [kitaId: string]: number;
}

export const useKitaVotes = () => {
  const [votes, setVotes] = useState<VoteData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const { data, error } = await supabase
          .from("kita_votes")
          .select("kita_id, vote_count");

        if (error) {
          console.error("Error fetching votes:", error);
          return;
        }

        const voteMap: VoteData = {};
        data?.forEach((row) => {
          voteMap[row.kita_id] = row.vote_count;
        });
        setVotes(voteMap);
      } catch (err) {
        console.error("Error fetching votes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  const getVoteCount = (kitaId: string | number): number => {
    return votes[kitaId.toString()] || 0;
  };

  return { votes, loading, getVoteCount };
};
