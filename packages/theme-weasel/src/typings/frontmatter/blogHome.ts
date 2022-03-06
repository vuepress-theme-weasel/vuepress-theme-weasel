import type { WeaselThemePageFrontmatter } from "./base";

export interface WeaselThemeBlogHomeProjectOptions {
  name: string;
  type: "article" | "book" | "link" | "project" | "friend";
  desc?: string;
  cover?: string;
  link: string;
}

export interface WeaselThemeBlogHomePageFrontmatter
  extends WeaselThemePageFrontmatter {
  home: true;
  layout: "BlogHome";
  /**
   * @default true
   */
  hero?: boolean;
  /**
   * @default false
   */
  heroFullScreen?: boolean;
  heroImage?: string;
  heroImageStyle?: Record<string, string>;
  heroAlt?: string;
  heroText?: string | null;
  /**
   * @default true
   */
  showTitle?: boolean;
  bgImage?: string;
  bgImageStyle?: Record<string, string>;
  tagline?: string | null;
  projects: WeaselThemeBlogHomeProjectOptions[];
}
