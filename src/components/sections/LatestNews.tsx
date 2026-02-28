"use client";

import { useState } from "react";
import { news, type NewsItem } from "@/data/kirishima";

const categoryConfig: Record<NewsItem["category"], { label: string; bg: string; color: string }> = {
  成績:        { label: "成績",        bg: "rgba(59,130,246,0.15)",  color: "#60a5fa" },
  インタビュー: { label: "インタビュー", bg: "rgba(168,85,247,0.15)",  color: "#c084fc" },
  部屋:        { label: "部屋",        bg: "rgba(34,197,94,0.15)",   color: "#4ade80" },
  一般:        { label: "一般",        bg: "rgba(107,114,128,0.15)", color: "#9ca3af" },
};

export default function LatestNews() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<NewsItem["category"] | "すべて">("すべて");

  const categories: (NewsItem["category"] | "すべて")[] = ["すべて", "成績", "インタビュー", "部屋", "一般"];
  const filtered = filter === "すべて" ? news : news.filter((n) => n.category === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>最新ニュース</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>2026年3月場所直前 — 最新の話題</p>
      </div>

      {/* フィルタータブ */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className="px-4 py-1.5 rounded-full text-sm transition-all"
            style={
              filter === cat
                ? { background: "#d4a017", color: "#000", fontWeight: "700" }
                : { background: "#071a35", border: "1px solid #0f3060", color: "#6a8aad" }
            }>
            {cat}
          </button>
        ))}
      </div>

      {/* ニュース一覧 */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const cfg = categoryConfig[item.category];
          const isOpen = selected === item.id;
          return (
            <div key={item.id}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-200"
              style={{
                background: "#071a35",
                border: `1px solid ${isOpen ? "rgba(212,160,23,0.4)" : "#0f3060"}`,
              }}
              onClick={() => setSelected(isOpen ? null : item.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                    <span className="text-xs" style={{ color: "#2a4a6a" }}>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#e8dfc8" }}>{item.title}</h3>
                  {isOpen ? (
                    <p className="text-sm leading-relaxed" style={{ color: "#8aaad0" }}>{item.content}</p>
                  ) : (
                    <p className="text-sm line-clamp-2" style={{ color: "#3a5a7a" }}>{item.content}</p>
                  )}
                </div>
                <span className="text-sm flex-shrink-0 mt-1" style={{ color: "#3a5a7a" }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12" style={{ color: "#3a5a7a" }}>
          このカテゴリのニュースはありません
        </div>
      )}
    </div>
  );
}
