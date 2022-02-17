import type { BasePageFrontMatter } from "@mr-huang/vuepress-shared";
import type { GitPluginPageData } from "@vuepress/plugin-git";
// import type { MediaLinksConfig } from "./options";
// import type { AutoLink } from "./navbar";
// import type { SidebarConfig } from "./sidebar";

export interface WeaselThemePageData extends GitPluginPageData {
  filePathRelative: string | null;
  routeMeta: {
    title: string;
    icon?: string;
  };
}

export interface WeaselThemePageFrontmatter extends BasePageFrontMatter {
  navbar?: boolean;
  pageClass?: string;
  // medialinks?: MediaLinksConfig | false;
}

export interface WeaselThemeHomePageFrontmatter extends WeaselThemePageFrontmatter {
  home: true;
  heroImage?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;
  actions?: {
    text: string;
    link: string;
    type?: "primary" | "secondary";
  }[];
  features?: {
    title: string;
    details: string;
  }[];
}

export interface WeaselThemeNormalPageFrontmatter
  extends WeaselThemePageFrontmatter {
  home?: false;
  // sidebar?: "auto" | false | SidebarConfig;
  sidebarHeadingDepth?: number;

  meta?: {
    lastUpdated?: boolean;
    contributors?: boolean;
    editLink?: boolean;
    // prev?: string | AutoLink;
    // next?: string | AutoLink;
  };
}

export interface ActionConfig {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface ProjectHomePageFrontmatter
  extends WeaselThemeHomePageFrontmatter {
  home: true;
  heroImage?: string;
  darkHeroImage?: string;
  heroAlt?: string;
  heroText?: string;
  tagline?: string;
  actions?: ActionConfig[];
  features?: {
    title: string;
    details: string;
    link?: string;
  }[];
}
