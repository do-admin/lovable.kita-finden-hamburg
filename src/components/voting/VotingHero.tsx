 import { useState, useEffect } from "react";
 import { Clock } from "lucide-react";
 
 export const VotingHero = () => {
   const [countdown, setCountdown] = useState({
     days: 0,
     hours: 0,
     minutes: 0,
     seconds: 0,
   });
 
   useEffect(() => {
     const calculateTimeLeft = () => {
       const now = new Date();
       // Get next Sunday 23:59:59
       const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
       const nextSunday = new Date(now);
       nextSunday.setDate(now.getDate() + daysUntilSunday);
       nextSunday.setHours(23, 59, 59, 999);
 
       const diff = nextSunday.getTime() - now.getTime();
 
       if (diff > 0) {
         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
         const hours = Math.floor(
           (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
 
         setCountdown({ days, hours, minutes, seconds });
       }
     };
 
     calculateTimeLeft();
     const timer = setInterval(calculateTimeLeft, 1000);
 
     return () => clearInterval(timer);
   }, []);
 
   const formatNumber = (num: number) => num.toString().padStart(2, "0");
 
   return (
     <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-20">
       <div className="max-w-[900px] mx-auto px-4 md:px-6 text-center">
         <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
           Finde die beliebtesten Kitas
           <br />
           <span className="text-primary">– gewählt von Eltern</span>
         </h1>
         <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
           Stimme diese Woche für deine Favoriten ab und hilf anderen Familien,
           die beste Kita zu finden.
         </p>
 
         {/* Countdown Block */}
         <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 md:px-8 md:py-5">
           <div className="flex items-center justify-center gap-2 text-sm text-slate-300 mb-3">
             <Clock className="h-4 w-4" />
             <span>Voting endet in:</span>
           </div>
           <div className="flex items-center justify-center gap-2 md:gap-4">
             <CountdownUnit value={countdown.days} label="Tage" />
             <span className="text-2xl md:text-3xl font-bold text-slate-400">
               :
             </span>
             <CountdownUnit value={countdown.hours} label="Std" />
             <span className="text-2xl md:text-3xl font-bold text-slate-400">
               :
             </span>
             <CountdownUnit value={countdown.minutes} label="Min" />
             <span className="text-2xl md:text-3xl font-bold text-slate-400">
               :
             </span>
             <CountdownUnit value={countdown.seconds} label="Sek" />
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
   <div className="flex flex-col items-center">
     <span className="text-3xl md:text-4xl font-bold tabular-nums">
       {value.toString().padStart(2, "0")}
     </span>
     <span className="text-xs text-slate-400 uppercase tracking-wider">
       {label}
     </span>
   </div>
 );