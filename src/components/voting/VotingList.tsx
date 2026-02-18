 import { Link } from "react-router-dom";
import { useNavigationContext } from "@/hooks/useNavigationContext";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { UpvoteButton } from "@/components/voting/UpvoteButton";
import type { KitaWithVotes } from "@/pages/Top10";
 
 interface VotingListProps {
   kitas: KitaWithVotes[];
   loading: boolean;
   onVoteSuccess: (kitaId: string, newWeeklyCount: number) => void;
  showRank?: boolean;
 }
 
 export const VotingList = ({
   kitas,
   loading,
   onVoteSuccess,
  showRank = false,
 }: VotingListProps) => {
  const { saveContext } = useNavigationContext();

  const handleNavigate = () => {
    saveContext("Zurück zur Top 10");
  };

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
          showRank={showRank}
          onNavigate={handleNavigate}
         />
       ))}
     </div>
   );
 };
 
 interface VotingListItemProps {
   kita: KitaWithVotes;
   rank: number;
   onVoteSuccess: (kitaId: string, newWeeklyCount: number) => void;
  showRank?: boolean;
  onNavigate?: () => void;
 }
 
export const VotingListItem = ({ kita, rank, onVoteSuccess, showRank = false, onNavigate }: VotingListItemProps) => {
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
     <article className="bg-white rounded-xl border border-border p-4 md:p-5 hover:border-primary/30 hover:shadow-md transition-all">
       <div className="flex items-center gap-4">
        {/* Rank Badge (optional) */}
        {showRank && (
          <div className="flex-shrink-0">
            <div
              className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-lg ${
                rank === 1
                  ? "bg-primary text-primary-foreground"
                  : rank === 2
                  ? "bg-primary/60 text-primary-foreground"
                  : rank === 3
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {rank}
            </div>
          </div>
        )}

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
            onClick={onNavigate}
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
 
        {/* Actions: Route Button + Upvote Button */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {/* Route Button (hidden on mobile) */}
          <div className="hidden md:flex flex-col gap-1">
             <Link to={`/kita/${kita.id}`} onClick={onNavigate}>
              <Button size="sm" variant="outline" className="text-xs">
                Details <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs"
              onClick={() => openGoogleMaps(kita.adresse)}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Route
            </Button>
          </div>

          {/* Upvote Button */}
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