import { Music, Music2, Music3, Music4 } from "lucide-react";

const FloatingNotes = () => {
  const notes = [
    { icon: Music, delay: "0s", duration: "6s", left: "10%", top: "20%" },
    { icon: Music2, delay: "1s", duration: "8s", left: "80%", top: "15%" },
    { icon: Music3, delay: "2s", duration: "7s", left: "20%", top: "70%" },
    { icon: Music4, delay: "0.5s", duration: "9s", left: "70%", top: "60%" },
    { icon: Music, delay: "3s", duration: "6s", left: "50%", top: "40%" },
    { icon: Music2, delay: "1.5s", duration: "8s", left: "90%", top: "80%" },
    { icon: Music3, delay: "2.5s", duration: "7s", left: "5%", top: "50%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {notes.map((note, index) => {
        const Icon = note.icon;
        return (
          <div
            key={index}
            className="absolute text-primary/10 animate-float"
            style={{
              left: note.left,
              top: note.top,
              animationDelay: note.delay,
              animationDuration: note.duration,
            }}
          >
            <Icon size={24 + index * 4} />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingNotes;
