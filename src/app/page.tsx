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
import DataAccuracy from "@/components/sections/DataAccuracy";

type Section =
  | "dashboard" | "profile" | "winloss" | "kimarite"
  | "news" | "promotion" | "gallery" | "stable" | "accuracy";

const sectionLabels: Record<Section, string> = {
  dashboard: "ダッシュボード",
  profile: "プロフィール",
  winloss: "星取表",
  kimarite: "決まり手分析",
  news: "最新ニュース",
  promotion: "昇進トラッカー",
  gallery: "名勝負ギャラリー",
  stable: "音羽山通信",
  accuracy: "データ精査",
};

function HamburgerIcon() {
  return (
    <div className="flex flex-col justify-center gap-[5px] w-6 h-6">
      <span className="block h-[2px] rounded" style={{ background: "#d4a017" }} />
      <span className="block h-[2px] rounded" style={{ background: "#d4a017" }} />
      <span className="block h-[2px] rounded" style={{ background: "#d4a017" }} />
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="relative w-6 h-6">
      <span className="absolute inset-0 flex items-center justify-center text-xl font-black"
        style={{ color: "#d4a017" }}>✕</span>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSectionChange(s: string) {
    setActiveSection(s as Section);
    setSidebarOpen(false);
  }

  function renderSection() {
    switch (activeSection) {
      case "dashboard":  return <Dashboard />;
      case "profile":    return <Profile />;
      case "winloss":    return <WinLossRecord />;
      case "kimarite":   return <KimariteAnalysis />;
      case "news":       return <LatestNews />;
      case "promotion":  return <PromotionTracker />;
      case "gallery":    return <FamousBouts />;
      case "stable":     return <StableNews />;
      case "accuracy":   return <DataAccuracy />;
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#030e1f" }}>

      {/* ── モバイルヘッダー（md未満のみ表示） ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-4 h-14"
        style={{ background: "#020a18", borderBottom: "1px solid #0f3060" }}>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{ background: "rgba(15,48,96,0.5)", border: "1px solid #0f3060" }}
          aria-label="メニューを開く"
        >
          <HamburgerIcon />
        </button>

        {/* 家紋風ロゴ */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #d4a017, #8b6914)" }}>
          <span className="text-black font-black text-sm select-none">霧</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-black text-sm truncate" style={{ color: "#e8dfc8" }}>霧島鐵力</div>
          <div className="text-[10px] truncate" style={{ color: "#6a8aad" }}>
            {sectionLabels[activeSection]}
          </div>
        </div>

        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: "rgba(212,160,23,0.15)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.3)" }}>
          東関脇
        </span>
      </header>

      {/* ── バックドロップ（モバイル・サイドバーオープン時） ── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── サイドバー ── */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── メインコンテンツ ── */}
      {/* モバイル: pt-14 でヘッダー分ずらす, md以上: ml-64 でサイドバー分ずらす */}
      <main className="md:ml-64 pt-14 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8 max-w-5xl">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
