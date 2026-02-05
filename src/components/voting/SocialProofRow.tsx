 import { Users } from "lucide-react";
 
 interface SocialProofRowProps {
   totalVoters: number;
 }
 
 export const SocialProofRow = ({ totalVoters }: SocialProofRowProps) => {
   // Generate placeholder avatars
   const avatarCount = Math.min(totalVoters, 5);
   const remainingCount = Math.max(0, totalVoters - 5);
 
   return (
     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 py-6 border-b border-border">
       <div className="flex items-center -space-x-3">
         {Array.from({ length: avatarCount || 3 }).map((_, i) => (
           <div
             key={i}
             className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary border-2 border-background flex items-center justify-center text-white text-sm font-medium"
           >
             {String.fromCharCode(65 + i)}
           </div>
         ))}
         {remainingCount > 0 && (
           <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-foreground text-xs font-medium">
             +{remainingCount}
           </div>
         )}
       </div>
       <div className="flex items-center gap-2 text-muted-foreground">
         <Users className="h-4 w-4" />
         <span className="text-sm">
           <strong className="text-foreground">{totalVoters}+</strong> Eltern
           haben diese Woche abgestimmt
         </span>
       </div>
     </div>
   );
 };