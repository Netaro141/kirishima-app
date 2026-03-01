// 霧島鐵力 データファイル（2026年3月場所直前）
// ⚠ このファイルにはモックデータ・未確認情報が含まれます。
// 各フィールドの検証状況は src/data/accuracy.ts を参照してください。

export const profile = {
  shikona: "霧島鐵力",
  shikonaRuby: "きりしまてつお",        // 修正済み（旧: きりしまてつゆき）
  shikonaEn: "Kirishima Tetsuo",        // 修正済み（旧: Tetsuyuki）
  realName: "ビャンブチュルン・ハグワスレン", // 確認済み（ユーザー提供情報）
  birthDate: "1996年7月4日",
  age: 29,
  birthPlace: "モンゴル国ウランバートル市",
  nationality: "モンゴル",
  stable: "音羽山部屋",
  stablemaster: "音羽山親方（元横綱・霧島）",
  height: "187cm",
  weight: "157kg",
  highestRank: "大関",
  currentRank: "東関脇",
  debut: "2014年1月場所",
  ozekiPromotion: "2023年7月場所",
  style: "技巧派。左四つからの投げ技を得意とし、多彩な決まり手で相手を翻弄する。近年は組み止めた後の鋭い投げが復活し、大関時代の輝きが戻りつつある。",
  specialMoves: ["上手投げ", "下手投げ", "寄り切り", "押し出し", "掬い投げ"],
  career: [
    { year: "2014年1月", event: "初土俵（音羽山部屋）" },
    { year: "2016年3月", event: "幕下昇進" },
    { year: "2019年1月", event: "十両昇進" },
    { year: "2020年7月", event: "幕内昇進" },
    { year: "2022年9月", event: "小結昇進" },
    { year: "2023年1月", event: "関脇昇進" },
    { year: "2023年5月", event: "夏場所優勝（13勝2敗）大関昇進決定" },
    { year: "2023年7月", event: "大関昇進" },
    { year: "2024年7月", event: "大関陥落（前頭へ）" },
    { year: "2025年5月", event: "関脇返り咲き" },
    { year: "2025年11月", event: "関脇で11勝4敗（技能賞）" },
    { year: "2026年1月", event: "東関脇で11勝4敗（敢闘賞）" },
    { year: "2026年3月", event: "春場所（大関復帰へ正念場）" },
  ],
};

export type DayResult = "○" | "●" | "休" | "不" | "－";

export interface TournamentResult {
  basho: string;
  location: string;
  rank: string;
  wins: number;
  losses: number;
  absences: number;
  results: DayResult[];
  specialPrize?: string[];
  champion?: boolean;
}

export const tournamentHistory: TournamentResult[] = [
  {
    basho: "2026年1月",
    location: "初場所",
    rank: "東関脇",
    wins: 11,
    losses: 4,
    absences: 0,
    results: ["○", "○", "●", "○", "○", "○", "●", "○", "●", "○", "○", "○", "●", "○", "○"],
    specialPrize: ["敢闘賞"],
  },
  {
    basho: "2025年11月",
    location: "九州場所",
    rank: "関脇",
    wins: 11,
    losses: 4,
    absences: 0,
    results: ["○", "●", "○", "○", "○", "●", "○", "○", "○", "●", "○", "○", "○", "○", "●"],
    specialPrize: ["技能賞"],
  },
  {
    basho: "2025年9月",
    location: "秋場所",
    rank: "関脇",
    wins: 9,
    losses: 6,
    absences: 0,
    results: ["○", "○", "●", "○", "○", "●", "○", "●", "○", "○", "●", "○", "●", "○", "●"],
  },
  {
    basho: "2025年7月",
    location: "名古屋場所",
    rank: "前頭筆頭",
    wins: 10,
    losses: 5,
    absences: 0,
    results: ["○", "○", "○", "●", "○", "○", "●", "○", "●", "○", "○", "●", "○", "●", "○"],
    specialPrize: ["敢闘賞"],
  },
  {
    basho: "2025年5月",
    location: "夏場所",
    rank: "前頭3枚目",
    wins: 11,
    losses: 4,
    absences: 0,
    results: ["○", "○", "●", "○", "○", "○", "●", "○", "○", "○", "●", "○", "○", "●", "○"],
    specialPrize: ["技能賞"],
  },
  {
    basho: "2025年3月",
    location: "春場所",
    rank: "前頭4枚目",
    wins: 8,
    losses: 7,
    absences: 0,
    results: ["○", "●", "○", "○", "●", "○", "●", "○", "○", "●", "○", "●", "○", "●", "○"],
  },
  {
    basho: "2025年1月",
    location: "初場所",
    rank: "前頭筆頭",
    wins: 11,
    losses: 4,
    absences: 0,
    results: ["○", "○", "●", "○", "○", "●", "○", "○", "○", "●", "○", "○", "●", "○", "○"],
    specialPrize: ["技能賞"],
  },
  {
    basho: "2024年11月",
    location: "九州場所",
    rank: "前頭3枚目",
    wins: 9,
    losses: 6,
    absences: 0,
    results: ["○", "●", "○", "○", "●", "○", "○", "●", "○", "○", "●", "○", "●", "○", "●"],
  },
  {
    basho: "2024年9月",
    location: "秋場所",
    rank: "前頭6枚目",
    wins: 10,
    losses: 5,
    absences: 0,
    results: ["○", "○", "○", "●", "○", "○", "●", "○", "●", "○", "○", "●", "○", "●", "○"],
    specialPrize: ["敢闘賞"],
  },
  {
    basho: "2024年7月",
    location: "名古屋場所",
    rank: "大関",
    wins: 4,
    losses: 11,
    absences: 0,
    results: ["○", "●", "●", "○", "●", "●", "●", "○", "●", "●", "●", "○", "●", "●", "●"],
  },
  {
    basho: "2023年5月",
    location: "夏場所",
    rank: "関脇",
    wins: 13,
    losses: 2,
    absences: 0,
    results: ["○", "○", "○", "●", "○", "○", "○", "○", "○", "○", "●", "○", "○", "○", "○"],
    specialPrize: ["優勝", "技能賞", "敢闘賞"],
    champion: true,
  },
];

export interface KimariteData {
  technique: string;
  count: number;
  percentage: number;
}

export const kimariteData: KimariteData[] = [
  { technique: "寄り切り", count: 52, percentage: 27.8 },
  { technique: "押し出し", count: 38, percentage: 20.3 },
  { technique: "上手投げ", count: 33, percentage: 17.6 },
  { technique: "下手投げ", count: 22, percentage: 11.8 },
  { technique: "寄り倒し", count: 14, percentage: 7.5 },
  { technique: "突き出し", count: 11, percentage: 5.9 },
  { technique: "掬い投げ", count: 8, percentage: 4.3 },
  { technique: "その他", count: 9, percentage: 4.8 },
];

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  content: string;
  category: "成績" | "インタビュー" | "部屋" | "一般";
}

export const news: NewsItem[] = [
  {
    id: 1,
    date: "2026年2月28日",
    title: "春場所直前—大関復帰へ正念場の一番が始まる",
    content:
      "2026年3月春場所がいよいよ開幕する。霧島鐵力は直近2場所で11勝4敗・11勝4敗と連続好成績を挙げており、合計22勝。今場所11勝以上で大関復帰条件（三役3場所33勝）を満たすことになる。「やるべきことはわかっている。一番一番集中する」と落ち着いた表情で語った。",
    category: "成績",
  },
  {
    id: 2,
    date: "2026年2月15日",
    title: "音羽山親方「機は熟した。自信を持って土俵に上がれ」",
    content:
      "師匠の音羽山親方は春場所前の会見で「2場所連続11勝は、本物の自信から来ている。技も体も大関時代以上かもしれない」と激励。「今場所は自然体で相撲を取れば結果はついてくる」と全幅の信頼を寄せた。",
    category: "インタビュー",
  },
  {
    id: 3,
    date: "2026年2月5日",
    title: "2場所連続11勝—大関昇進目安の22勝に到達",
    content:
      "2026年初場所を11勝4敗（敢闘賞）で締めた霧島鐵力。2025年11月九州場所の11勝4敗（技能賞）と合わせ、三役での2場所合計22勝を記録。昇進目安の33勝まであと11勝と迫り、大相撲界全体が注目する存在となった。",
    category: "成績",
  },
  {
    id: 4,
    date: "2026年1月27日",
    title: "初場所千秋楽インタビュー「3月場所が楽しみ」",
    content:
      "初場所を11勝4敗・敢闘賞で終えた霧島は「内容は満足できないところもあるが、数字はついてきた。3月場所はさらに上を狙いたい」とコメント。報道陣に囲まれながらも「大関の話は場所が終わってから」と冷静に受け答えした。",
    category: "インタビュー",
  },
  {
    id: 5,
    date: "2026年2月20日",
    title: "出稽古で横綱と充実の申し合い",
    content:
      "春場所に向けた出稽古で横綱との申し合いを実施。師匠は「十分通用している。体の使い方がいい」と評価。本人は「強い相手と稽古することで、場所での緊張感に慣れられる」と手応えを語った。",
    category: "部屋",
  },
];

export interface BoutRecord {
  id: number;
  basho: string;
  opponent: string;
  opponentRank: string;
  result: "勝" | "負";
  kimarite: string;
  description: string;
  significance: string;
}

export const famousBouts: BoutRecord[] = [
  {
    id: 1,
    basho: "2026年1月場所 14日目",
    opponent: "大の里",
    opponentRank: "大関",
    result: "勝",
    kimarite: "上手投げ",
    description:
      "14日目の大関戦。序盤は押し込まれたが、左を差し込んで組み止めると得意の上手投げで一気に勝負を決めた。大関時代の投げ技が完全復活したことを示す価値ある一勝。",
    significance: "大関復帰ムードを高めた技あり",
  },
  {
    id: 2,
    basho: "2025年11月場所 千秋楽",
    opponent: "琴桜",
    opponentRank: "横綱",
    result: "勝",
    kimarite: "寄り切り",
    description:
      "横綱との千秋楽の一番。立ち合いから低く当たり、横綱の突き押しを受け止めながらじわじわと前進。最後は力強い寄り切りで勝利を収め、11勝目をもぎ取った。",
    significance: "横綱を破り11勝・技能賞の締め括り",
  },
  {
    id: 3,
    basho: "2023年5月場所 千秋楽",
    opponent: "貴景勝",
    opponentRank: "大関",
    result: "勝",
    kimarite: "押し出し",
    description:
      "優勝を決めた千秋楽の大一番。立ち合いから電車道で大関を土俵外へ押し出した完璧な相撲。13勝2敗での優勝は大関昇進を決定づけた。",
    significance: "大関昇進を決定づけた歴史的一番",
  },
  {
    id: 4,
    basho: "2025年5月場所 10日目",
    opponent: "若元春",
    opponentRank: "大関",
    result: "勝",
    kimarite: "下手投げ",
    description:
      "前頭から三役返り咲きを目指した夏場所での大一番。土俵際でのギリギリの攻防から逆転の下手投げ。観客を大きく沸かせた今場所随一の名勝負。",
    significance: "三役返り咲きへの弾みとなった逆転劇",
  },
];

export interface StableNewsItem {
  id: number;
  date: string;
  title: string;
  content: string;
  type: "稽古" | "師匠" | "部屋員" | "日常";
}

export const stableNews: StableNewsItem[] = [
  {
    id: 1,
    date: "2026年2月25日",
    title: "春場所前最終稽古—師匠も目を細める仕上がり",
    content:
      "春場所直前の最終稽古。霧島鐵力は2時間以上の申し合いをこなし、師匠から「これ以上は稽古しなくていい。あとは体を壊さないように」とストップがかかるほどの充実ぶりを見せた。",
    type: "稽古",
  },
  {
    id: 2,
    date: "2026年2月18日",
    title: "師匠・音羽山親方が語る「大関時代以上の霧島」",
    content:
      "「大関を経験して、一度苦労した。その経験が今の霧島を作っている。技の選択眼が格段に上がった。昔は力任せのところがあったが、今は相手の動きを見て技を変えられる」と師匠は弟子の成長を語る。",
    type: "師匠",
  },
  {
    id: 3,
    date: "2026年2月10日",
    title: "後輩力士への技の伝授「横綱を目指せと伝えた」",
    content:
      "部屋の若い衆への稽古指導で「大関で満足するなと言っている。自分も昇進後は横綱を意識して相撲を取る」と霧島。後輩たちを鼓舞しながら自らの目標も高く持ち続ける。",
    type: "部屋員",
  },
  {
    id: 4,
    date: "2026年2月1日",
    title: "節分の豆まき行事に部屋全員で参加",
    content:
      "地元神社の節分行事に音羽山部屋一同が参加。霧島鐵力は「鬼は外—大関復帰の邪魔する鬼は全部出て行け！（笑）」と豪快な一面を見せ、境内に集まったファンを笑顔にした。",
    type: "日常",
  },
  {
    id: 5,
    date: "2026年1月30日",
    title: "初場所後に故郷モンゴルへ　家族と英気を養う",
    content:
      "初場所後の休暇にモンゴルへ一時帰国。「母の羊の肉料理を食べて完全充電できた。家族の顔を見ると心が落ち着く。3月場所も頑張れる気がした」と笑顔で語った。",
    type: "日常",
  },
];

export interface PromotionData {
  basho: string;
  wins: number;
  rank: string;
  upcoming?: boolean;
}

export const promotionTrackerData: PromotionData[] = [
  { basho: "2025年11月 九州", wins: 11, rank: "関脇" },
  { basho: "2026年1月 初場所", wins: 11, rank: "東関脇" },
  { basho: "2026年3月 春場所", wins: 0, rank: "東関脇", upcoming: true },
];

export const OZEKI_RETURN_THRESHOLD = 33;
