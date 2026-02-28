"use client";

import { profile } from "@/data/kirishima";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b last:border-0"
      style={{ borderColor: "#0f3060" }}>
      <div className="w-28 text-sm flex-shrink-0" style={{ color: "#3a5a7a" }}>{label}</div>
      <div className="text-sm flex-1" style={{ color: "#c0d8f0" }}>{value}</div>
    </div>
  );
}

export default function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>プロフィール</h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>霧島鐵力の基本情報と経歴</p>
      </div>

      {/* ── メインカード ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        {/* 装飾ヘッダー */}
        <div className="h-28 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0c2448 0%, #071a35 60%, #030e1f 100%)" }}>
          <div className="absolute inset-0 seigaiha" />
          <div className="absolute inset-0 naname opacity-60" />
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)" }} />
        </div>

        {/* アバター + 名前 */}
        <div className="px-8 pb-8 -mt-10 relative">
          <div className="flex items-end gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #d4a017 0%, #8b6914 60%, #f0c840 100%)",
                border: "4px solid #071a35",
                boxShadow: "0 0 20px rgba(212,160,23,0.4)",
              }}>
              <span className="text-3xl font-black text-black select-none">霧</span>
            </div>
            <div className="pb-1">
              <div className="text-3xl font-black" style={{ color: "#e8dfc8" }}>{profile.shikona}</div>
              <p className="text-sm mt-0.5" style={{ color: "#6a8aad" }}>{profile.shikonaRuby} / {profile.shikonaEn}</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "rgba(212,160,23,0.2)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.4)" }}>
                  {profile.currentRank}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs"
                  style={{ background: "rgba(15,48,96,0.5)", color: "#6a8aad", border: "1px solid #0f3060" }}>
                  最高位：{profile.highestRank}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#d4a017" }}>基本情報</h3>
              <InfoRow label="本名" value={profile.realName} />
              <InfoRow label="生年月日" value={`${profile.birthDate}（${profile.age}歳）`} />
              <InfoRow label="出身地" value={profile.birthPlace} />
              <InfoRow label="国籍" value={profile.nationality} />
              <InfoRow label="所属部屋" value={profile.stable} />
              <InfoRow label="師匠" value={profile.stablemaster} />
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#d4a017" }}>力士データ</h3>
              <InfoRow label="身長" value={profile.height} />
              <InfoRow label="体重" value={profile.weight} />
              <InfoRow label="最高位" value={profile.highestRank} />
              <InfoRow label="現在の地位" value={profile.currentRank} />
              <InfoRow label="初土俵" value={profile.debut} />
              <InfoRow label="大関昇進" value={profile.ozekiPromotion} />
            </div>
          </div>
        </div>
      </div>

      {/* ── スタイル & 得意技 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#d4a017" }}>相撲スタイル</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#8aaad0" }}>{profile.style}</p>
          <div className="mt-4">
            <h4 className="text-xs font-bold mb-2" style={{ color: "#6a8aad" }}>得意技</h4>
            <div className="flex flex-wrap gap-2">
              {profile.specialMoves.map((move) => (
                <span key={move} className="px-3 py-1 rounded-lg text-xs font-bold"
                  style={{ background: "rgba(212,160,23,0.12)", color: "#f0c840", border: "1px solid rgba(212,160,23,0.3)" }}>
                  {move}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#d4a017" }}>フィジカルデータ</h3>
          <div className="space-y-5">
            {[
              { label: "身長", value: "187cm", max: 210, current: 187, color: "#6a8aad" },
              { label: "体重", value: "157kg", max: 200, current: 157, color: "#d4a017" },
            ].map(({ label, value, max, current, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: "#3a5a7a" }}>{label}</span>
                  <span className="text-sm font-black" style={{ color: "#e8dfc8" }}>{value}</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#030e1f", border: "1px solid #0f3060" }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(current / max) * 100}%`, background: color, boxShadow: `0 0 8px ${color}60` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── キャリア年表 ── */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <h3 className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#d4a017" }}>キャリア年表</h3>
        <div className="relative">
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #d4a017, #0f3060)" }} />
          <div className="space-y-5">
            {profile.career.map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="w-20 text-right text-xs flex-shrink-0 pt-0.5" style={{ color: "#3a5a7a" }}>
                  {item.year}
                </div>
                <div className="relative flex-shrink-0 w-3 mt-1 z-10">
                  <div className="w-3 h-3 rounded-full"
                    style={{
                      background: i === profile.career.length - 1 ? "#d4a017" : i >= profile.career.length - 3 ? "#8b6914" : "#0f3060",
                      border: `2px solid ${i === profile.career.length - 1 ? "#f0c840" : "#071a35"}`,
                      boxShadow: i === profile.career.length - 1 ? "0 0 8px rgba(212,160,23,0.6)" : "none",
                    }} />
                </div>
                <div className="text-sm pb-2" style={{ color: i >= profile.career.length - 3 ? "#e8dfc8" : "#8aaad0" }}>
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
