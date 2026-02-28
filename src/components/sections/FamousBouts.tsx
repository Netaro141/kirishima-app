"use client";

import { famousBouts } from "@/data/kirishima";

export default function FamousBouts() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>名勝負ギャラリー</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>霧島鐵力の印象的な取組を振り返る</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {famousBouts.map((bout) => (
          <div key={bout.id}
            className="rounded-2xl overflow-hidden transition-all duration-300 group"
            style={{ background: "#071a35", border: "1px solid #0f3060" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(212,160,23,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#0f3060")}
          >
            {/* ビジュアルヘッダー */}
            <div className="h-28 relative overflow-hidden flex items-center px-6 gap-4"
              style={{ background: "linear-gradient(135deg, #0c2448 0%, #071a35 100%)" }}>
              <div className="absolute inset-0 naname opacity-80" />
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)" }} />

              {/* VS ディスプレイ */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(212,160,23,0.2)", border: "1px solid rgba(212,160,23,0.4)" }}>
                    <span className="font-black" style={{ color: "#f0c840" }}>霧</span>
                  </div>
                  <div className="text-xs mt-1 font-bold" style={{ color: "#f0c840" }}>霧島</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs" style={{ color: "#2a4a6a" }}>VS</span>
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black ${
                    bout.result === "勝" ? "hoshi-win" : "hoshi-lose"
                  }`}>
                    {bout.result}
                  </span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(15,48,96,0.5)", border: "1px solid #0f3060" }}>
                    <span className="font-black" style={{ color: "#6a8aad" }}>{bout.opponent[0]}</span>
                  </div>
                  <div className="text-xs mt-1 font-bold" style={{ color: "#8aaad0" }}>{bout.opponent}</div>
                </div>
              </div>

              <div className="ml-auto relative z-10 text-right">
                <div className="text-xs font-bold" style={{ color: "#d4a017" }}>{bout.kimarite}</div>
                <div className="text-xs mt-0.5" style={{ color: "#3a5a7a" }}>{bout.opponentRank}</div>
              </div>
            </div>

            {/* コンテンツ */}
            <div className="p-5">
              <div className="text-xs font-mono mb-2" style={{ color: "#3a5a7a" }}>{bout.basho}</div>
              <h3 className="font-bold text-base mb-3" style={{ color: "#e8dfc8" }}>
                {bout.opponent}戦 — {bout.kimarite}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#8aaad0" }}>{bout.description}</p>
              <div className="flex items-start gap-2 p-3 rounded-xl"
                style={{ background: "rgba(212,160,23,0.07)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: "#d4a017" }}>意義</span>
                <span className="text-xs" style={{ color: "#c0d8f0" }}>{bout.significance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 統計バー */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <h3 className="font-bold mb-4" style={{ color: "#e8dfc8" }}>名勝負統計</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-4xl font-black" style={{ color: "#4ade80" }}>
              {famousBouts.filter((b) => b.result === "勝").length}
            </div>
            <div className="text-xs mt-1" style={{ color: "#3a5a7a" }}>勝利</div>
          </div>
          <div>
            <div className="text-4xl font-black" style={{ color: "#f87171" }}>
              {famousBouts.filter((b) => b.result === "負").length}
            </div>
            <div className="text-xs mt-1" style={{ color: "#3a5a7a" }}>敗戦</div>
          </div>
          <div>
            <div className="text-4xl font-black" style={{ color: "#f0c840" }}>{famousBouts.length}</div>
            <div className="text-xs mt-1" style={{ color: "#3a5a7a" }}>掲載取組数</div>
          </div>
        </div>
      </div>
    </div>
  );
}
