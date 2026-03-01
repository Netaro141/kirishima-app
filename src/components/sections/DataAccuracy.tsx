"use client";

import { useState } from "react";
import {
  accuracyRecords,
  getAccuracyStats,
  getByCategory,
  statusConfig,
  type DataStatus,
} from "@/data/accuracy";

function StatusBadge({ status }: { status: DataStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
    >
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

export default function DataAccuracy() {
  const stats = getAccuracyStats();
  const byCategory = getByCategory();
  const [filterStatus, setFilterStatus] = useState<DataStatus | "all">("all");

  const filtered =
    filterStatus === "all"
      ? accuracyRecords
      : accuracyRecords.filter((r) => r.status === filterStatus);

  const filteredByCategory: Record<string, typeof accuracyRecords> = {};
  for (const record of filtered) {
    if (!filteredByCategory[record.category]) filteredByCategory[record.category] = [];
    filteredByCategory[record.category].push(record);
  }

  const overallScore = Math.round((stats.verified / stats.total) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black section-title" style={{ color: "#e8dfc8" }}>
          データ精査
        </h1>
        <p className="text-sm mt-3" style={{ color: "#3a5a7a" }}>
          掲載情報の検証状況と信頼性スコア
        </p>
      </div>

      {/* ── 重要警告バナー ── */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.35)" }}
      >
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: "#f87171" }} />
        <div className="ml-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base font-black" style={{ color: "#f87171" }}>⚠ 重要なお知らせ</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#c0d8f0" }}>
            このアプリは<span className="font-bold" style={{ color: "#e8dfc8" }}>非公式ファンサイトのプロトタイプ</span>です。
            掲載情報の多くは<span className="font-bold" style={{ color: "#f0c840" }}>架空のモックデータ</span>であり、
            実際の成績・発言・エピソードとは異なります。
            <br />
            確認済みの情報は<span style={{ color: "#4ade80", fontWeight: "bold" }}>「確認済み」</span>バッジで表示しています。
            それ以外の情報は参考程度にご覧ください。
          </p>
        </div>
      </div>

      {/* ── スコアカード ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(
          [
            { key: "verified",         label: "確認済み",   count: stats.verified },
            { key: "unconfirmed",      label: "未確認",     count: stats.unconfirmed },
            { key: "mock",             label: "モック",     count: stats.mock },
            { key: "needs_correction", label: "要修正",     count: stats.needs_correction },
          ] as const
        ).map(({ key, label, count }) => {
          const cfg = statusConfig[key];
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
              className="rounded-2xl p-5 text-center transition-all"
              style={{
                background: filterStatus === key ? cfg.bg : "#071a35",
                border: `1px solid ${filterStatus === key ? cfg.border : "#0f3060"}`,
              }}
            >
              <div className="text-3xl font-black" style={{ color: cfg.color }}>{count}</div>
              <div className="text-xs mt-1 font-medium" style={{ color: cfg.color }}>{label}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#3a5a7a" }}>
                {Math.round((count / stats.total) * 100)}%
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 全体スコア ── */}
      <div className="rounded-2xl p-6" style={{ background: "#071a35", border: "1px solid #0f3060" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold" style={{ color: "#e8dfc8" }}>データ信頼性スコア</h3>
            <p className="text-xs mt-0.5" style={{ color: "#3a5a7a" }}>
              確認済みフィールド数 / 全フィールド数
            </p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black"
              style={{ color: overallScore >= 50 ? "#f0c840" : "#f87171" }}>
              {overallScore}
            </span>
            <span className="text-lg" style={{ color: "#6a8aad" }}>%</span>
          </div>
        </div>
        <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: "#030e1f", border: "1px solid #0f3060" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${overallScore}%`,
              background: "linear-gradient(90deg, #8b6914, #d4a017, #4ade80)",
            }}
          />
        </div>
        <div className="flex gap-3 mt-3 flex-wrap">
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.color }} />
              <span className="text-xs" style={{ color: "#3a5a7a" }}>{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── フィルター表示中の通知 ── */}
      {filterStatus !== "all" && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)" }}>
          <StatusBadge status={filterStatus} />
          <span className="text-sm" style={{ color: "#f0c840" }}>でフィルター中</span>
          <button
            onClick={() => setFilterStatus("all")}
            className="ml-auto text-xs px-3 py-1 rounded-lg"
            style={{ background: "rgba(212,160,23,0.15)", color: "#d4a017", border: "1px solid rgba(212,160,23,0.3)" }}
          >
            すべて表示
          </button>
        </div>
      )}

      {/* ── カテゴリ別テーブル ── */}
      <div className="space-y-6">
        {Object.entries(filterStatus === "all" ? byCategory : filteredByCategory).map(([category, records]) => (
          <div key={category} className="rounded-2xl overflow-hidden"
            style={{ background: "#071a35", border: "1px solid #0f3060" }}>
            <div className="px-5 py-3 flex items-center justify-between"
              style={{ background: "rgba(15,48,96,0.4)", borderBottom: "1px solid #0f3060" }}>
              <h3 className="font-bold text-sm" style={{ color: "#e8dfc8" }}>{category}</h3>
              <span className="text-xs" style={{ color: "#3a5a7a" }}>{records.length} 件</span>
            </div>

            <div className="divide-y" style={{ borderColor: "#0f3060" }}>
              {records.map((record) => (
                <div key={record.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <StatusBadge status={record.status} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold" style={{ color: "#c0d8f0" }}>
                          {record.field}
                        </span>
                        {record.correctedBy && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                            修正済
                          </span>
                        )}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#6a8aad" }}>
                        現在の値：<span style={{ color: "#e8dfc8" }}>{record.currentValue}</span>
                      </div>
                      <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#3a5a7a" }}>
                        {record.note}
                      </p>
                      {record.correctedBy && (
                        <div className="text-[10px] mt-1" style={{ color: "#2a4a6a" }}>
                          修正元: {record.correctedBy}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: "#3a5a7a" }}>
            該当するデータがありません
          </div>
        )}
      </div>

      {/* ── 改善ガイド ── */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "#05111f", border: "1px solid #0a2040" }}>
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
          style={{ background: "linear-gradient(to bottom, #d4a017, transparent)" }} />
        <h3 className="font-bold mb-3 ml-4" style={{ color: "#d4a017" }}>データ精度を向上させるには</h3>
        <ul className="space-y-2 ml-4">
          {[
            { icon: "✓", text: "公式サイト・番付表で確認できた情報は「確認済み」に更新してください。", color: "#4ade80" },
            { icon: "✕", text: "誤りが見つかったフィールドは本名（モンゴル語）のように「要修正」でフラグを立ててください。", color: "#f87171" },
            { icon: "~", text: "日別星取・ニュース等のモックデータは実際の情報に差し替えることで精度が上がります。", color: "#6a8aad" },
            { icon: "?", text: "未確認フィールドは日本相撲協会公式サイト等で確認後、statusを更新してください。", color: "#f0c840" },
          ].map(({ icon, text, color }) => (
            <li key={icon} className="flex items-start gap-2 text-sm" style={{ color: "#8aaad0" }}>
              <span className="font-black flex-shrink-0 mt-0.5" style={{ color }}>{icon}</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
