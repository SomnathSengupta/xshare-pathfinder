import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import StudentDashboard from "./pages/student-dashboard";
import ExperienceLibrary from "./pages/experience-library";
import QAForum from "./pages/qa-forum";
import Leaderboard from "./pages/leaderboard";
import RewardsStore from "./pages/rewards-store";
import Resources from "./pages/resources";
import Profile from "./pages/profile";
import AcademicDashboard from "./pages/academic-dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/experiences" element={<ExperienceLibrary />} />
          <Route path="/qna" element={<QAForum />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/rewards" element={<RewardsStore />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/academic" element={<AcademicDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
