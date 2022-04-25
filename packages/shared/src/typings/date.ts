/**
 * date options
 */
export interface DateOptions {
  /**
   * @default 'en'
   */
  lang?: string;
  timezone?: string;
  /**
   * @default 'full'
   */
  type?: "date" | "time" | "full";
}

/**
 * date 详情
 */
export interface DateDetail {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

/**
 * date 信息
 */
export interface DateInfo {
  display: string;
  value: Date | undefined;
  detail: Partial<DateDetail>;
}
