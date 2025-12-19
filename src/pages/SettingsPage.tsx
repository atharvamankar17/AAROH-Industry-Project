import { Bell, Moon, Volume2, User, Shield, HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const settingsGroups = [
  {
    title: "Appearance",
    items: [
      { icon: Moon, label: "Dark Mode", description: "Enable dark theme", hasSwitch: true, enabled: true },
    ],
  },
  {
    title: "Audio",
    items: [
      { icon: Volume2, label: "Background Audio", description: "Continue playing when app is minimized", hasSwitch: true, enabled: true },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Prahar Reminders", description: "Get notified when prahar changes", hasSwitch: true, enabled: false },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", description: "Manage your profile settings" },
      { icon: Shield, label: "Privacy", description: "Control your privacy settings" },
      { icon: HelpCircle, label: "Help & Support", description: "Get help or send feedback" },
    ],
  },
];

const SettingsPage = () => {
  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-playfair font-bold text-gradient mb-2">Settings</h2>
        <p className="text-muted-foreground">Customize your Prahar experience</p>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title} className="glass-strong rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              {group.title}
            </h3>
            <div className="space-y-4">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.label}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {item.hasSwitch && (
                      <Switch defaultChecked={item.enabled} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
