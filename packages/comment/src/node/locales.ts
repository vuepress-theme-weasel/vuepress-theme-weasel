import type { WalineLocaleConfig } from "../typings";

/**
 * Default locale config for Waline
 */
export const walineLocales: WalineLocaleConfig = {
  "/zh/": {
    placeholder: "请留言。(填写邮箱可在被回复时收到邮件提醒)",
  },

  "/zh-tw/": {
    placeholder: "請留言。(填寫信箱可在被回覆時收到郵件提醒)",
  },

  "/en/": {
    placeholder:
      "Write a comment here (Fill in the email address to receive an email notification when being replied)",
  }
};
