import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import MoodPopup from "@/components/MoodPopup";
import RaagaPlayer from "@/components/RaagaPlayer";
import PraharTimeline from "@/components/PraharTimeline";
import Analytics from "@/components/Analytics";
import FloatingNotes from "@/components/FloatingNotes";

const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Player */}
      <div className="lg:col-span-2">
        <RaagaPlayer />
      </div>
      
      {/* Prahar Timeline */}
      <div>
        <PraharTimeline />
      </div>
      
      {/* Analytics */}
      <div className="lg:col-span-3">
        <Analytics />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [showMoodPopup, setShowMoodPopup] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Show mood popup only on first visit to dashboard
    const hasSeenMoodPopup = sessionStorage.getItem("hasSeenMoodPopup");
    if (hasSeenMoodPopup) {
      setShowMoodPopup(false);
    }
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    sessionStorage.setItem("hasSeenMoodPopup", "true");
  };

  const handleMoodClose = () => {
    setShowMoodPopup(false);
    sessionStorage.setItem("hasSeenMoodPopup", "true");
  };

  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen relative">
      <FloatingNotes />
      
      <AppSidebar />
      
      {/* Main Content */}
      <div className="md:ml-64 transition-all duration-300">
        <TopBar />
        
        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {/* Current Mood Badge */}
          {selectedMood && (
            <div className="mb-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
                <span className="text-sm text-muted-foreground">Current mood:</span>
                <span className="text-sm font-medium text-primary">{selectedMood}</span>
              </div>
            </div>
          )}
          
          {isMainDashboard ? <DashboardHome /> : <Outlet />}
        </main>
      </div>

      <MoodPopup
        open={showMoodPopup}
        onClose={handleMoodClose}
        onSelect={handleMoodSelect}
      />
    </div>
  );
};

export default Dashboard;
