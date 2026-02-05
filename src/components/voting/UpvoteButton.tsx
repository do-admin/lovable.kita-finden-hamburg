 import { useState, useEffect } from "react";
 import { ChevronUp, Loader2 } from "lucide-react";
 import { supabase } from "@/integrations/supabase/client";
 import { toast } from "@/components/ui/use-toast";
 import { cn } from "@/lib/utils";
 
 interface UpvoteButtonProps {
   kitaId: string;
   kitaName: string;
   currentVotes: number;
   onVoteSuccess: (kitaId: string, newWeeklyCount: number) => void;
 }
 
 export const UpvoteButton = ({
   kitaId,
   kitaName,
   currentVotes,
   onVoteSuccess,
 }: UpvoteButtonProps) => {
   const [hasVoted, setHasVoted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [voteCount, setVoteCount] = useState(currentVotes);
 
   useEffect(() => {
     setVoteCount(currentVotes);
   }, [currentVotes]);
 
   useEffect(() => {
     // Check localStorage for this week's vote
     const weekId = getCurrentWeekId();
     const votedKey = `kita_voted_${kitaId}_${weekId}`;
     setHasVoted(localStorage.getItem(votedKey) === "true");
   }, [kitaId]);
 
   const handleVote = async () => {
     if (hasVoted || loading) return;
 
     setLoading(true);
 
     try {
       const response = await supabase.functions.invoke("handle-vote", {
         body: { kita_id: kitaId },
       });
 
       if (response.error) {
         if (response.data?.alreadyVoted) {
           toast({
             title: "Bereits abgestimmt",
             description: "Eine Stimme pro Kita und Woche.",
           });
           setHasVoted(true);
         } else {
           throw new Error(response.error.message || "Voting failed");
         }
       } else {
         const newWeeklyCount = response.data.votes_weekly;
         setVoteCount(newWeeklyCount);
         setHasVoted(true);
 
         // Store in localStorage with week ID
         const weekId = getCurrentWeekId();
         localStorage.setItem(`kita_voted_${kitaId}_${weekId}`, "true");
 
         onVoteSuccess(kitaId, newWeeklyCount);
 
         toast({
           title: "Danke für deine Stimme!",
           description: `Du hast für ${kitaName} gestimmt.`,
         });
       }
     } catch (error) {
       console.error("Error voting:", error);
       toast({
         title: "Fehler",
         description: "Bitte versuche es später erneut.",
         variant: "destructive",
       });
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <button
       onClick={handleVote}
       disabled={hasVoted || loading}
       className={cn(
         "flex flex-col items-center justify-center min-w-[64px] md:min-w-[72px] h-[72px] md:h-[80px] rounded-xl border-2 transition-all",
         hasVoted
           ? "bg-primary border-primary text-primary-foreground"
           : "bg-white border-border hover:border-primary hover:bg-primary/5"
       )}
     >
       {loading ? (
         <Loader2 className="h-5 w-5 animate-spin" />
       ) : (
         <>
           <ChevronUp
             className={cn(
               "h-5 w-5 md:h-6 md:w-6",
               hasVoted ? "text-primary-foreground" : "text-primary"
             )}
           />
           <span
             className={cn(
               "text-lg md:text-xl font-bold tabular-nums",
               hasVoted ? "text-primary-foreground" : "text-foreground"
             )}
           >
             {voteCount}
           </span>
         </>
       )}
     </button>
   );
 };
 
 function getCurrentWeekId(): string {
   const now = new Date();
   const startOfYear = new Date(now.getFullYear(), 0, 1);
   const days = Math.floor(
     (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
   );
   const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
   return `${now.getFullYear()}-${weekNumber.toString().padStart(2, "0")}`;
 }