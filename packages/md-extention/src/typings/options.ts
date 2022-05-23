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

  /**
   * The delay of operating dom, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * 操作页面 DOM 的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 500
   */
  delay?: number;
}
