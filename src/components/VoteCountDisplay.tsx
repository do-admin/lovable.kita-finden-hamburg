import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface VoteCountDisplayProps {
  kitaId: string | number;
  className?: string;
}

export const VoteCountDisplay = ({
  kitaId,
  className = "",
}: VoteCountDisplayProps) => {
  const [voteCount, setVoteCount] = useState<number | null>(null);

  useEffect(() => {
    const loadVoteCount = async () => {
      try {
        const { data, error } = await supabase
          .from("kita_votes")
          .select("vote_count")
          .eq("kita_id", kitaId.toString())
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          console.error("Error loading vote count:", error);
        }

        setVoteCount(data?.vote_count ?? 0);
      } catch (err) {
        console.error("Error loading vote count:", err);
      }
    };

    loadVoteCount();
  }, [kitaId]);

  if (voteCount === null) {
    return null;
  }

  return (
    <span className={className}>
      👍 {voteCount}
    </span>
  );
};
