import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MoodPopupProps {
  open: boolean;
  onClose: () => void;
  onSelect: (data: {
    mood: string | null;
    genre: string | null;
  }) => void;
}

const moods = [
  { emoji: "😌", label: "Calm", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/40" },
  { emoji: "❤️", label: "Romantic", color: "from-pink-500/20 to-red-500/20", border: "border-pink-500/40" },
  { emoji: "🧠", label: "Focused", color: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/40" },
  { emoji: "⚡", label: "Energetic", color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/40" },
  { emoji: "😢", label: "Sad", color: "from-blue-500/20 to-slate-500/20", border: "border-blue-500/40" },
  { emoji: "😨", label: "Anxious", color: "from-gray-500/20 to-slate-500/20", border: "border-gray-500/40" },
];

const GENRES = ["Classical", "Semi-Classical", "Bollywood", "Devotional"];

const MoodPopup = ({ open, onClose, onSelect }: MoodPopupProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleContinue = () => {
    onSelect({
      mood: selectedMood,
      genre: selectedGenre,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="glass-strong border-border/30 rounded-3xl max-w-lg p-8">


        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-playfair text-gradient">
            Personalize your music
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Mood and genre are optional — preferences help us refine
          </p>
        </DialogHeader>

        {/* MOOD */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Your mood (optional)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() =>
                  setSelectedMood(
                    selectedMood === mood.label ? null : mood.label
                  )
                }
                className={`
                  p-4 rounded-2xl border transition-all duration-300
                  bg-gradient-to-br ${mood.color} ${mood.border}
                  hover:scale-105
                  ${selectedMood === mood.label ? "ring-2 ring-primary scale-105" : ""}
                `}
              >
                <span className="text-2xl block">{mood.emoji}</span>
                <span className="text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* GENRE */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Genre (optional)</h4>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() =>
                  setSelectedGenre(selectedGenre === g ? null : g)
                }
                className={`px-3 py-1 rounded-full text-sm border transition-colors
                  ${
                    selectedGenre === g
                      ? "bg-primary/20 border-primary"
                      : "border-border/40 text-muted-foreground"
                  }
                `}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={handleContinue}>
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MoodPopup;
