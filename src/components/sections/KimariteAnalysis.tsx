"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { kimariteData } from "@/data/kirishima";

const PALETTE = ["#d4a017", "#f0c840", "#6a8aad", "#4ade80", "#c084fc", "#38bdf8", "#fb923c", "#9ca3af"];

interface TooltipProps {
  active?: boolean;
  payload?: { payload: { technique: string; count: number; percentage: number } }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl px-4 py-3 shadow-xl"
        style={{ background: "#0c2448", border: "1px solid #1a4a80" }}>
        <p className="font-black text-base" style={{ color: "#e8dfc8" }}>{d.technique}</p>
        <p className="text-sm" style={{ color: "#f0c840" }}>{d.count} 回</p>
        <p className="text-xs" style={{ color: "#6a8aad" }}>{d.percentage}%</p>
      </div>
    );
  }
  return null;
}

export default function KimariteAnalysis() {
  const total = kimariteData.reduce((s, d) => s + d.count, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>決まり手分析</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>霧島鐵力が得意とする決まり手の統計</p>
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 text-center" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "#3a5a7a" }}>総勝利数</div>
          <div className="text-4xl font-black" style={{ color: "#e8dfc8" }}>{total}</div>
          <div className="text-xs mt-1" style={{ color: "#2a4a6a" }}>記録対象</div>
        </div>
        <div className="rounded-2xl p-5 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.05) 100%)", border: "1px solid rgba(212,160,23,0.35)" }}>
          <div className="absolute inset-0 kikko" />
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6a8aad" }}>最多決まり手</div>
            <div className="text-xl font-black" style={{ color: "#f0c840" }}>{kimariteData[0].technique}</div>
            <div className="text-xs mt-1" style={{ color: "#d4a017" }}>{kimariteData[0].count}回 / {kimariteData[0].percentage}%</div>
          </div>
        </div>
        <div className="rounded-2xl p-5 text-center" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "#3a5a7a" }}>技の種類</div>
          <div className="text-4xl font-black" style={{ color: "#e8dfc8" }}>{kimariteData.length}</div>
          <div className="text-xs mt-1" style={{ color: "#2a4a6a" }}>異なる決まり手</div>
        </div>
      </div>

      {/* 棒グラフ */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <h3 className="font-bold mb-6" style={{ color: "#e8dfc8" }}>決まり手別 勝利数</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={kimariteData} layout="vertical" margin={{ top: 0, right: 32, left: 24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3060" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#3a5a7a", fontSize: 11 }} axisLine={{ stroke: "#0f3060" }} tickLine={false} />
              <YAxis type="category" dataKey="technique" tick={{ fill: "#8aaad0", fontSize: 12 }} axisLine={false} tickLine={false} width={76} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212,160,23,0.04)" }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={26}>
                {kimariteData.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* テーブル */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <h3 className="font-bold mb-5" style={{ color: "#e8dfc8" }}>決まり手一覧</h3>
        <div className="space-y-3">
          {kimariteData.map((item, idx) => (
            <div key={item.technique} className="flex items-center gap-2 md:gap-4">
              <span className="w-4 text-xs font-mono text-right flex-shrink-0" style={{ color: "#2a4a6a" }}>{idx + 1}</span>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm flex-shrink-0" style={{ background: PALETTE[idx % PALETTE.length] }} />
              <span className="w-16 md:w-20 text-xs md:text-sm font-bold flex-shrink-0" style={{ color: "#c0d8f0" }}>{item.technique}</span>
              <div className="flex-1 h-2 md:h-2.5 rounded-full overflow-hidden" style={{ background: "#030e1f", border: "1px solid #0f3060" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${item.percentage}%`, background: PALETTE[idx % PALETTE.length] }} />
              </div>
              <span className="w-10 md:w-12 text-right text-xs md:text-sm font-black flex-shrink-0" style={{ color: "#e8dfc8" }}>{item.count}回</span>
              <span className="hidden sm:block w-10 text-right text-xs flex-shrink-0" style={{ color: "#3a5a7a" }}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 解説 */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "#05111f", border: "1px solid #0a2040" }}>
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
          style={{ background: "linear-gradient(to bottom, #d4a017, transparent)" }} />
        <h3 className="font-bold mb-3 ml-3" style={{ color: "#d4a017" }}>解説</h3>
        <p className="text-sm leading-relaxed ml-3" style={{ color: "#8aaad0" }}>
          霧島鐵力の決まり手を分析すると、<span style={{ color: "#f0c840", fontWeight: "bold" }}>寄り切り（{kimariteData[0].percentage}%）</span>が最多で、
          押し出し・上手投げと合わせた上位3技で全体の約<span style={{ color: "#e8dfc8", fontWeight: "bold" }}>66%</span>を占める。
          特に左四つに組んでからの上手投げ・下手投げは相手にも警戒される得意技で、
          多彩な決まり手でいかなる相手にも対応できる技巧力が霧島の真骨頂だ。
        </p>
      </div>
    </div>
  );
}
