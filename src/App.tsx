import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Lexikon from "./pages/Lexikon";
import FAQPage from "./pages/FAQ";
import Ratgeber from "./pages/Ratgeber";
import RatgeberArticle from "./pages/RatgeberArticle";
import KitaHinzufuegen from "./pages/KitaHinzufuegen";
import Kontakt from "./pages/Kontakt";
import Suche from "./pages/Suche";
import KitaDetail from "./pages/KitaDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lexikon" element={<Lexikon />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/ratgeber" element={<Ratgeber />} />
          <Route path="/ratgeber/:slug" element={<RatgeberArticle />} />
          <Route path="/kita-hinzufuegen" element={<KitaHinzufuegen />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/suche" element={<Suche />} />
          <Route path="/kitas" element={<Suche />} />
          <Route path="/kita/:id" element={<KitaDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
