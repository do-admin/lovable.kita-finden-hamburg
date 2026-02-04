import { useState, useEffect } from "react";
import { ThumbsUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface KitaVoteButtonProps {
  kitaId: string;
  kitaName: string;
  size?: "sm" | "md" | "lg";
}

export const KitaVoteButton = ({
  kitaId,
  kitaName,
  size = "md",
}: KitaVoteButtonProps) => {
  const [voteCount, setVoteCount] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load initial vote count and check if user has voted
  useEffect(() => {
    const loadVoteData = async () => {
      try {
        // Get vote count from database
        const { data, error } = await supabase
          .from("kita_votes")
          .select("vote_count")
          .eq("kita_id", kitaId)
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          console.error("Error loading vote count:", error);
        }

        setVoteCount(data?.vote_count ?? 0);

        // Check if user has voted from this device (localStorage)
        const votedKey = `kita_voted_${kitaId}`;
        setHasVoted(localStorage.getItem(votedKey) === "true");
      } catch (err) {
        console.error("Error loading vote data:", err);
      }
    };

    loadVoteData();
  }, [kitaId]);

  const handleVote = async () => {
    if (hasVoted) {
      toast({
        title: "Bereits abgestimmt",
        description: "Sie haben für diese Einrichtung bereits abgestimmt.",
        variant: "default",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await supabase.functions.invoke("handle-vote", {
        body: { kita_id: kitaId },
      });

      if (response.error) {
        if (response.error.alreadyVoted) {
          toast({
            title: "Bereits abgestimmt",
            description: "Eine Stimme pro Einrichtung und Gerät.",
            variant: "default",
          });
          setHasVoted(true);
        } else {
          throw new Error(response.error.error || "Voting failed");
        }
      } else {
        // Success
        setVoteCount(response.data.vote_count);
        setHasVoted(true);

        // Store in localStorage
        localStorage.setItem(`kita_voted_${kitaId}`, "true");

        toast({
          title: "Danke für Ihre Empfehlung!",
          description: `${kitaName} wurde empfohlen.`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error voting:", error);
      toast({
        title: "Fehler",
        description:
          "Es gab einen Fehler beim Absenden Ihrer Stimme. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "text-xs gap-1 px-2 py-1",
    md: "text-sm gap-2 px-4 py-2",
    lg: "text-base gap-2 px-6 py-3",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleVote}
        disabled={loading || hasVoted}
        variant={hasVoted ? "secondary" : "default"}
        className={sizeClasses[size]}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ThumbsUp className="h-4 w-4" />
        )}
        {hasVoted ? "Empfohlen" : "Empfehlen"}
      </Button>
      {voteCount !== null && (
        <p className="text-xs text-muted-foreground text-center">
          👍 {voteCount} {voteCount === 1 ? "Empfehlung" : "Empfehlungen"}
        </p>
      )}
      <p className="text-[10px] text-muted-foreground text-center">
        Eine Stimme pro Einrichtung und Gerät.
      </p>
    </div>
  );
};
