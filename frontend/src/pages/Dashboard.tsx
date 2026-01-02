import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import MoodPopup from "@/components/MoodPopup";
import RaagaPlayer from "@/components/RaagaPlayer";
import PraharTimeline from "@/components/PraharTimeline";
import Analytics from "@/components/Analytics";
import FloatingNotes from "@/components/FloatingNotes";
import { Button } from "@/components/ui/button";

import {
  fetchRecommendation,
  RecommendResponse,
} from "@/lib/api";

import { resolveSpotifyPlaylist } from "@/lib/spotifyResolver";

/* ---------------- DASHBOARD HOME ---------------- */

const DashboardHome = ({
  currentPrahar,
  raaga,
}: {
  currentPrahar: string | null;
  raaga: string;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <RaagaPlayer raaga={raaga} />
      </div>

      <div>
        <PraharTimeline currentPrahar={currentPrahar} />
      </div>

      <div className="lg:col-span-3">
        <Analytics />
      </div>
    </div>
  );
};

/* ---------------- MAIN DASHBOARD ---------------- */

const Dashboard = () => {
  const [showMoodPopup, setShowMoodPopup] = useState(() => {
    return !sessionStorage.getItem("hasSeenMoodPopup");
  });

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const [recommendation, setRecommendation] =
    useState<RecommendResponse | null>(null);

  const [currentTime, setCurrentTime] = useState<string>("");

  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const now = new Date();

    setCurrentTime(
      now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );

    const fetchInitial = async () => {
      const response = await fetchRecommendation({
        mood: "",
        genre: "",
        language: "Hindi",
        timestamp: now.toISOString(),
      });
      setRecommendation(response);
    };

    fetchInitial();
  }, []);

  /* ---------- MOOD SELECT ---------- */
  const handleMoodSelect = async (data: {
    mood: string | null;
    genre: string | null;
  }) => {
    setSelectedMood(data.mood);
    setSelectedGenre(data.genre);
    setShowMoodPopup(false);
    sessionStorage.setItem("hasSeenMoodPopup", "true");

    const now = new Date();

    setCurrentTime(
      now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );

    const response = await fetchRecommendation({
      mood: data.mood ?? "",
      genre: data.genre ?? "",
      language: "Hindi",
      timestamp: now.toISOString(),
    });

    setRecommendation(response);
  };

  const handlePlaySpotify = () => {
    if (!recommendation?.prahar) {
      alert("Please wait while we personalize your playlist.");
      return;
    }

    const url = resolveSpotifyPlaylist({
      mood: selectedMood,
      genre: selectedGenre,
      prahar: recommendation.prahar as any,
    });

    if (!url) {
      alert("No playlist found for this selection.");
      return;
    }

    window.open(url, "_blank");
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen relative">
      <FloatingNotes />
      <AppSidebar />

      <div className="md:ml-64 transition-all duration-300">
        <TopBar />

        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {currentTime && (
            <div className="mb-1 text-xs text-muted-foreground">
              Time (IST): {currentTime}
            </div>
          )}

          {selectedMood && (
            <div className="mb-2 text-sm">
              Mood:{" "}
              <span className="text-primary font-medium">
                {selectedMood}
              </span>
            </div>
          )}

          {recommendation && (
            <div className="mb-2 text-sm">
              Prahar:{" "}
              <span className="text-primary font-medium">
                {recommendation.prahar}
              </span>
            </div>
          )}

{recommendation && (
  <div className="mb-4 p-4 rounded-xl border border-purple-300/50 bg-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
    
    {/* Left: Raaga Info */}
    <div className="flex flex-col gap-1 text-center sm:text-left flex-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        Recommended for you
      </p>
      <p className="text-lg font-semibold text-purple-500">
        Raaga {recommendation.raaga}
      </p>
      <p className="text-xs text-muted-foreground">
        Curated for your current mood & time of day
      </p>
    </div>

    {/* Right: Spotify Button main dashboard */}
    {isMainDashboard && (
      <Button
        className="mt-3 sm:mt-0 whitespace-nowrap"
        onClick={handlePlaySpotify}
      >
        ▶ Play personalized playlist on Spotify
      </Button>
    )}

  </div>
)}

          {isMainDashboard ? (
            <DashboardHome
              currentPrahar={recommendation?.prahar ?? null}
              raaga={recommendation?.raaga ?? "—"}
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <MoodPopup
        open={showMoodPopup}
        onClose={() => setShowMoodPopup(false)}
        onSelect={handleMoodSelect}
      />
    </div>
  );
};

export default Dashboard;
