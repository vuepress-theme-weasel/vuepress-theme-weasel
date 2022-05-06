import { usePreferredDark, useStorage } from "@vueuse/core";
import { computed, inject, onMounted, onUnmounted, provide, watch } from "vue";
import { useThemeData } from "@theme-weasel/composables";

import type { InjectionKey, Ref, WritableComputedRef } from "vue";

export type PureModeRef = WritableComputedRef<boolean>;
export type PureModeStatusRef = Ref<boolean>;

export interface PureMode {
  isPure: PureModeRef
  status: PureModeStatusRef
}

export const pureModeSymbol: InjectionKey<PureMode> = Symbol.for("pureMode");

/**
 * Inject dark mode global computed
 */
export const usePureMode = (): PureMode => {
  const puremode = inject(pureModeSymbol);

  if (!puremode) {
    throw new Error("usePureMode() is called without provider.");
  }

  return puremode;
};

export const updatePureModeAttr = (isPureMode: PureModeStatusRef): void => {
  const update = (isPure = isPureMode.value): void => {
    const html = window?.document.querySelector("html");

    html?.setAttribute("data-pure", isPure ? "true" : "false");
  };

  onMounted(() => {
    watch(isPureMode, update, { immediate: true });
  });

  onUnmounted(() => update());
};

export const setupPureMode = (): void => {
  const themeData = useThemeData();
  const pureModeStorage = useStorage<boolean>(
    "vuepress-theme-weasel-scheme-pure",
    false
  );

  const isPureMode = computed<boolean>(() => {
    const { puremode } = themeData.value;
    // disable dark mode
    return puremode === "disable"
      ? false
      : // force dark
      puremode
  });

  provide(pureModeSymbol, { isPure: isPureMode, status: pureModeStorage });

  updatePureModeAttr(pureModeStorage);
};
