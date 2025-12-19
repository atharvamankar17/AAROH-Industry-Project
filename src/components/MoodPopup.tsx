import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MoodPopupProps {
  open: boolean;
  onClose: () => void;
  onSelect: (mood: string) => void;
}

const moods = [
  { emoji: "😌", label: "Calm", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/40" },
  { emoji: "❤️", label: "Romantic", color: "from-pink-500/20 to-red-500/20", border: "border-pink-500/40" },
  { emoji: "🧠", label: "Focused", color: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/40" },
  { emoji: "⚡", label: "Energetic", color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/40" },
  { emoji: "😢", label: "Sad", color: "from-blue-500/20 to-slate-500/20", border: "border-blue-500/40" },
  { emoji: "😨", label: "Anxious", color: "from-gray-500/20 to-slate-500/20", border: "border-gray-500/40" },
];

const MoodPopup = ({ open, onClose, onSelect }: MoodPopupProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelect = (mood: string) => {
    setSelectedMood(mood);
    setTimeout(() => {
      onSelect(mood);
      onClose();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="glass-strong border-border/30 rounded-3xl max-w-lg p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted/50 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-playfair text-gradient">
            How are you feeling right now?
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Let us align your music with your current mood
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleSelect(mood.label)}
              className={`
                relative p-4 rounded-2xl border transition-all duration-300
                bg-gradient-to-br ${mood.color} ${mood.border}
                hover:scale-105 hover:shadow-lg
                ${selectedMood === mood.label ? "ring-2 ring-primary scale-105" : ""}
              `}
            >
              <span className="text-3xl block mb-2">{mood.emoji}</span>
              <span className="text-sm font-medium text-foreground">{mood.label}</span>
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          className="mt-6 w-full text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          Skip for now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MoodPopup;
