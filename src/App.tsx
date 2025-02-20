import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CrimeFeed from "./components/crimes/CrimeFeed";

// Placeholder components until we build them
const Missions = () => <div className="p-4">דף משימות בבנייה</div>;
const Scores = () => <div className="p-4">דף ניקוד בבנייה</div>;
const Profile = () => <div className="p-4">דף פרופיל בבנייה</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CrimeFeed />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;