export type SiteKey = "freelance" | "personal";

export interface SiteConfig {
  brand: string;
  mark: string;
  domain: string;
}

const SITES: Record<SiteKey, SiteConfig> = {
  freelance: { brand: "Beezynx", mark: "BX", domain: "beezynx.dev" },
  personal: {
    brand: "Masayuki Tanaka",
    mark: "MT",
    domain: "masayukitanaka.github.io",
  },
};

/**
 * Resolve the active site from a build-time value (e.g. PUBLIC_SITE).
 * Defaults to "freelance" (this repo deploys beezynx.dev).
 */
export function resolveSite(value?: string | null): SiteConfig {
  const key: SiteKey = value === "personal" ? "personal" : "freelance";
  return SITES[key];
}
