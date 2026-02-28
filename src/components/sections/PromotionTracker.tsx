"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Cell, LabelList,
} from "recharts";
import { promotionTrackerData, OZEKI_RETURN_THRESHOLD } from "@/data/kirishima";

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: { basho: string; wins: number; rank: string; upcoming?: boolean } }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    if (d.upcoming) return (
      <div className="rounded-xl px-4 py-3 shadow-xl"
        style={{ background: "#0c2448", border: "1px solid rgba(212,160,23,0.4)" }}>
        <p className="text-sm font-bold" style={{ color: "#f0c840" }}>{d.basho}</p>
        <p className="text-xs mt-1" style={{ color: "#d4a017" }}>開催前</p>
        <p className="text-xs" style={{ color: "#6a8aad" }}>{d.rank}</p>
      </div>
    );
    return (
      <div className="rounded-xl px-4 py-3 shadow-xl"
        style={{ background: "#0c2448", border: "1px solid #1a4a80" }}>
        <p className="text-xs mb-1" style={{ color: "#6a8aad" }}>{d.basho}</p>
        <p className="text-xl font-black" style={{ color: "#f0c840" }}>{d.wins} 勝</p>
        <p className="text-xs mt-1" style={{ color: "#d4a017" }}>{d.rank}</p>
      </div>
    );
  }
  return null;
}

export default function PromotionTracker() {
  const completedData = promotionTrackerData.filter((d) => !d.upcoming);
  const completedWins = completedData.reduce((s, d) => s + d.wins, 0);
  const remaining = Math.max(OZEKI_RETURN_THRESHOLD - completedWins, 0);
  const progress = Math.min((completedWins / OZEKI_RETURN_THRESHOLD) * 100, 100);

  // グラフ用データ（未開催場所は目標値を点線表示）
  const chartData = promotionTrackerData.map((d) => ({
    ...d,
    displayWins: d.upcoming ? 0 : d.wins,
    targetLine: d.upcoming ? 11 : null,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>昇進トラッカー</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>大関復帰へ向けた直近3場所の成績推移</p>
      </div>

      {/* ── 大関復帰カウントダウンヒーロー ── */}
      <div className="rounded-2xl p-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c2448 0%, #071a35 60%, #030e1f 100%)", border: "1px solid rgba(212,160,23,0.4)" }}>
        <div className="absolute inset-0 naname opacity-60" />
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] mb-2" style={{ color: "#d4a017" }}>
                大関復帰条件 — 三役3場所合計{OZEKI_RETURN_THRESHOLD}勝
              </div>
              <h2 className="text-2xl font-black" style={{ color: "#e8dfc8" }}>3場所合計勝ち星</h2>
            </div>
            <div className="text-right">
              <div className="text-6xl font-black leading-none" style={{ color: "#f0c840" }}>
                {completedWins}
              </div>
              <div className="text-sm mt-1" style={{ color: "#6a8aad" }}>/ {OZEKI_RETURN_THRESHOLD} 勝</div>
            </div>
          </div>

          {/* プログレスバー（和風） */}
          <div className="w-full rounded-full h-5 overflow-hidden relative"
            style={{ background: "#030e1f", border: "1px solid #0f3060" }}>
            <div
              className="h-full rounded-full relative overflow-hidden transition-all duration-1000"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #8b6914 0%, #d4a017 40%, #f0c840 80%, #d4a017 100%)",
                boxShadow: "0 0 16px rgba(212,160,23,0.6)",
              }}
            >
              <div className="absolute inset-0 naname opacity-30" />
            </div>
            {/* 目標マーカー */}
            <div
              className="absolute top-0 bottom-0 w-0.5"
              style={{ left: "100%", transform: "translateX(-1px)", background: "rgba(240,200,64,0.6)" }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span style={{ color: "#2a4a6a" }}>0</span>
            <span style={{ color: "#d4a017" }}>目標 {OZEKI_RETURN_THRESHOLD}勝</span>
          </div>

          {/* カウントダウンバナー */}
          <div className="mt-5 rounded-xl px-5 py-4 flex items-center justify-between"
            style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.35)" }}>
            <div>
              <p className="text-xs" style={{ color: "#d4a017" }}>2場所完了 — 2026年3月春場所で…</p>
              <p className="text-lg font-black mt-0.5" style={{ color: "#f0c840" }}>
                あと <span className="text-3xl">{remaining}</span> 勝で大関復帰条件達成！
              </p>
            </div>
            <div className="text-5xl font-black" style={{ color: "rgba(212,160,23,0.25)" }}>{remaining}</div>
          </div>
        </div>
      </div>

      {/* ── 棒グラフ ── */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <h3 className="font-bold mb-6" style={{ color: "#e8dfc8" }}>場所別 勝ち星グラフ</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 24, right: 24, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3060" vertical={false} />
              <XAxis
                dataKey="basho"
                tick={{ fill: "#6a8aad", fontSize: 11 }}
                axisLine={{ stroke: "#0f3060" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 15]}
                tick={{ fill: "#3a5a7a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212,160,23,0.05)" }} />
              <ReferenceLine
                y={11}
                stroke="#d4a017"
                strokeDasharray="6 3"
                strokeWidth={1.5}
                label={{ value: "目標11勝", fill: "#d4a017", fontSize: 10, position: "insideTopRight" }}
              />
              <Bar dataKey="displayWins" radius={[8, 8, 0, 0]} maxBarSize={80}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.upcoming ? "rgba(58,90,122,0.3)" : entry.wins >= 11 ? "#d4a017" : "#4a7aaa"}
                    stroke={entry.upcoming ? "#3a5a7a" : "none"}
                    strokeDasharray={entry.upcoming ? "4 2" : undefined}
                  />
                ))}
                <LabelList
                  dataKey="displayWins"
                  position="top"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any) => (v === 0 ? "?" : `${v}`)}
                  style={{ fill: "#f0c840", fontSize: 14, fontWeight: "bold" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3">
          {[
            { color: "#d4a017", label: "11勝以上" },
            { color: "#4a7aaa", label: "10勝以下" },
            { color: "rgba(58,90,122,0.4)", label: "開催前（目標）", dashed: true },
          ].map(({ color, label, dashed }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-4 h-3 rounded-sm flex-shrink-0"
                style={{ background: color, border: dashed ? "1px dashed #3a5a7a" : "none" }} />
              <span className="text-xs" style={{ color: "#3a5a7a" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3場所カード ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {promotionTrackerData.map((d, i) => (
          <div key={d.basho} className="rounded-2xl p-5 relative overflow-hidden"
            style={
              d.upcoming
                ? { background: "rgba(212,160,23,0.06)", border: "1px dashed rgba(212,160,23,0.4)" }
                : { background: "#071a35", border: "1px solid #0f3060" }
            }>
            <div className="text-xs mb-1" style={{ color: "#3a5a7a" }}>{i + 1}場所目</div>
            <div className="font-semibold text-sm mb-3 leading-tight" style={{ color: "#6a8aad" }}>{d.basho}</div>
            {d.upcoming ? (
              <>
                <div className="text-5xl font-black mb-1" style={{ color: "rgba(212,160,23,0.35)" }}>?</div>
                <div className="text-xs font-bold" style={{ color: "#d4a017" }}>開催前</div>
                <div className="mt-2 text-xs rounded-lg px-3 py-2"
                  style={{ background: "rgba(212,160,23,0.1)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.25)" }}>
                  11勝以上で条件達成！
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl font-black mb-1" style={{ color: "#f0c840" }}>{d.wins}</div>
                <div className="text-xs" style={{ color: "#3a5a7a" }}>勝 / 15</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80" }} />
                  <span className="text-xs" style={{ color: "#4ade80" }}>達成</span>
                </div>
              </>
            )}
            <div className="text-[10px] mt-2 truncate" style={{ color: "#2a4a6a" }}>{d.rank}</div>
          </div>
        ))}
      </div>

      {/* ── 解説 ── */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "#05111f", border: "1px solid #0a2040" }}>
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
          style={{ background: "linear-gradient(to bottom, #d4a017, transparent)" }} />
        <h3 className="font-bold mb-3 ml-3" style={{ color: "#d4a017" }}>大関復帰条件について</h3>
        <p className="text-sm leading-relaxed ml-3" style={{ color: "#8aaad0" }}>
          大相撲では大関陥落後に再昇進（大関復帰）するためには、通常、
          <span style={{ color: "#e8dfc8", fontWeight: "bold" }}>三役（関脇・小結）での3場所合計33勝以上</span>
          が目安とされています。<br /><br />
          霧島鐵力は2025年11月九州場所（11勝）・2026年1月初場所（11勝）と2場所連続2桁勝利を記録し、
          合計<span style={{ color: "#f0c840", fontWeight: "bold" }}>22勝</span>に到達。
          3月春場所で<span style={{ color: "#f0c840", fontWeight: "bold" }}>{remaining}勝以上</span>を挙げれば、
          大関復帰が現実となります。
        </p>
      </div>
    </div>
  );
}
