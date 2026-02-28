"use client";

import { tournamentHistory, profile, promotionTrackerData, OZEKI_RETURN_THRESHOLD, news } from "@/data/kirishima";

function StatCard({
  label, value, sub, accent = false,
}: {
  label: string; value: string; sub?: string; accent?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={
        accent
          ? { background: "linear-gradient(135deg, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.05) 100%)", border: "1px solid rgba(212,160,23,0.35)" }
          : { background: "#071a35", border: "1px solid #0f3060" }
      }
    >
      {/* 背景の薄い漢字ウォーターマーク */}
      <div className="absolute -right-2 -bottom-3 text-7xl font-black select-none pointer-events-none"
        style={{ color: accent ? "rgba(212,160,23,0.06)" : "rgba(15,48,96,0.5)" }}>
        {value.replace(/[^0-9勝敗]/g, "").slice(0, 2)}
      </div>
      <div className="text-xs uppercase tracking-widest mb-2 relative" style={{ color: "#3a5a7a" }}>{label}</div>
      <div className="text-3xl font-black relative" style={{ color: accent ? "#f0c840" : "#e8dfc8" }}>{value}</div>
      {sub && <div className="text-xs mt-1 relative" style={{ color: "#3a5a7a" }}>{sub}</div>}
    </div>
  );
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  成績:        { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa" },
  インタビュー: { bg: "rgba(168,85,247,0.15)",  text: "#c084fc" },
  部屋:        { bg: "rgba(34,197,94,0.15)",   text: "#4ade80" },
  一般:        { bg: "rgba(107,114,128,0.15)", text: "#9ca3af" },
};

export default function Dashboard() {
  const latest = tournamentHistory[0];
  const completedWins = promotionTrackerData.filter((d) => !d.upcoming).reduce((s, d) => s + d.wins, 0);
  const remaining = Math.max(OZEKI_RETURN_THRESHOLD - completedWins, 0);
  const progress = Math.min((completedWins / OZEKI_RETURN_THRESHOLD) * 100, 100);

  return (
    <div className="space-y-8">
      {/* ページタイトル */}
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>
          ダッシュボード
        </h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>2026年3月春場所直前 — 最新情報</p>
      </div>

      {/* ── ヒーローカード ── */}
      <div className="rounded-2xl p-7 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c2448 0%, #071a35 50%, #030e1f 100%)", border: "1px solid #1a4a80" }}>
        {/* 背景パターン */}
        <div className="absolute inset-0 naname opacity-100" />
        {/* 金のグラデーション光 */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 flex items-center gap-6">
          {/* 家紋風アバター */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl"
            style={{ background: "linear-gradient(135deg, #d4a017 0%, #8b6914 60%, #f0c840 100%)", boxShadow: "0 0 24px rgba(212,160,23,0.4)" }}>
            <span className="text-4xl font-black text-black select-none">霧</span>
          </div>

          <div className="flex-1">
            <div className="text-xs font-bold tracking-[0.25em] mb-1" style={{ color: "#d4a017" }}>現役力士 — 音羽山部屋</div>
            <h2 className="text-4xl font-black tracking-wide" style={{ color: "#e8dfc8" }}>{profile.shikona}</h2>
            <p className="text-sm mt-1" style={{ color: "#6a8aad" }}>{profile.shikonaRuby} / {profile.shikonaEn}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(212,160,23,0.2)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.4)" }}>
                {profile.currentRank}
              </span>
              <span className="px-3 py-1 rounded-full text-xs"
                style={{ background: "rgba(15,48,96,0.6)", color: "#6a8aad", border: "1px solid #0f3060" }}>
                最高位：{profile.highestRank}
              </span>
              <span className="px-3 py-1 rounded-full text-xs"
                style={{ background: "rgba(15,48,96,0.6)", color: "#6a8aad", border: "1px solid #0f3060" }}>
                {profile.stable}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── スタッツグリッド ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="直近場所" value={`${latest.wins}勝${latest.losses}敗`} sub={`${latest.basho} ${latest.location}`} accent />
        <StatCard label="現在の番付" value={profile.currentRank} sub={profile.stable} />
        <StatCard label="最高位" value={profile.highestRank} sub={`${profile.ozekiPromotion}昇進`} />
        <StatCard label="大関まであと" value={`${remaining}勝`} sub={`3場所合計 ${completedWins}/${OZEKI_RETURN_THRESHOLD}`} accent />
      </div>

      {/* ── 大関復帰プログレス ── */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-black text-lg" style={{ color: "#e8dfc8" }}>大関復帰トラッカー</h3>
            <p className="text-xs mt-0.5" style={{ color: "#3a5a7a" }}>
              三役3場所合計{OZEKI_RETURN_THRESHOLD}勝が復帰の目安
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black" style={{ color: "#f0c840" }}>{completedWins}</div>
            <div className="text-xs" style={{ color: "#3a5a7a" }}>/ {OZEKI_RETURN_THRESHOLD} 勝</div>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full rounded-full h-4 mb-1 overflow-hidden" style={{ background: "#0c2448" }}>
          <div
            className="h-full rounded-full relative overflow-hidden transition-all duration-1000"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #8b6914 0%, #d4a017 50%, #f0c840 100%)",
              boxShadow: "0 0 12px rgba(212,160,23,0.5)",
            }}
          >
            <div className="absolute inset-0 naname opacity-40" />
          </div>
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: "#2a4a6a" }}>
          <span>0</span>
          <span style={{ color: "#d4a017" }}>目標 {OZEKI_RETURN_THRESHOLD}勝</span>
        </div>

        {/* 3場所の内訳 */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {promotionTrackerData.map((d, i) => (
            <div key={d.basho} className="rounded-xl p-4 text-center"
              style={
                d.upcoming
                  ? { background: "rgba(212,160,23,0.08)", border: "1px dashed rgba(212,160,23,0.4)" }
                  : { background: "#0c2448", border: "1px solid #0f3060" }
              }>
              <div className="text-xs mb-2" style={{ color: "#3a5a7a" }}>{i + 1}場所目</div>
              <div className="text-3xl font-black mb-1"
                style={{ color: d.upcoming ? "#3a5a7a" : "#f0c840" }}>
                {d.upcoming ? "?" : d.wins}
              </div>
              <div className="text-xs" style={{ color: "#3a5a7a" }}>
                {d.upcoming ? (
                  <span style={{ color: "#d4a017" }}>開催前（目標11+）</span>
                ) : (
                  `${d.wins}勝 ✓`
                )}
              </div>
              <div className="text-[10px] mt-1 truncate" style={{ color: "#2a4a6a" }}>{d.basho}</div>
            </div>
          ))}
        </div>

        {/* メッセージ */}
        <div className="mt-4 rounded-xl px-4 py-3"
          style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)" }}>
          <p className="text-sm" style={{ color: "#f0c840" }}>
            3月春場所で <span className="font-black text-xl">{remaining}</span> 勝以上で大関復帰がほぼ確実！
          </p>
        </div>
      </div>

      {/* ── 直近星取表 + 最新ニュース ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 直近星取表 */}
        <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
          <h3 className="font-bold mb-1" style={{ color: "#e8dfc8" }}>
            直近の星取表
          </h3>
          <p className="text-xs mb-4" style={{ color: "#3a5a7a" }}>
            {latest.basho} {latest.location} — {latest.rank}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {latest.results.map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[9px]" style={{ color: "#2a4a6a" }}>{i + 1}</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform hover:scale-110 ${
                    r === "○" ? "hoshi-win" : r === "●" ? "hoshi-lose" : "hoshi-rest"
                  }`}
                >
                  {r}
                </span>
              </div>
            ))}
          </div>
          {latest.specialPrize && (
            <div className="flex gap-2 mt-3">
              {latest.specialPrize.map((p) => (
                <span key={p} className="px-2 py-0.5 rounded text-xs font-bold"
                  style={{ background: "rgba(212,160,23,0.18)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.35)" }}>
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 最新ニュース */}
        <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
          <h3 className="font-bold mb-4" style={{ color: "#e8dfc8" }}>最新ニュース</h3>
          <div className="space-y-3">
            {news.slice(0, 3).map((item) => {
              const cfg = categoryColors[item.category] ?? categoryColors["一般"];
              return (
                <div key={item.id} className="pb-3 border-b last:border-0 last:pb-0"
                  style={{ borderColor: "#0f3060" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: cfg.bg, color: cfg.text }}>
                      {item.category}
                    </span>
                    <span className="text-xs" style={{ color: "#2a4a6a" }}>{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#c0d8f0" }}>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
