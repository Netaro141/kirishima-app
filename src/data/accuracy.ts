/**
 * データ精査システム
 * 各データフィールドの検証状況を管理します。
 *
 * status:
 *   "verified"         — 公式情報・信頼できるソースで確認済み
 *   "unconfirmed"      — 未確認（情報源が不明または要確認）
 *   "mock"             — モック/仮データ（プロトタイプ用の架空データ）
 *   "needs_correction" — 誤りと判明・要修正
 */

export type DataStatus = "verified" | "unconfirmed" | "mock" | "needs_correction";

export interface AccuracyRecord {
  id: string;
  category: string;
  field: string;
  currentValue: string;
  status: DataStatus;
  note: string;
  correctedBy?: string; // 修正者・修正日など
}

export const accuracyRecords: AccuracyRecord[] = [
  // ── プロフィール ──────────────────────────────────
  {
    id: "profile_shikona",
    category: "プロフィール",
    field: "四股名",
    currentValue: "霧島鐵力",
    status: "verified",
    note: "公式番付に記載されている正式な四股名。",
  },
  {
    id: "profile_ruby",
    category: "プロフィール",
    field: "四股名読み",
    currentValue: "きりしまてつお",
    status: "verified",
    note: "修正済み。初期実装の「きりしまてつゆき」から訂正。",
    correctedBy: "ユーザー指摘により修正",
  },
  {
    id: "profile_real_name",
    category: "プロフィール",
    field: "本名（モンゴル語）",
    currentValue: "ビャンブチュルン・ハグワスレン",
    status: "verified",
    note: "ユーザー提供情報で確認済み。初期実装の誤った値から修正。",
    correctedBy: "ユーザー情報",
  },
  {
    id: "profile_birthdate",
    category: "プロフィール",
    field: "生年月日",
    currentValue: "1996年4月24日",
    status: "verified",
    note: "公式サイト（sumo.or.jp）で確認済み。平成8年4月24日。",
    correctedBy: "公式サイト",
  },
  {
    id: "profile_birthplace",
    category: "プロフィール",
    field: "出身地",
    currentValue: "モンゴル・ドルノドゥ",
    status: "verified",
    note: "公式サイト（sumo.or.jp）で確認済み。",
    correctedBy: "公式サイト",
  },
  {
    id: "profile_stable",
    category: "プロフィール",
    field: "所属部屋",
    currentValue: "音羽山部屋",
    status: "verified",
    note: "公式番付に記載されている所属部屋。",
  },
  {
    id: "profile_height",
    category: "プロフィール",
    field: "身長",
    currentValue: "186cm",
    status: "verified",
    note: "公式サイト（sumo.or.jp）で確認済み。186.0cm。",
    correctedBy: "公式サイト",
  },
  {
    id: "profile_weight",
    category: "プロフィール",
    field: "体重",
    currentValue: "149kg",
    status: "verified",
    note: "公式サイト（sumo.or.jp）で確認済み。149.0kg（場所により変動）。",
    correctedBy: "公式サイト",
  },
  {
    id: "profile_rank",
    category: "プロフィール",
    field: "現在の番付",
    currentValue: "東関脇",
    status: "verified",
    note: "2026年3月場所番付。ユーザー提供情報で確認済み。",
    correctedBy: "ユーザー情報",
  },
  {
    id: "profile_debut",
    category: "プロフィール",
    field: "初土俵",
    currentValue: "2015年5月場所",
    status: "verified",
    note: "公式サイト（sumo.or.jp）で確認済み。平成27年5月場所。",
    correctedBy: "公式サイト",
  },

  // ── 最近の成績 ────────────────────────────────────
  {
    id: "results_2026jan",
    category: "成績",
    field: "2026年1月初場所",
    currentValue: "11勝4敗・敢闘賞",
    status: "verified",
    note: "ユーザー提供情報で確認済み。",
    correctedBy: "ユーザー情報",
  },
  {
    id: "results_2025nov",
    category: "成績",
    field: "2025年11月九州場所",
    currentValue: "11勝4敗・技能賞",
    status: "verified",
    note: "ユーザー提供情報で確認済み。",
    correctedBy: "ユーザー情報",
  },
  {
    id: "results_dayorder",
    category: "成績",
    field: "各日の勝敗順序（○●の並び）",
    currentValue: "各場所15日分の星取",
    status: "mock",
    note: "場所の合計勝敗数は確認済みですが、各日の勝敗順序はモックデータです。",
  },
  {
    id: "results_older",
    category: "成績",
    field: "2025年9月以前の成績",
    currentValue: "複数場所分",
    status: "mock",
    note: "過去成績はすべてプロトタイプ用のモックデータです。実際の成績と異なる場合があります。",
  },

  // ── 決まり手統計 ──────────────────────────────────
  {
    id: "kimarite_stats",
    category: "決まり手",
    field: "決まり手別勝利数・割合",
    currentValue: "寄り切り52回(27.8%)など",
    status: "mock",
    note: "決まり手統計はすべてモックデータです。実際の統計とは異なります。",
  },

  // ── ニュース・エピソード ──────────────────────────
  {
    id: "news_all",
    category: "ニュース",
    field: "ニュース記事（全件）",
    currentValue: "5件",
    status: "mock",
    note: "すべての記事はプロトタイプ用の架空コンテンツです。実際のインタビュー・報道ではありません。",
  },
  {
    id: "stable_episodes",
    category: "音羽山通信",
    field: "部屋エピソード（全件）",
    currentValue: "5件",
    status: "mock",
    note: "すべてのエピソードはプロトタイプ用の架空コンテンツです。",
  },
  {
    id: "bouts_detail",
    category: "名勝負",
    field: "取組の詳細・解説",
    currentValue: "4件",
    status: "mock",
    note: "取組の解説文はモックデータです。対戦相手・結果の一部は確認済みの場合もありますが、詳細説明は架空です。",
  },
];

// 統計ヘルパー
export function getAccuracyStats() {
  const total = accuracyRecords.length;
  const counts = {
    verified: accuracyRecords.filter((r) => r.status === "verified").length,
    unconfirmed: accuracyRecords.filter((r) => r.status === "unconfirmed").length,
    mock: accuracyRecords.filter((r) => r.status === "mock").length,
    needs_correction: accuracyRecords.filter((r) => r.status === "needs_correction").length,
  };
  return { total, ...counts };
}

export function getByCategory() {
  const categories: Record<string, AccuracyRecord[]> = {};
  for (const record of accuracyRecords) {
    if (!categories[record.category]) categories[record.category] = [];
    categories[record.category].push(record);
  }
  return categories;
}

// ステータスの表示設定
export const statusConfig: Record<DataStatus, { label: string; color: string; bg: string; border: string; icon: string }> = {
  verified:         { label: "確認済み",  color: "#4ade80", bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.35)",  icon: "✓" },
  unconfirmed:      { label: "未確認",    color: "#f0c840", bg: "rgba(240,200,64,0.12)",  border: "rgba(240,200,64,0.35)",  icon: "?" },
  mock:             { label: "モック",    color: "#6a8aad", bg: "rgba(106,138,173,0.12)", border: "rgba(106,138,173,0.35)", icon: "~" },
  needs_correction: { label: "要修正",    color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.35)", icon: "✕" },
};
