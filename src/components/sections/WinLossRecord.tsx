"use client";

import { useState } from "react";
import { tournamentHistory, type DayResult } from "@/data/kirishima";

function ResultDot({ result, day }: { result: DayResult; day: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px]" style={{ color: "#2a4a6a" }}>{day}</span>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform hover:scale-110 ${
        result === "○" ? "hoshi-win" : result === "●" ? "hoshi-lose" : "hoshi-rest"
      }`}>
        {result}
      </span>
    </div>
  );
}

export default function WinLossRecord() {
  const [expanded, setExpanded] = useState<string | null>(tournamentHistory[0].basho);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>星取表</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>場所ごとの成績（新しい順）</p>
      </div>

      {/* ── 成績グラフバー ── */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <h3 className="font-bold mb-5" style={{ color: "#e8dfc8" }}>場所別成績グラフ</h3>
        <div className="flex items-end gap-3 h-36 overflow-x-auto pb-2">
          {[...tournamentHistory].reverse().map((t) => {
            const winPct = (t.wins / (t.wins + t.losses)) * 100;
            return (
              <div key={t.basho} className="flex flex-col items-center gap-1 flex-shrink-0 min-w-[52px]">
                <div className="relative w-10 h-28 rounded-lg overflow-hidden"
                  style={{ background: "#030e1f", border: "1px solid #0f3060" }}>
                  <div
                    className="absolute bottom-0 w-full rounded-b-lg transition-all duration-700"
                    style={{
                      height: `${winPct}%`,
                      background: t.champion
                        ? "linear-gradient(to top, #8b6914, #d4a017, #f0c840)"
                        : t.wins >= 11
                        ? "linear-gradient(to top, rgba(212,160,23,0.5), rgba(212,160,23,0.2))"
                        : t.wins < 8
                        ? "linear-gradient(to top, rgba(248,113,113,0.6), rgba(248,113,113,0.2))"
                        : "linear-gradient(to top, rgba(106,138,173,0.5), rgba(106,138,173,0.2))",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-black" style={{ color: "#e8dfc8" }}>{t.wins}</span>
                  </div>
                </div>
                <div className="text-[10px] text-center leading-tight" style={{ color: "#3a5a7a" }}>
                  {t.basho.replace("年", "/").replace("月", "")}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3">
          {[
            { style: { background: "linear-gradient(to right, #d4a017, #f0c840)" }, label: "優勝" },
            { style: { background: "rgba(212,160,23,0.4)" }, label: "二桁勝利" },
            { style: { background: "rgba(106,138,173,0.4)" }, label: "勝ち越し" },
            { style: { background: "rgba(248,113,113,0.4)" }, label: "負け越し" },
          ].map(({ style, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={style} />
              <span className="text-xs" style={{ color: "#3a5a7a" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 場所一覧 ── */}
      <div className="space-y-3">
        {tournamentHistory.map((t) => {
          const isOpen = expanded === t.basho;
          return (
            <div key={t.basho} className="rounded-2xl overflow-hidden transition-all"
              style={{ background: "#071a35", border: `1px solid ${isOpen ? "rgba(212,160,23,0.4)" : "#0f3060"}` }}>
              {/* ヘッダー */}
              <button
                onClick={() => setExpanded(isOpen ? null : t.basho)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left transition-colors"
                style={{ background: isOpen ? "rgba(212,160,23,0.05)" : "transparent" }}
              >
                {/* 勝敗数 */}
                <div className="flex items-baseline gap-1 flex-shrink-0 w-28">
                  <span className="text-2xl font-black"
                    style={{ color: t.wins >= 11 ? "#f0c840" : t.wins < 8 ? "#f87171" : "#e8dfc8" }}>
                    {t.wins}
                  </span>
                  <span className="text-sm" style={{ color: "#6a8aad" }}>勝</span>
                  <span className="text-xl font-bold ml-1" style={{ color: "#3a5a7a" }}>{t.losses}</span>
                  <span className="text-sm" style={{ color: "#6a8aad" }}>敗</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold" style={{ color: "#e8dfc8" }}>{t.basho} {t.location}</span>
                    {t.champion && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{ background: "rgba(212,160,23,0.2)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.4)" }}>
                        優勝
                      </span>
                    )}
                    {t.specialPrize?.filter((p) => p !== "優勝").map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded text-xs"
                        style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#3a5a7a" }}>{t.rank}</div>
                </div>

                {/* ミニドット */}
                <div className="hidden md:flex gap-0.5 items-center flex-shrink-0">
                  {t.results.map((r, i) => (
                    <span key={i} className="w-2 h-2 rounded-full"
                      style={{
                        background: r === "○" ? "rgba(74,222,128,0.6)" : r === "●" ? "rgba(248,113,113,0.6)" : "rgba(58,90,122,0.4)"
                      }} />
                  ))}
                </div>

                <span className="text-sm ml-2 flex-shrink-0" style={{ color: "#3a5a7a" }}>{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* 展開コンテンツ */}
              {isOpen && (
                <div className="px-6 pb-5 pt-4" style={{ borderTop: "1px solid #0f3060" }}>
                  <div className="flex flex-wrap gap-2">
                    {t.results.map((r, i) => (
                      <ResultDot key={i} result={r} day={i + 1} />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full hoshi-win" />
                      <span className="text-xs" style={{ color: "#6a8aad" }}>勝ち（○）</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full hoshi-lose" />
                      <span className="text-xs" style={{ color: "#6a8aad" }}>負け（●）</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
