export type ArraySortFn<T> = (pageA: T, pageB: T) => number
export type ArrayMapFn<T> = (value: T, index: number, array: T[]) => any[]

/**
 * Base link item, displayed as text
 */
export interface TextItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Props for `<AutoLink>`
 */
export interface AutoLink extends TextItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
}
