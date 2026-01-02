import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import albumArt from "@/assets/album-art.png";
import { raagaAudioMap } from "@/lib/raagaAudioMap";

type Props = {
  raaga: string;
};

const RaagaPlayer = ({ raaga }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ---------- LOAD AUDIO WHEN RAAGA CHANGES ---------- */
  useEffect(() => {
    if (!raaga) return;

    const audioSrc = raagaAudioMap[raaga];

    if (!audioSrc) {
      console.warn("No audio mapped for raaga:", raaga);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    setIsPlaying(false);
    setProgress(0);
  }, [raaga]);

  /* ---------- PLAY / PAUSE ---------- */
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  /* ---------- TIME FORMAT ---------- */
  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 animate-fade-in">
      {/* Album Art with Waveform Ring */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary via-pink-glow to-primary ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
          style={{ padding: "3px" }}
        >
          <div className="w-full h-full rounded-full bg-card" />
        </div>

        <div
          className={`absolute inset-2 rounded-full border-2 border-primary/30 ${
            isPlaying ? "animate-pulse-glow" : ""
          }`}
        />
        <div
          className={`absolute inset-4 rounded-full border border-pink-glow/20 ${
            isPlaying ? "animate-pulse-glow" : ""
          }`}
          style={{ animationDelay: "0.5s" }}
        />

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
          Raaga {raaga || "—"}
        </h2>
        <p className="text-muted-foreground text-sm">
          Prahar-based meditation
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-pink-glow rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>
            {audioRef.current
              ? formatTime(audioRef.current.currentTime)
              : "0:00"}
          </span>
          <span>{formatTime(duration)}</span>
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
          onClick={togglePlay}
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
          <Heart
            className={`w-5 h-5 ${
              isLiked
                ? "fill-pink-glow text-pink-glow"
                : "text-muted-foreground"
            }`}
          />
        </Button>

        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <div className="w-24 h-1 rounded-full bg-muted">
            <div className="w-2/3 h-full bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaagaPlayer;
