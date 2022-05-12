
export interface ThemeHomeActionOptions {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface ThemeHomeFeatureOptions {
  icon?: string;
  title: string;
  details: string;
  link?: string;
}

export interface ThemeProjectHomePageFrontmatter {
  home: true;
  heroImage?: string;
  heroImageDark?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;

  actions?: ThemeHomeActionOptions[];
  features?: ThemeHomeFeatureOptions[];
}
