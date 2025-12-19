import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import albumArt from "@/assets/album-art.png";

const RaagaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 animate-fade-in">
      {/* Album Art with Waveform Ring */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
        {/* Animated glow ring */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary via-pink-glow to-primary ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ padding: '3px' }}>
          <div className="w-full h-full rounded-full bg-card" />
        </div>
        
        {/* Waveform rings */}
        <div className={`absolute inset-2 rounded-full border-2 border-primary/30 ${isPlaying ? 'animate-pulse-glow' : ''}`} />
        <div className={`absolute inset-4 rounded-full border border-pink-glow/20 ${isPlaying ? 'animate-pulse-glow' : ''}`} style={{ animationDelay: '0.5s' }} />
        
        {/* Album art */}
        <div className="absolute inset-6 rounded-full overflow-hidden">
          <img
            src={albumArt}
            alt="Raaga Album Art"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-playfair font-bold text-foreground mb-1">
          Raaga Yaman Kalyan
        </h2>
        <p className="text-muted-foreground text-sm">Evening Meditation • 432 Hz</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden cursor-pointer group">
          <div 
            className="h-full bg-gradient-to-r from-primary to-pink-glow rounded-full transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>2:45</span>
          <span>7:30</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full">
          <SkipBack className="w-5 h-5 text-muted-foreground" />
        </Button>
        
        <Button
          variant="glow"
          size="icon"
          className="w-16 h-16 rounded-full"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        
        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full">
          <SkipForward className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-glow text-pink-glow' : 'text-muted-foreground'}`} />
        </Button>
        
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <div className="w-24 h-1 rounded-full bg-muted">
            <div className="w-2/3 h-full bg-primary rounded-full" />
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Genre</label>
          <Select defaultValue="classical">
            <SelectTrigger className="glass border-border/30 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border/30 rounded-xl">
              <SelectItem value="classical">Classical</SelectItem>
              <SelectItem value="bollywood">Bollywood</SelectItem>
              <SelectItem value="western">Western</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Language</label>
          <Select defaultValue="hindi">
            <SelectTrigger className="glass border-border/30 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border/30 rounded-xl">
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="marathi">Marathi</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Frequency</label>
          <Select defaultValue="432">
            <SelectTrigger className="glass border-border/30 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-strong border-border/30 rounded-xl">
              <SelectItem value="432">432 Hz</SelectItem>
              <SelectItem value="528">528 Hz</SelectItem>
              <SelectItem value="639">639 Hz</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default RaagaPlayer;
