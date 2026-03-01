"use client";

interface NavItem {
  id: string;
  label: string;
  kanji: string;
  sub: string;
}

const navItems: NavItem[] = [
  { id: "dashboard",  label: "ダッシュボード",   kanji: "概", sub: "概要" },
  { id: "profile",    label: "プロフィール",     kanji: "歴", sub: "力士情報・経歴" },
  { id: "winloss",    label: "星取表",           kanji: "星", sub: "場所別成績" },
  { id: "kimarite",   label: "決まり手分析",     kanji: "技", sub: "決まり手統計" },
  { id: "news",       label: "最新ニュース",     kanji: "報", sub: "最新情報" },
  { id: "promotion",  label: "昇進トラッカー",   kanji: "昇", sub: "大関復帰進捗" },
  { id: "gallery",    label: "名勝負ギャラリー", kanji: "勝", sub: "印象的な一番" },
  { id: "stable",     label: "音羽山通信",       kanji: "部", sub: "部屋の日常" },
  { id: "accuracy",   label: "データ精査",       kanji: "査", sub: "情報の検証状況" },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`sidebar-panel fixed left-0 top-0 h-screen w-64 flex flex-col z-50 ${isOpen ? "sidebar-open" : ""}`}
      style={{ background: "#020a18", borderRight: "1px solid #0f3060" }}
    >
      {/* ── ヘッダー（青海波パターン） ── */}
      <div className="relative overflow-hidden px-5 py-6 border-b flex-shrink-0"
        style={{ borderBottomColor: "#0f3060" }}>
        <div className="absolute inset-0 seigaiha opacity-80" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(3,14,31,0.2), rgba(3,14,31,0.8))" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            {/* 家紋風ロゴ */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 kin-glow"
              style={{
                background: "linear-gradient(135deg, #d4a017 0%, #8b6914 60%, #f0c840 100%)",
                boxShadow: "0 0 16px rgba(212,160,23,0.4)",
              }}>
              <span className="text-black font-black text-xl select-none">霧</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold tracking-[0.3em]" style={{ color: "#d4a017" }}>
                大相撲情報
              </div>
              <div className="text-white text-xl font-black tracking-wider">霧島鐵力</div>
            </div>

            {/* モバイル閉じるボタン */}
            <button
              onClick={onClose}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ background: "rgba(15,48,96,0.5)", border: "1px solid #0f3060" }}
              aria-label="閉じる"
            >
              <span className="text-sm font-black" style={{ color: "#d4a017" }}>✕</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pl-1">
            <span className="w-2 h-2 rounded-full kin-pulse"
              style={{ background: "#d4a017", boxShadow: "0 0 6px #d4a017" }} />
            <span className="text-xs" style={{ color: "#6a8aad" }}>
              東関脇 ／ 大関復帰挑戦中
            </span>
          </div>
        </div>
      </div>

      {/* 金の区切り線 */}
      <div className="kin-line flex-shrink-0" />

      {/* ── ナビゲーション ── */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
              style={
                isActive
                  ? {
                      background: "linear-gradient(90deg, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.04) 100%)",
                      borderLeft: "2px solid #d4a017",
                    }
                  : { borderLeft: "2px solid transparent" }
              }
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,48,96,0.6)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {/* 漢字アイコン */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
                style={
                  isActive
                    ? { background: "rgba(212,160,23,0.2)", color: "#d4a017", border: "1px solid rgba(212,160,23,0.4)" }
                    : { background: "rgba(15,48,96,0.5)", color: "#3a5a7a", border: "1px solid #0f3060" }
                }
              >
                {item.kanji}
              </div>

              {/* テキスト */}
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate"
                  style={{ color: isActive ? "#f0c840" : "#6a8aad" }}>
                  {item.label}
                </div>
                <div className="text-[10px] truncate"
                  style={{ color: isActive ? "#d4a017" : "#3a5a7a" }}>
                  {item.sub}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* 金の区切り線 */}
      <div className="kin-line flex-shrink-0" />

      {/* フッター */}
      <div className="px-5 py-3 text-center text-[10px] flex-shrink-0" style={{ color: "#2a4a6a" }}>
        © 2026 霧島ファンサイト（非公式）
      </div>
    </aside>
  );
}
