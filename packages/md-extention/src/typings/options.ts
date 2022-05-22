import { LocaleConfig } from "@vuepress/core";
import { CodeDemoOptions } from "./codeDemo";
import { MdExtentionLocaleData } from "./locales";

export interface MdExtentionOptions {
  /**
   * Whether to enable custom container including
   *
   * - info
   * - note
   * - tip
   * - warning
   * - danger
   * - details
   *
   * ⚠ The last 4 items conflict with default theme and will overide it’s style.
   *
   * 是否启用自定义容器
   *
   * - info
   * - note
   * - tip
   * - warning
   * - danger
   * - details
   *
   * ⚠ 最后四个会和默认主题冲突，且会覆盖默认主题的样式与行为。
   *
   * @default false
   */
  container?: boolean;

  /**
   * Whether to enable all features.
   *
   * 是否启用全部增强语法
   *
   * @default false
   */
  enableAll?: boolean;

  /**
   * Locale config
   *
   * 国际化配置选项
   */
  locales?: LocaleConfig<MdExtentionLocaleData>;

  /**
   * Whether to enable code-demo support
   *
   * 是否启用代码示例功能
   *
   * @default false
   */
  demo?: Partial<CodeDemoOptions> | boolean;
}
