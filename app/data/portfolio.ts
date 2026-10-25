// ASCII coastline art. Each row is kept as a string so wave rows can later
// be shifted for animation (see handoff "今後の予定"). Colors are design tokens.
export type AsciiColor = "sun" | "sky" | "sea" | "foam" | "sand";

export interface CoastLine {
  t: string;
  c: AsciiColor;
}

export const ASCII_COLORS: Record<AsciiColor, string> = {
  sun: "var(--color-ascii-sun)",
  sky: "var(--color-ascii-sky)",
  sea: "var(--color-ascii-sea)",
  foam: "var(--color-ascii-foam)",
  sand: "var(--color-ascii-sand)",
};

export const coast: CoastLine[] = [
  { t: "                                .-~~-.    ", c: "sun" },
  { t: "      .              .         (      )   ", c: "sun" },
  { t: "                                '-..-'    ", c: "sun" },
  { t: "  .          .                     .      ", c: "sky" },
  { t: "~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-", c: "sea" },
  { t: "   ~~    ~~~      ~~      ~~~~     ~~     ", c: "sea" },
  { t: " ~~~~  ~~    ~~~~    ~~~      ~~~    ~~~~ ", c: "sea" },
  { t: "~~   ~~~~  ~~    ~~~~   ~~~~~   ~~~~   ~~ ", c: "sea" },
  { t: "  ~~~~   ~~~~~~    ~~~~~    ~~~~~~   ~~~~ ", c: "sea" },
  { t: "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", c: "sea" },
  { t: " _.--~~--._.--~~--._.--~~--._.--~~--._.--~", c: "foam" },
  { t: "  .  ,  .   ,   .  ,   .  ,  .   ,  .   , ", c: "sand" },
  { t: ".:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:.:", c: "sand" },
  { t: "::::::::::::::::::::::::::::::::::::::::::", c: "sand" },
];

// --- Content from the previous Beezynx site, mapped onto the 2a layout ---

export interface Service {
  no: string;
  title: string;
  summary: string;
  tags: string[];
}

export const services: Service[] = [
  {
    no: "01",
    title: "Software Development",
    summary:
      "Custom web applications, mobile apps, and enterprise software built with cutting-edge technologies and best practices.",
    tags: ["Web Apps", "Mobile", "Enterprise"],
  },
  {
    no: "02",
    title: "AI Tools & Automation",
    summary:
      "Intelligent automation solutions, machine learning integration, and AI-powered tools that streamline operations.",
    tags: ["Automation", "Machine Learning", "AI Tools"],
  },
  {
    no: "03",
    title: "Consulting",
    summary:
      "Strategic technology consulting, architecture design, and digital transformation guidance for enterprises.",
    tags: ["Strategy", "Architecture", "Transformation"],
  },
];

export interface Work {
  no: string;
  year: string;
  title: string;
  /** Project kind, e.g. "Tool", "Service", "OpenSource". */
  type: string;
  role: string;
  summary: string;
  tags: string[];
  shot: string;
  /** Real/live site URL. */
  url: string;
  /** LP / details page. */
  lp: string;
  /** Screenshot image (WebP, 16:10). Null = placeholder. */
  image?: string | null;
}

export const works: Work[] = [
  {
    no: "01",
    year: "",
    title: "LazyVlog",
    type: "App",
    role: "Design & Development",
    summary:
      "A mobile app that turns everyday photos into short AI-made video diaries. Choose up to three photos and one of ten moods, and the AI builds a cinematic clip ready to share on YouTube, TikTok or Instagram. Available in nine languages on iOS and Android.",
    tags: ["React Native", "Python + Flask", "Supabase", "Google Cloud"],
    shot: "screenshot — app landing page",
    url: "https://lazyvlog.beezynx.dev/",
    lp: "#",
    image: "/works/work-lazyvlog.webp",
  },
  {
    no: "02",
    year: "2026",
    title: "MangaDSL — Manga Layout Creator",
    type: "OpenSource",
    role: "Language Design & Development",
    summary:
      "A domain-specific language that declares manga panel layouts with four elements: page, row, col and panel. Write a definition to generate a downloadable layout image; the open-source parser and renderer install via pip.",
    tags: ["Manga", "DSL", "Python", "React", "Cloudflare Workers"],
    shot: "screenshot — DSL and generated layout",
    url: "https://manga.beezynx.dev/en/",
    lp: "#",
    image: "/works/work-manga-dsl.webp",
  },
  {
    no: "03",
    year: "2026",
    title: "Manga Editor",
    type: "Tool",
    role: "Design & Development",
    summary:
      "A visual panel-layout editor for comic pages. Split, drag and resize panels on a live canvas, add speech balloons and image layers, and keep every edit in two-way sync with a readable .manga source file.",
    tags: ["Manga", "Visual Editor", "MangaDSL", "React", "Hono", "D1", "Supabase", "Cloudflare Workers"],
    shot: "screenshot — panel editor",
    url: "https://manga-editor.ursytsr.workers.dev/",
    lp: "#",
    image: "/works/work-manga-editor.webp",
  },
  {
    no: "04",
    year: "2026",
    title: "Character Palette",
    type: "Tool",
    role: "Design & Development",
    summary:
      "Keeps a character's look consistent across every panel when making manga art with generative AI. Build a character lineup and turnaround sheets as references, then generate panel illustrations from them.",
    tags: ["Manga", "Generative AI", "Gemini API", "React", "R2", "Cloudflare Workers"],
    shot: "screenshot — character palette",
    url: "https://image-creator.ursytsr.workers.dev/",
    lp: "#",
    image: "/works/work-character-palette.webp",
  },
  {
    no: "05",
    year: "2026",
    title: "Life As Comic",
    type: "Service",
    role: "Design & Development",
    summary:
      "A service that turns your life story into an original comic book. Interview sessions become a script and finished art, delivered as a printed hardcover and a digital edition.",
    tags: ["Manga", "Service", "Web", "React", "Cloudflare Workers"],
    shot: "screenshot — landing page",
    url: "https://lifeascomic.mangacomic.org/",
    lp: "#",
    image: "/works/work-life-as-comic.webp",
  },
  {
    no: "06",
    year: "2026",
    title: "Storyboard Planner",
    type: "Tool",
    role: "Design & Development",
    summary:
      "A tool for planning a manga's page breakdown — mapping the story onto pages and panels before drawing begins.",
    tags: ["Manga", "Storyboard", "Planning", "React", "Cloudflare Workers"],
    shot: "screenshot — storyboard tool",
    url: "https://storyboard.ursytsr.workers.dev/login",
    lp: "#",
    image: "/works/work-storyboard.webp",
  },
  {
    no: "07",
    year: "2026",
    title: "Small Talk Topic Cards",
    type: "Tool",
    role: "Design & Development",
    summary:
      "Conversation-starter cards for Japanese learners. Choose categories from food and travel to ethics and politics, then tap a card to reveal a question to talk about.",
    tags: ["Language Learning", "Conversation", "React", "Cloudflare Workers"],
    shot: "screenshot — topic cards",
    url: "https://smalltalk.ursytsr.workers.dev/",
    lp: "#",
    image: "/works/work-smalltalk.webp",
  },
  {
    no: "08",
    year: "2026",
    title: "Memory Game (Multiplayer)",
    type: "Tool",
    role: "Design & Development",
    summary:
      "A multiplayer memory card game for putting what you've learned to the test. Match English phrases with their Japanese translations, or hiragana with katakana, and play against others.",
    tags: ["Language Learning", "Multiplayer", "React", "Cloudflare Workers"],
    shot: "screenshot — game list",
    url: "https://memory-game2.ursytsr.workers.dev/",
    lp: "#",
    image: "/works/work-memory-game.webp",
  },
  {
    no: "09",
    year: "2026",
    title: "Hiragana & Katakana Memory Hint",
    type: "Tool",
    role: "Design & Development",
    summary:
      "Learn hiragana and katakana through illustrated memory aids. Study the characters in order, practice at random, or drill a custom set.",
    tags: ["Language Learning", "Kana", "React", "Cloudflare Workers"],
    shot: "screenshot — learning modes",
    url: "https://hiragana-memory-hint.ursytsr.workers.dev/",
    lp: "#",
    image: "/works/work-hiragana-hint.webp",
  },
  {
    no: "10",
    year: "2026",
    title: "Japanese Practice — Kana Puzzle & Flashcards",
    type: "Tool",
    role: "Design & Development",
    summary:
      "A game where you place each hiragana and katakana in its correct spot on the chart, plus flashcards for JLPT N5 vocabulary and custom CSV-based decks.",
    tags: ["Language Learning", "Game", "Flashcards", "React", "Cloudflare Workers"],
    shot: "screenshot — practice menu",
    url: "https://nihongo-learn.ursytsr.workers.dev/",
    lp: "#",
    image: "/works/work-nihongo-learn.webp",
  },
  {
    no: "11",
    year: "2026",
    title: "YouTube Playlist Editor",
    type: "Tool",
    role: "Design & Development",
    summary:
      "A simple tool for managing your YouTube playlists. Sign in with Google to reorder videos by drag and drop, copy videos between playlists, remove unwanted items and preview videos before making changes. Available in five languages.",
    tags: ["YouTube Data API", "Google OAuth", "Productivity"],
    shot: "screenshot — playlist editor",
    url: "https://youtube-playlist.site/",
    lp: "#",
    image: "/works/work-youtube-playlist.webp",
  },
];

export interface SpecCell {
  dt: string;
  dd: string;
}

// Hero spec strip — company facts.
export const specs: SpecCell[] = [
  { dt: "Experience", dd: "10+ years" },
  { dt: "Projects", dd: "100+ delivered" },
  { dt: "Focus", dd: "Software · AI · Automation" },
  { dt: "Support", dd: "24/7" },
];
