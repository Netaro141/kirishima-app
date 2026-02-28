"use client";

import { stableNews, type StableNewsItem } from "@/data/kirishima";

const typeConfig: Record<StableNewsItem["type"], { label: string; color: string; bg: string }> = {
  稽古: { label: "稽古",  color: "#fb923c", bg: "rgba(251,146,60,0.15)"  },
  師匠: { label: "師匠",  color: "#f0c840", bg: "rgba(212,160,23,0.15)"  },
  部屋員: { label: "部屋員", color: "#60a5fa", bg: "rgba(96,165,250,0.15)" },
  日常: { label: "日常",  color: "#4ade80", bg: "rgba(74,222,128,0.15)"  },
};

export default function StableNews() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>音羽山通信</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>師匠とのエピソードや音羽山部屋の日常</p>
      </div>

      {/* 部屋紹介カード */}
      <div className="rounded-2xl p-6 flex gap-5 items-start relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c2448 0%, #071a35 100%)", border: "1px solid rgba(212,160,23,0.3)" }}>
        <div className="absolute inset-0 seigaiha opacity-70" />
        <div className="absolute inset-0 naname opacity-40" />
        <div className="relative z-10 flex gap-5 items-start">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
            style={{ background: "linear-gradient(135deg, #d4a017, #8b6914)", boxShadow: "0 0 16px rgba(212,160,23,0.3)" }}>
            <span className="text-2xl font-black text-black select-none">音</span>
          </div>
          <div>
            <h2 className="font-black text-lg" style={{ color: "#e8dfc8" }}>音羽山部屋</h2>
            <p className="text-sm mt-0.5" style={{ color: "#6a8aad" }}>師匠：音羽山親方（元横綱・霧島）</p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#8aaad0" }}>
              音羽山部屋は元横綱・霧島が師匠を務める部屋。霧島鐵力は師匠から同じ四股名「霧島」を受け継ぎ、
              技術的な相撲を磨いてきた。師弟の絆は深く、「大関時代以上の強さを持っている」と師匠も評する。
            </p>
          </div>
        </div>
      </div>

      {/* タイムライン */}
      <div className="space-y-2">
        <h3 className="font-bold" style={{ color: "#e8dfc8" }}>最新レポート</h3>
        <div className="space-y-0">
          {stableNews.map((item, idx) => {
            const cfg = typeConfig[item.type];
            return (
              <div key={item.id} className="flex gap-4">
                {/* タイムライン軸 */}
                <div className="flex flex-col items-center flex-shrink-0 pt-2">
                  <div className="w-3 h-3 rounded-full z-10"
                    style={{
                      background: idx === 0 ? "#d4a017" : "#0f3060",
                      border: `2px solid ${idx === 0 ? "#f0c840" : "#071a35"}`,
                      boxShadow: idx === 0 ? "0 0 8px rgba(212,160,23,0.5)" : "none",
                    }} />
                  {idx < stableNews.length - 1 && (
                    <div className="w-px flex-1 mt-1 mb-0"
                      style={{ background: "linear-gradient(to bottom, #0f3060, transparent)", minHeight: "2rem" }} />
                  )}
                </div>

                {/* カード */}
                <div className="flex-1 rounded-2xl p-5 mb-4"
                  style={{
                    background: "#071a35",
                    border: `1px solid ${idx === 0 ? "rgba(212,160,23,0.35)" : "#0f3060"}`,
                  }}>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded font-bold"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                    <span className="text-xs" style={{ color: "#2a4a6a" }}>{item.date}</span>
                    {idx === 0 && (
                      <span className="ml-auto px-2 py-0.5 rounded text-xs font-bold"
                        style={{ background: "rgba(212,160,23,0.2)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.35)" }}>
                        最新
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-base mb-2" style={{ color: "#e8dfc8" }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#8aaad0" }}>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 師匠の名言 */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "#05111f", border: "1px solid #0a2040" }}>
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
          style={{ background: "linear-gradient(to bottom, #d4a017, transparent)" }} />
        <div className="text-xs font-bold tracking-widest uppercase mb-4 ml-4" style={{ color: "#d4a017" }}>
          師匠より — 2026年春場所直前
        </div>
        <blockquote className="text-base leading-relaxed italic ml-4 pl-4"
          style={{ color: "#c0d8f0", borderLeft: "3px solid rgba(212,160,23,0.5)" }}>
          「2場所連続11勝は、本物の自信から来ている。技も体も大関時代以上かもしれない。
          今場所は自然体で相撲を取れば結果はついてくる。機は熟した。自信を持って土俵に上がれ。」
        </blockquote>
        <div className="mt-4 text-xs text-right" style={{ color: "#3a5a7a" }}>
          — 音羽山親方（元横綱・霧島）
        </div>
      </div>
    </div>
  );
}
