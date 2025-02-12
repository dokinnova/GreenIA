
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
import MarketAnalysis from "./pages/MarketAnalysis";
import AdminAutomation from "./pages/AdminAutomation";
import CookieConsent from "./components/CookieConsent";
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile";
import { AuthProvider } from "./components/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/properties-management" element={
              <ProtectedRoute>
                <PropertiesManagement />
              </ProtectedRoute>
            } />
            <Route path="/statistics" element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            } />
            <Route path="/price-prediction" element={
              <ProtectedRoute>
                <PricePrediction />
              </ProtectedRoute>
            } />
            <Route path="/sentiment-analysis" element={
              <ProtectedRoute>
                <SentimentAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/market-analysis" element={
              <ProtectedRoute>
                <MarketAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/admin-automation" element={
              <ProtectedRoute>
                <AdminAutomation />
              </ProtectedRoute>
            } />
          </Routes>
          <CookieConsent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
