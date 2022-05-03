<template>
  <div class="timeline-wrapper">
    <ul class="timeline-content">
      <DropTransition>
        <li class="motto">{{ hint.value }}</li>
      </DropTransition>
      <Toc :items="items" />
      <DropTransition v-for="({ year, items }, index) in timelines.config" :appear="true" :delay="0.08 * (index + 1)" type="group" :key="'timeline' + index">
        <h3 key="title" :id="year" class="timeline-year-title"><span>{{ year }}</span></h3>
        <li class="timeline-year-list" key="content">
          <ul class="timeline-year-wrapper">
            <li class="timeline-item" v-for="({ date, info, path }, idx) in items" :key="'timeline-item' + index + idx">
              <span class="timeline-date">{{ date }}</span>
              <RouterLink :to="path" class="timeline-title">{{ info.title }}</RouterLink>
            </li>
          </ul>
        </li>
      </DropTransition>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { DropTransition, Toc } from '@theme-weasel/components'
import { useBlogOptions } from '../../composables'
import { useThemeLocaleData, useTimelines } from '@theme-weasel/composables'
import { computed } from 'vue';

const blogOptions = useBlogOptions();
const themeLocale = useThemeLocaleData();
const timelines = useTimelines();

const hint = computed(
  () =>
    blogOptions.value.timeline ||
    themeLocale.value.blogLocales!.timelineTitle
);

const items = computed(() =>
  timelines.value.config.map(({ year }) => ({
    title: year.toString(),
    level: 2,
    slug: year.toString(),
    children: [],
  }))
);
</script>

<style lang="scss" scoped>

</style>
