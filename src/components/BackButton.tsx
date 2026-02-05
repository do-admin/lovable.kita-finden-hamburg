 import { ArrowLeft } from "lucide-react";
 import { useNavigationContext } from "@/hooks/useNavigationContext";
 
 interface BackButtonProps {
   className?: string;
 }
 
 const BackButton = ({ className = "" }: BackButtonProps) => {
   const { getContext, navigateBack } = useNavigationContext();
   const context = getContext();
 
   const label = context?.sourceLabel || "Zurück zur Übersicht";
 
   return (
     <button
       onClick={navigateBack}
       className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors ${className}`}
     >
       <ArrowLeft className="h-4 w-4" />
       {label}
     </button>
   );
 };
 
 export default BackButton;