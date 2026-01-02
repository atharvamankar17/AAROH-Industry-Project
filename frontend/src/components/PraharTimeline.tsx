import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

type Props = {
  currentPrahar: string | null;
  showAllDescriptions?: boolean; // optional: show all descriptions
};

const PRAHAR_LABEL_MAP: Record<string, string> = {
  MORNING: "Morning",
  AFTERNOON: "Afternoon",
  EVENING: "Evening",
  NIGHT: "Night",
};

const prahars = [
  {
    icon: Sunrise,
    label: "Morning",
    time: "6 AM - 12 PM",
    color: "from-amber-400 to-orange-500",
    description: "Fresh and calm, ideal for light and uplifting raagas.",
  },
  {
    icon: Sun,
    label: "Afternoon",
    time: "12 PM - 6 PM",
    color: "from-yellow-400 to-amber-500",
    description: "Bright and energetic, suited for lively raagas.",
  },
  {
    icon: Sunset,
    label: "Evening",
    time: "6 PM - 12 AM",
    color: "from-purple-500 to-pink-500",
    description: "Relaxing and introspective, perfect for soothing raagas.",
  },
  {
    icon: Moon,
    label: "Night",
    time: "12 AM - 6 AM",
    color: "from-indigo-500 to-purple-600",
    description: "Quiet and contemplative, best for deep and serene raagas.",
  },
];

const PraharTimeline = ({ currentPrahar, showAllDescriptions = false }: Props) => {
  const normalizedPrahar = currentPrahar ? PRAHAR_LABEL_MAP[currentPrahar] : null;

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8">
      <h3 className="text-lg font-semibold text-center mb-6">Prahar Timeline</h3>

      <div className="grid grid-cols-2 gap-4">
        {prahars.map((prahar) => {
          const Icon = prahar.icon;
          const isActive = normalizedPrahar === prahar.label;

          return (
            <div
              key={prahar.label}
              className={`p-4 rounded-2xl border transition-all duration-300
                ${isActive
                  ? "border-primary bg-primary/20 shadow-[0_0_25px_rgba(56,189,248,0.6)] scale-[1.03]"
                  : "border-border/30 bg-muted/10 opacity-70"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prahar.color} flex items-center justify-center mb-3
                  ${isActive ? "animate-pulse" : ""}`}
              >
                <Icon className="w-5 h-5 text-background" />
              </div>

              {/* Label + Time */}
              <h4 className="font-medium text-sm">{prahar.label}</h4>
              <p className="text-xs text-muted-foreground">{prahar.time}</p>

              {/* Description */}
              {(showAllDescriptions || isActive) && (
                <p className="text-xs text-primary/90 mt-2 break-words leading-snug">
                  {prahar.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PraharTimeline;
