 import { Link } from "react-router-dom";
 import { MapPin, ExternalLink } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { UpvoteButton } from "@/components/voting/UpvoteButton";
 import type { KitaWithVotes } from "@/pages/Voting";
 
 interface VotingListProps {
   kitas: KitaWithVotes[];
   loading: boolean;
   onVoteSuccess: (kitaId: string, newWeeklyCount: number) => void;
 }
 
 export const VotingList = ({
   kitas,
   loading,
   onVoteSuccess,
 }: VotingListProps) => {
   if (loading) {
     return (
       <div className="text-center py-16">
         <div className="animate-pulse text-muted-foreground">
           Wird geladen...
         </div>
       </div>
     );
   }
 
   return (
     <div className="space-y-3">
       {kitas.map((kita, index) => (
         <VotingListItem
           key={kita.id}
           kita={kita}
           rank={index + 1}
           onVoteSuccess={onVoteSuccess}
         />
       ))}
     </div>
   );
 };
 
 interface VotingListItemProps {
   kita: KitaWithVotes;
   rank: number;
   onVoteSuccess: (kitaId: string, newWeeklyCount: number) => void;
 }
 
 const VotingListItem = ({ kita, rank, onVoteSuccess }: VotingListItemProps) => {
   const betreuungsartLabels = {
     krippe: "U3",
     elementar: "Ü3",
     hort: "Hort",
   };
 
   return (
     <article className="bg-white rounded-xl border border-border p-4 md:p-5 hover:border-primary/30 hover:shadow-md transition-all">
       <div className="flex items-center gap-4">
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
             <span>•</span>
             <span>{kita.konzept}</span>
           </div>
 
           {/* One-liner */}
           <p className="text-sm text-foreground/80 line-clamp-1 mt-1 hidden md:block">
             {kita.beschreibung[0]?.substring(0, 100)}...
           </p>
         </div>
 
         {/* Upvote Button */}
         <div className="flex-shrink-0">
           <UpvoteButton
             kitaId={kita.id.toString()}
             kitaName={kita.name}
             currentVotes={kita.votes_weekly}
             onVoteSuccess={onVoteSuccess}
           />
         </div>
       </div>
     </article>
   );
 };