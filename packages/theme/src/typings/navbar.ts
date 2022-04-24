import { TextItem } from "./utils";

/**
 * Base nav group, has nav items children
 */
export interface ThemeNavGroup<T> extends TextItem {
  prefix?: string;
  link?: string;
  children: T[];
}
