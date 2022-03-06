import type { WeaselThemePageFrontmatter } from "./base";

export interface WeaselThemeHomeActionOptions {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface WeaselThemeHomeFeatureOptions {
  icon?: string;
  title: string;
  details: string;
  link?: string;
}

export interface WeaselThemeProjectHomePageFrontmatter
  extends WeaselThemePageFrontmatter {
  home: true;
  heroImage?: string;
  heroImageDark?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;

  actions?: WeaselThemeHomeActionOptions[];
  features?: WeaselThemeHomeFeatureOptions[];
}
