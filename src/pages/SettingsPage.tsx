import { Settings as SettingsIcon, User, Shield, Bell, Palette, Database } from 'lucide-react';

const sections = [
  { label: 'Profile', desc: 'Manage your admin account details', icon: User },
  { label: 'Security', desc: 'Password, 2FA, and session management', icon: Shield },
  { label: 'Notifications', desc: 'Configure alert preferences', icon: Bell },
  { label: 'Appearance', desc: 'Theme and display settings', icon: Palette },
  { label: 'Data & API', desc: 'API keys and data export options', icon: Database },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">System configuration</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.label}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg text-left hover:border-cyan-500/40 transition-colors group"
            >
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-3">
                <Icon size={18} className="text-cyan-400" />
              </div>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                {section.label}
              </p>
              <p className="text-xs text-slate-400 mt-1">{section.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
