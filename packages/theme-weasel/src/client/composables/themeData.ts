import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/lib/client";
import { computed } from "vue";
import { getAuthor } from "@mr-huang/vuepress-shared/lib/client";

import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/lib/client";
import type { ComputedRef } from "vue";
import type { AuthorInfo } from "@mr-huang/vuepress-shared";
import type { WeaselThemeOptions, WeaselThemeLocaleData } from "../../types";

export const useThemeData = (): ThemeDataRef<WeaselThemeOptions> =>
  _useThemeData<WeaselThemeOptions>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<WeaselThemeLocaleData> =>
  _useThemeLocaleData<WeaselThemeLocaleData>();

export const useThemeAuthor = (): ComputedRef<AuthorInfo[]> =>
  computed(() => {
    const { author } = useThemeData().value;

    return getAuthor(author, false);
  });

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => {
    const { iconPrefix } = useThemeData().value;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  });

export const useBlogConfig = (): ComputedRef<unknown> =>
  computed(() => {
    const { blog } = useThemeData().value;

    return blog === false ? false : blog || {};
  });

export const usePure = (): ComputedRef<boolean> =>
  computed(() => Boolean(useThemeData().value.pure));
