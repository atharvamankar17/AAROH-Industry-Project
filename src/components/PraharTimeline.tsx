import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

const prahars = [
  { icon: Sunrise, label: "Morning", time: "6 AM - 12 PM", color: "from-amber-400 to-orange-500", active: false },
  { icon: Sun, label: "Afternoon", time: "12 PM - 6 PM", color: "from-yellow-400 to-amber-500", active: true },
  { icon: Sunset, label: "Evening", time: "6 PM - 12 AM", color: "from-purple-500 to-pink-500", active: false },
  { icon: Moon, label: "Night", time: "12 AM - 6 AM", color: "from-indigo-500 to-purple-600", active: false },
];

const PraharTimeline = () => {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 animate-fade-in">
      <h3 className="text-lg font-playfair font-semibold text-foreground mb-6 text-center">
        Prahar Timeline
      </h3>

      {/* Circular Clock */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-border/30" />
        
        {/* Quadrants */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
          {prahars.map((prahar, index) => {
            const startAngle = index * 90;
            const endAngle = (index + 1) * 90;
            const largeArc = 0;
            
            const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
            
            return (
              <path
                key={prahar.label}
                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                className={`transition-all duration-500 ${
                  prahar.active 
                    ? 'fill-primary/30 stroke-primary stroke-2' 
                    : 'fill-muted/20 stroke-border/50 stroke-1'
                }`}
              />
            );
          })}
        </svg>

        {/* Center circle */}
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/20 to-pink-glow/20 border border-primary/30 flex items-center justify-center">
          <Sun className="w-8 h-8 text-primary animate-pulse-glow" />
        </div>

        {/* Time labels */}
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">12</span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">6</span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">9</span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">3</span>
      </div>

      {/* Prahar Cards */}
      <div className="grid grid-cols-2 gap-3">
        {prahars.map((prahar) => {
          const Icon = prahar.icon;
          return (
            <div
              key={prahar.label}
              className={`
                p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                ${prahar.active 
                  ? 'glass border-primary/40 glow-cyan' 
                  : 'bg-muted/20 border-border/30 hover:bg-muted/40'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prahar.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-background" />
              </div>
              <h4 className="font-medium text-foreground text-sm">{prahar.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{prahar.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PraharTimeline;
