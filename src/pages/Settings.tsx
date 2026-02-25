import { useState } from "react";
import {
  Sun,
  Upload,
  Download,
  Lock,
  Database,
  RefreshCw
} from "lucide-react";
import { cn } from "../lib/utils";
import SettingsSection from "../components/settings/SettingsSection";
import SuccessAlert from "../components/settings/SuccessAlert";

interface SettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function Settings({ theme, onThemeChange }: SettingsProps) {

  const isDarkMode = theme === "dark";
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleTheme = () => {
    onThemeChange(isDarkMode ? "light" : "dark");
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const sections = [
    {
      title: "Appearance",
      description: "Customize the dashboard look and feel.",
      icon: Sun,
      settings: [
        {
          label: "Dark Mode",
          description: "Use the high-contrast dark security theme.",
          action: (
            <button
              onClick={toggleTheme}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                isDarkMode ? "bg-[#00f2ff]" : "bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          )
        }
      ]
    },
    {
      title: "Data Management",
      description: "Backup and restore your blocking rules.",
      icon: Database,
      settings: [
        {
          label: "Export Rules",
          description: "Download all rules as a JSON file.",
          action: (
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
            >
              {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              {isExporting ? "Exporting..." : "Export JSON"}
            </button>
          )
        },
        {
          label: "Import Rules",
          description: "Upload rules from a previously exported file.",
          action: (
            <button
              onClick={handleImport}
              disabled={isImporting}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
            >
              {isImporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {isImporting ? "Importing..." : "Upload File"}
            </button>
          )
        }
      ]
    },
    {
      title: "Security & Privacy",
      description: "Manage admin access and system security.",
      icon: Lock,
      settings: [
        {
          label: "Admin Password",
          description: "Change the password for the dashboard.",
          action: (
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10">
              Update Password
            </button>
          )
        },
        {
          label: "Two-Factor Auth",
          description: "Add an extra layer of security to your account.",
          action: (
            <button className="px-4 py-2 bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#00f2ff] rounded-xl text-xs font-bold hover:bg-[#00f2ff]/20">
              Enable 2FA
            </button>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl space-y-8">

      {showSuccess && <SuccessAlert />}

      {sections.map((section, i) => (
        <SettingsSection key={i} section={section} />
      ))}

      <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-red-400 font-semibold">Danger Zone</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Reset all rules and devices to factory defaults.
          </p>
        </div>

        <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500/20">
          Reset System
        </button>
      </div>
    </div>
  );
}