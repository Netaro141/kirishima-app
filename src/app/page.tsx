"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/sections/Dashboard";
import Profile from "@/components/sections/Profile";
import WinLossRecord from "@/components/sections/WinLossRecord";
import KimariteAnalysis from "@/components/sections/KimariteAnalysis";
import LatestNews from "@/components/sections/LatestNews";
import PromotionTracker from "@/components/sections/PromotionTracker";
import FamousBouts from "@/components/sections/FamousBouts";
import StableNews from "@/components/sections/StableNews";

type Section =
  | "dashboard"
  | "profile"
  | "winloss"
  | "kimarite"
  | "news"
  | "promotion"
  | "gallery"
  | "stable";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  function renderSection() {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "winloss":
        return <WinLossRecord />;
      case "kimarite":
        return <KimariteAnalysis />;
      case "news":
        return <LatestNews />;
      case "promotion":
        return <PromotionTracker />;
      case "gallery":
        return <FamousBouts />;
      case "stable":
        return <StableNews />;
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a14]">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={(s) => setActiveSection(s as Section)}
      />
      <main className="ml-64 flex-1 p-8 min-h-screen max-w-5xl">
        {renderSection()}
      </main>
    </div>
  );
}
