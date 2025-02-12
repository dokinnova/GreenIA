
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import PropertiesManagement from "./pages/PropertiesManagement";
import Statistics from "./pages/Statistics";
import PricePrediction from "./pages/PricePrediction";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties-management" element={<PropertiesManagement />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
