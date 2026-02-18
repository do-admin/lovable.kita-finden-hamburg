 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { supabase } from "@/integrations/supabase/client";
 import { kitas } from "@/data/kitas";
 import { toast } from "sonner";
 
 interface KitaRankingWidgetProps {
   kitaId: string;
   kitaName: string;
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
 
 export const KitaRankingWidget = ({ kitaId, kitaName }: KitaRankingWidgetProps) => {
   const navigate = useNavigate();
   const [rank, setRank] = useState<number | null>(null);
   const [votes, setVotes] = useState(0);
   const [hasVoted, setHasVoted] = useState(false);
   const [isVoting, setIsVoting] = useState(false);
   const [sortedKitaIds, setSortedKitaIds] = useState<number[]>([]);
 
   useEffect(() => {
     const loadRankingData = async () => {
       try {
         // Fetch all votes to calculate rankings
         const { data: allVotes, error } = await supabase
           .from("kita_votes")
           .select("kita_id, votes_weekly")
           .order("votes_weekly", { ascending: false });
 
         if (error) throw error;
 
         // Create a map of kita_id to votes
         const voteMap = new Map(
           allVotes?.map((v) => [v.kita_id, v.votes_weekly]) || []
         );
 
         // Sort all kitas by votes
         const sorted = [...kitas]
           .map((k) => ({
             id: k.id,
             votes: voteMap.get(k.id.toString()) || 0,
           }))
           .sort((a, b) => b.votes - a.votes);
 
         setSortedKitaIds(sorted.map((k) => k.id));
 
         // Find current kita's rank and votes
         const currentIndex = sorted.findIndex((k) => k.id.toString() === kitaId);
         if (currentIndex !== -1) {
           setRank(currentIndex + 1);
           setVotes(sorted[currentIndex].votes);
         } else {
           setRank(sorted.length + 1);
           setVotes(0);
         }
 
         // Check if user has already voted
         const votedKitas = JSON.parse(localStorage.getItem("voted_kitas") || "{}");
         const currentWeek = getCurrentWeekId();
         setHasVoted(votedKitas[kitaId] === currentWeek);
       } catch (err) {
         console.error("Error loading ranking:", err);
       }
     };
 
     loadRankingData();
   }, [kitaId]);
 
   const handleVote = async () => {
     if (hasVoted || isVoting) return;
 
     setIsVoting(true);
     try {
       const { data, error } = await supabase.functions.invoke("handle-vote", {
         body: { kitaId },
       });
 
       if (error) throw error;
 
       if (data.success) {
         setVotes(data.newWeeklyCount);
         setHasVoted(true);
         
         // Store in localStorage
         const votedKitas = JSON.parse(localStorage.getItem("voted_kitas") || "{}");
         votedKitas[kitaId] = getCurrentWeekId();
         localStorage.setItem("voted_kitas", JSON.stringify(votedKitas));
         
         toast.success(`Danke für deine Empfehlung für ${kitaName}!`);
       } else if (data.alreadyVoted) {
         setHasVoted(true);
         toast.info("Du hast diese Woche bereits abgestimmt.");
       }
     } catch (err) {
       console.error("Vote error:", err);
       toast.error("Fehler beim Abstimmen. Bitte versuche es erneut.");
     } finally {
       setIsVoting(false);
     }
   };
 
   const navigateToKita = (direction: "prev" | "next") => {
     const currentIndex = sortedKitaIds.findIndex((id) => id.toString() === kitaId);
     if (currentIndex === -1) return;
 
     let newIndex: number;
     if (direction === "prev") {
       newIndex = currentIndex > 0 ? currentIndex - 1 : sortedKitaIds.length - 1;
     } else {
       newIndex = currentIndex < sortedKitaIds.length - 1 ? currentIndex + 1 : 0;
     }
 
     navigate(`/kita/${sortedKitaIds[newIndex]}`);
   };
 
   return (
     <div className="bg-white rounded-2xl border border-border p-5">
       {/* Top Row: Rank + Navigation */}
       <div className="flex items-center justify-between mb-4">
         <div>
           <span className="text-2xl md:text-3xl font-extrabold text-foreground">
             #{rank || "–"}
           </span>
           <p className="text-xs text-muted-foreground mt-0.5">Wochen-Rang</p>
         </div>
 
         {/* Navigation Arrows */}
         <div className="flex items-center bg-muted rounded-full p-1">
           <button
             onClick={() => navigateToKita("prev")}
             className="p-2 rounded-full hover:bg-background transition-colors"
             aria-label="Vorherige Kita"
           >
             <ChevronLeft className="h-4 w-4 text-foreground" />
           </button>
           <div className="w-px h-5 bg-border mx-0.5" />
           <button
             onClick={() => navigateToKita("next")}
             className="p-2 rounded-full hover:bg-background transition-colors"
             aria-label="Nächste Kita"
           >
             <ChevronRight className="h-4 w-4 text-foreground" />
           </button>
         </div>
       </div>
 
       {/* Vote Button */}
       <Button
         onClick={handleVote}
         disabled={hasVoted || isVoting}
         className={`w-full h-12 text-base font-semibold rounded-xl transition-all ${
           hasVoted
             ? "bg-muted text-muted-foreground cursor-default"
             : "bg-success hover:bg-success/90 text-success-foreground"
         }`}
       >
         <ThumbsUp className={`h-4 w-4 mr-2 ${hasVoted ? "" : "animate-pulse"}`} />
         {hasVoted ? "Empfohlen" : "Empfehlen"} · {votes} Stimmen
       </Button>
 
       <p className="text-xs text-muted-foreground text-center mt-3">
         Eine Stimme pro Kita und Woche
       </p>
     </div>
   );
 };