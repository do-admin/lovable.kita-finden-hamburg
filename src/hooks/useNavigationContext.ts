 import { useCallback } from "react";
 import { useLocation, useNavigate } from "react-router-dom";
 
 const STORAGE_KEY = "kitaNavContext";
 
 export interface NavigationContext {
   sourceUrl: string;
   sourceScrollY: number;
   sourceLabel?: string;
   timestamp: number;
 }
 
 // Context expires after 30 minutes
 const CONTEXT_EXPIRY_MS = 30 * 60 * 1000;
 
 export const useNavigationContext = () => {
   const location = useLocation();
   const navigate = useNavigate();
 
   // Save current page context before navigating to detail page
   const saveContext = useCallback((label?: string) => {
     const context: NavigationContext = {
       sourceUrl: location.pathname + location.search,
       sourceScrollY: window.scrollY,
       sourceLabel: label,
       timestamp: Date.now(),
     };
     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
   }, [location]);
 
   // Get saved navigation context
   const getContext = useCallback((): NavigationContext | null => {
     try {
       const stored = sessionStorage.getItem(STORAGE_KEY);
       if (!stored) return null;
 
       const context: NavigationContext = JSON.parse(stored);
       
       // Check if context has expired
       if (Date.now() - context.timestamp > CONTEXT_EXPIRY_MS) {
         sessionStorage.removeItem(STORAGE_KEY);
         return null;
       }
       
       return context;
     } catch {
       return null;
     }
   }, []);
 
   // Navigate back using saved context
   const navigateBack = useCallback(() => {
     const context = getContext();
     
     if (context) {
       // Store scroll position to restore after navigation
       sessionStorage.setItem(
         "kitaScrollRestore",
         JSON.stringify({ url: context.sourceUrl, scrollY: context.sourceScrollY })
       );
       navigate(context.sourceUrl);
     } else {
       // Default fallback
       navigate("/");
     }
   }, [getContext, navigate]);
 
   // Clear the context (call after using it)
   const clearContext = useCallback(() => {
     sessionStorage.removeItem(STORAGE_KEY);
   }, []);
 
   return {
     saveContext,
     getContext,
     navigateBack,
     clearContext,
   };
 };
 
 // Hook to restore scroll position on listing pages
 export const useScrollRestore = () => {
   const location = useLocation();
 
   const restoreScroll = useCallback(() => {
     try {
       const stored = sessionStorage.getItem("kitaScrollRestore");
       if (!stored) return;
 
       const { url, scrollY } = JSON.parse(stored);
       const currentUrl = location.pathname + location.search;
 
       if (url === currentUrl && typeof scrollY === "number") {
         // Wait for content to render, then scroll
         requestAnimationFrame(() => {
           setTimeout(() => {
             window.scrollTo({ top: scrollY, behavior: "smooth" });
             sessionStorage.removeItem("kitaScrollRestore");
           }, 100);
         });
       }
     } catch {
       // Ignore errors
     }
   }, [location]);
 
   return { restoreScroll };
 };