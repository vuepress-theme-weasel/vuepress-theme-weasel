import { computed } from "vue";

import { useThemeLocaleData } from "@theme-weasel/composables";

import type { ComputedRef } from "vue";
import type { ThemeMetaLocateData } from "../../../../typings";

export const useMetaLocale = (): ComputedRef<ThemeMetaLocateData> => {
  const themeLocale = useThemeLocaleData();

  return computed(() => themeLocale.value.metaLocales!);
};
