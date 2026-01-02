import { Search, Play, Pause, SkipForward } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";


const TopBar = () => {
  const { user } = useUser();

  return (
    <header className="glass-strong border-b border-border/30 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        {/* TagLine */}
        <div className="p-3.5 flex items-center gap-3">
            <span className="text-xl font-playfair font-bold text-gradient">
              Where Swaras meet Time
            </span>
        </div>


      {/* User Info + Avatar */}
      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden md:block text-sm text-muted-foreground">
            Welcome,{" "}
            <span className="text-primary font-medium">
              {user.firstName || user.username}
            </span>
          </span>
        )}

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "w-10 h-10 border border-border/30 hover:border-primary/50 transition-all",
            },
          }}
        />
      </div>
    </header>
  );
};

export default TopBar;
