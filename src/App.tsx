import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import CrimeFeed from "./components/crimes/CrimeFeed";
import MissionsList from "./components/missions/MissionsList";
import ScoreBoard from "./components/scores/ScoreBoard";
import { UserProfile } from "./components/profile/UserProfile";
import { CompletedMissions } from "./components/missions/CompletedMissions";

// Mock data for development
const mockUserData = {
  name: "יוסי המלך",
  avatarUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=yossi",
  points: 450,
  completedMissions: 8,
  drunkLevel: 3,
};

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CrimeFeed />} />
            <Route path="/missions" element={
              <div className="space-y-8">
                <MissionsList />
                <CompletedMissions />
              </div>
            } />
            <Route path="/scores" element={<ScoreBoard />} />
            <Route 
              path="/profile" 
              element={<UserProfile {...mockUserData} />} 
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;