import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  Music,
  Clock,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Heart, label: "Mood Board", path: "/dashboard/mood" },
  { icon: Music, label: "Raaga Song Recommendations", path: "/dashboard/player" },
  { icon: Clock, label: "Prahar Timeline", path: "/dashboard/timeline" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen glass-strong border-r border-border/30 transition-all duration-300 fixed left-0 top-0 z-40",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-glow flex items-center justify-center glow-cyan shrink-0">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          {!collapsed && (
            <span className="text-xl font-playfair font-bold text-gradient">
              SwarPrahar
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-primary/20 text-primary glow-cyan border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="m-4 p-3 rounded-xl hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30 px-2 py-2">
        <ul className="flex justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label.split(" ")[0]}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default AppSidebar;
