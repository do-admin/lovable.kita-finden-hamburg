 import { useState } from "react";
 import { MessageCircle, Flag, User } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 
 interface Comment {
   id: number;
   name: string;
   avatar?: string;
   badges: string[];
   timestamp: string;
   text: string;
 }
 
 const initialComments: Comment[] = [
   {
     id: 1,
     name: "Nina K.",
     badges: ["Elternteil", "Verifiziert"],
     timestamp: "vor 2 Tagen",
     text: "Wir sind sehr zufrieden mit dieser Kita! Die Erzieherinnen sind liebevoll und kompetent. Unsere Tochter geht jeden Tag gerne hin.",
   },
   {
     id: 2,
     name: "Marcus T.",
     badges: ["Elternteil"],
     timestamp: "vor 5 Tagen",
     text: "Gute Einrichtung mit tollem Außengelände. Die Eingewöhnung war sehr behutsam. Einziger Nachteil: manchmal schwierig einen Termin für Elterngespräche zu bekommen.",
   },
   {
     id: 3,
     name: "Julia S.",
     badges: ["Verifiziert"],
     timestamp: "vor 1 Woche",
     text: "Das pädagogische Konzept überzeugt uns sehr. Die Kinder lernen spielerisch und werden individuell gefördert.",
   },
 ];
 
 const additionalComments: Comment[] = [
   {
     id: 4,
     name: "Thomas B.",
     badges: ["Elternteil"],
     timestamp: "vor 2 Wochen",
     text: "Unser Sohn ist seit einem Jahr hier und hat sich super entwickelt. Die Kommunikation mit den Erziehern ist transparent und regelmäßig.",
   },
   {
     id: 5,
     name: "Sarah M.",
     badges: [],
     timestamp: "vor 3 Wochen",
     text: "Schöne Räumlichkeiten und ein abwechslungsreiches Programm. Die Kinder machen regelmäßig Ausflüge in die Umgebung.",
   },
 ];
 
 export const KitaCommentsSection = () => {
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showMoreComments, setShowMoreComments] = useState(false);
 
   const displayedComments = showMoreComments
     ? [...initialComments, ...additionalComments]
     : initialComments;
 
   return (
     <section className="mt-12 pt-10 border-t border-border">
       {/* Section Header */}
       <div className="flex items-center gap-2 mb-6">
         <MessageCircle className="h-5 w-5 text-primary" />
         <h2 className="text-2xl font-bold text-primary">Kommentare</h2>
         <span className="text-sm text-muted-foreground">
           ({initialComments.length + additionalComments.length})
         </span>
       </div>
 
       {/* Comment Composer */}
       <div className="bg-white rounded-xl border border-border p-4 mb-6">
         <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
           {/* Avatar Placeholder */}
           <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
             <User className="h-5 w-5 text-muted-foreground" />
           </div>
 
           {/* Input Container */}
           <div className="flex-1 relative">
             <input
               type="text"
               placeholder="Was denkst du?"
               disabled
               className="w-full h-12 px-4 rounded-xl border border-border bg-muted/30 text-muted-foreground text-sm cursor-not-allowed"
             />
           </div>
 
           {/* Login Button */}
           <Button
             onClick={() => setShowLoginModal(true)}
             className="rounded-full px-5 h-10 text-sm font-medium whitespace-nowrap"
           >
             Anmelden, um zu kommentieren
           </Button>
         </div>
       </div>
 
       {/* Comments List */}
       <div className="space-y-4">
         {displayedComments.map((comment) => (
           <CommentItem key={comment.id} comment={comment} />
         ))}
       </div>
 
       {/* Load More Button */}
       {!showMoreComments && (
         <div className="mt-6 text-center">
           <Button
             variant="ghost"
             onClick={() => setShowMoreComments(true)}
             className="text-sm text-muted-foreground hover:text-primary"
           >
             Mehr laden
           </Button>
         </div>
       )}
 
       {/* Login Modal */}
       <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
         <DialogContent className="sm:max-w-md">
           <DialogHeader>
             <DialogTitle className="text-xl font-bold text-center">
               Anmeldung
             </DialogTitle>
           </DialogHeader>
           <div className="py-6 text-center">
             <p className="text-muted-foreground mb-6">
               Bitte melde dich an, um einen Kommentar zu schreiben.
             </p>
             <Button
               variant="outline"
               onClick={() => setShowLoginModal(false)}
               className="min-w-[120px]"
             >
               Schließen
             </Button>
           </div>
         </DialogContent>
       </Dialog>
     </section>
   );
 };
 
 const CommentItem = ({ comment }: { comment: Comment }) => {
   return (
     <article className="bg-white rounded-xl border border-border p-4 hover:border-primary/20 transition-colors">
       <div className="flex gap-3">
         {/* Avatar */}
         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
           <span className="text-sm font-medium text-muted-foreground">
             {comment.name.charAt(0)}
           </span>
         </div>
 
         {/* Content */}
         <div className="flex-1 min-w-0">
           {/* Header Row */}
           <div className="flex flex-wrap items-center gap-2 mb-1">
             <span className="font-semibold text-foreground text-sm">
               {comment.name}
             </span>
             {comment.badges.map((badge) => (
               <Badge
                 key={badge}
                 variant="secondary"
                 className="text-xs px-2 py-0.5 font-normal"
               >
                 {badge}
               </Badge>
             ))}
             <span className="text-xs text-muted-foreground">
               {comment.timestamp}
             </span>
           </div>
 
           {/* Comment Text */}
           <p className="text-sm text-foreground/80 leading-relaxed">
             {comment.text}
           </p>
 
           {/* Actions Row */}
           <div className="mt-2">
             <button
               className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
               onClick={() => {}}
             >
               <Flag className="h-3 w-3" />
               Melden
             </button>
           </div>
         </div>
       </div>
     </article>
   );
 };