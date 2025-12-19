import { Search, Play, Pause, SkipForward, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <header className="glass-strong border-b border-border/30 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search raaga, mood, frequency…"
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Mini Player Controls */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/30">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4 text-primary" />
          )}
        </Button>
        <div className="w-24 h-1 rounded-full bg-muted overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-primary to-pink-glow rounded-full" />
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <SkipForward className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* User Avatar */}
      <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-pink-glow/30 border border-border/30 flex items-center justify-center hover:border-primary/50 transition-all">
        <User className="w-5 h-5 text-foreground" />
      </button>
    </header>
  );
};

export default TopBar;
