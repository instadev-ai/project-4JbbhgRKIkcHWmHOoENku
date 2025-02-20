import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CrimeFeed from "./components/crimes/CrimeFeed";
import MissionsList from "./components/missions/MissionsList";
import ScoreBoard from "./components/scores/ScoreBoard";

// Placeholder component until we build it
const Profile = () => <div className="p-4">Profile page coming soon...</div>;

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
            <Route path="/missions" element={<MissionsList />} />
            <Route path="/scores" element={<ScoreBoard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;