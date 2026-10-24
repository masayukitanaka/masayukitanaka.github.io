import type { Config } from "@react-router/dev/config";

export default {
  // GitHub Pages serves static files only — no server runtime.
  // Disable SSR and prerender every route to static HTML at build time.
  ssr: false,
  prerender: ["/"],
} satisfies Config;
