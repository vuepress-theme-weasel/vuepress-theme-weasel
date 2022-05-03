<template>
  <div class="timeline-list-wrapper">
    <div class="timeline-list-title">
      <TimelineIcon />
      <span class="num">{{ timelines.items.length }}</span>
    </div>
    <hr />
    <div class="timeline-content">
      <ul class="timeline-list">
        <DropTransition v-for="({ year, items }, index) in timelines.config" :appear="true" :delay="0.08 * (index + 1)" :key="'tagconfig' + index">
          <li>
            <h3 class="timeline-year">{{ year }}</h3>
            <ul class="timeline-year-wrapper">
              <li class="timeline-item" v-for="({ date, info, path }, idx) in items" :key="'taglist' + index + idx">
                <span class="timeline-date">{{ date }}</span>
                <RouterLink :to="path" class="timeline-title">{{ info.title }}</RouterLink>
              </li>
            </ul>
          </li>
        </DropTransition>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TimelineIcon } from '@theme-weasel/modules/blog/components/icons'
import { useTimelines } from '@theme-weasel/composables'
import { DropTransition } from '@theme-weasel/components'
import { RouterLink } from 'vue-router'

const timelines = useTimelines();

console.log('+++++++++++++++++++', timelines)

</script>

<style lang="scss" scoped>

</style>
