import { useState } from "react";
import { Button } from "@/components/ui/button";

const moods = [
  { emoji: "😌", label: "Calm", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/40", description: "Perfect for meditation and relaxation" },
  { emoji: "❤️", label: "Romantic", color: "from-pink-500/20 to-red-500/20", border: "border-pink-500/40", description: "Ragas that touch the heart" },
  { emoji: "🧠", label: "Focused", color: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/40", description: "Enhance concentration and productivity" },
  { emoji: "⚡", label: "Energetic", color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/40", description: "Uplifting and motivating ragas" },
  { emoji: "😢", label: "Sad", color: "from-blue-500/20 to-slate-500/20", border: "border-blue-500/40", description: "Music for emotional release" },
  { emoji: "😨", label: "Anxious", color: "from-gray-500/20 to-slate-500/20", border: "border-gray-500/40", description: "Calming ragas for peace of mind" },
];

const recommendedRaagas = {
  Calm: ["Yaman", "Bhimpalasi", "Bageshri"],
  Romantic: ["Khamaj", "Pilu", "Des"],
  Focused: ["Todi", "Marwa", "Shree"],
  Energetic: ["Bilawal", "Alhaiya Bilawal", "Saraswati"],
  Sad: ["Malkauns", "Darbari", "Miyan Ki Malhar"],
  Anxious: ["Hamsadhwani", "Kalavati", "Kedar"],
};

const MoodBoardPage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-playfair font-bold text-gradient mb-2">Mood Board</h2>
        <p className="text-muted-foreground">Select your current mood to get personalized raaga recommendations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood.label)}
            className={`
              relative p-6 rounded-2xl border transition-all duration-300 text-left
              bg-gradient-to-br ${mood.color} ${mood.border}
              hover:scale-105 hover:shadow-lg
              ${selectedMood === mood.label ? "ring-2 ring-primary scale-105 glow-cyan" : ""}
            `}
          >
            <span className="text-4xl block mb-3">{mood.emoji}</span>
            <h3 className="text-lg font-semibold text-foreground mb-1">{mood.label}</h3>
            <p className="text-xs text-muted-foreground">{mood.description}</p>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="glass-strong rounded-3xl p-6 animate-scale-in">
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-4">
            Recommended Raagas for {selectedMood} mood
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedRaagas[selectedMood as keyof typeof recommendedRaagas].map((raaga) => (
              <div
                key={raaga}
                className="p-4 rounded-xl bg-muted/30 border border-border/30 "
              >
                <h4 className="font-medium text-foreground">{raaga}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodBoardPage;
