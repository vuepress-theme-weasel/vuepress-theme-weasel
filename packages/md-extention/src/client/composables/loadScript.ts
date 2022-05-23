import { loadScript } from "../components/code-demo/utils";
import type { Code } from "../components/code-demo/utils";

export type ScriptLoadState = Record<string, Promise<void>>;

const state: ScriptLoadState = {};

/**
 * 载入vue
 * @param code
 * @returns
 */
export const loadVue = (code: Code): Promise<void[]> => {
  const promises = [loadScript(state, code.vue)];

  if (code.useBabel) promises.push(loadScript(state, code.babel));
  return Promise.all(promises);
};

/**
 * 载入代码
 * @param code
 * @returns
 */
export const loadNormal = (code: Code): Promise<void> =>
  code.useBabel ? loadScript(state, code.babel) : Promise.resolve();
