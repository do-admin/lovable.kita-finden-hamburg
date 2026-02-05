 export const VotingDisclosure = () => {
   const currentDate = new Date().toLocaleDateString("de-DE", {
     year: "numeric",
     month: "long",
     day: "numeric",
   });
 
   return (
     <div className="mt-12 pt-8 border-t border-border">
       <div className="bg-muted/50 rounded-xl p-6 text-center">
         <h3 className="font-semibold text-foreground mb-3">
           So funktioniert das Voting
         </h3>
         <ul className="text-sm text-muted-foreground space-y-1">
           <li>• 1 Stimme pro Einrichtung und Gerät pro Woche</li>
           <li>• Voting wird wöchentlich (Sonntag 23:59 Uhr) zurückgesetzt</li>
           <li>• Die Top 10 werden nach wöchentlichen Stimmen ermittelt</li>
         </ul>
         <p className="text-xs text-muted-foreground mt-4">
           Stand: {currentDate}
         </p>
       </div>
     </div>
   );
 };