<template>
  <div class="pager clear" v-if="enable">
    <ul class="page-con">
      <li class="prev" :class="{disabled: currentPage === 1}">
        <a v-if="currentPage > 1" href="javascript:;">上一页</a>
        <span v-else>上一页</span>
      </li>
      <li v-if="displayLeftEllipsis"><a href="javascript:;" data-page="1" @click="navigate(1)">1</a></li>
      <li v-if="displayLeftEllipsis" class="disabled"><span>...</span></li>
      <li v-for="index in indexs" :key="'pagination' + index" :class="{ current: currentPage === index }"><a href="javascript:;" :data-page="index" @click="navigate(index)">{{ index }}</a></li>
      <li v-if="displayRightEllipsis" class="disabled"><span>...</span></li>
      <li v-if="displayRightEllipsis"><a href="javascript:;" :data-page="totalPages" @click="navigate(totalPages)">{{totalPages}}</a></li>
      <li class="next"><a href="javascript:;">下一页</a></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PaginationLocaleData } from '../../../typings';
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client';
import { computed } from 'vue'

const props = defineProps({
  /**
   * 总数
   */
  total: { type: Number, default: 10 },
  /**
   * 上一页
   */
  perPage: { type: Number, default: 10 },
  /**
   * 当前页
   */
  currentPage: { type: Number, default: 1 },
})

const emit = defineEmits(['updateCurrentPage'])

const locale = useLocaleConfig<PaginationLocaleData>(PAGINATION_LOCALES);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
const enable = computed(() => Boolean(totalPages.value) && totalPages.value !== 1)
const displayLeftEllipsis = computed(() => {
  if (totalPages.value < 7) return false;
  return props.currentPage > 4;
})
const displayRightEllipsis = computed(() => {
  if (totalPages.value < 7) return false;
  return props.currentPage < totalPages.value - 3;
})

const indexs = computed(() => {
  const { currentPage } = props;
  let min = 1;
  let max = totalPages.value;
  const arr = [];

  if (totalPages.value >= 7)
    if (currentPage <= 4 && currentPage < totalPages.value - 3) {
      min = 1;
      max = 5;
    } else if (currentPage > 4 && currentPage >= totalPages.value - 3) {
      max = totalPages.value;
      min = totalPages.value - 4;
    } else if (totalPages.value > 7) {
      min = currentPage - 2;
      max = currentPage + 2;
    }

  // Generate page index
  for (let i = min; i <= max; i++) arr.push(i);

  return arr;
})

const navigate = (page: number): void => emit('updateCurrentPage', page)

/** Check and navigate to certain page */
const jumpPage = (index: string): void => {
  const pageNum = parseInt(index);

  if (pageNum <= totalPages.value && pageNum > 0) {
    navigate(pageNum);
  } else {
    alert(locale.value.errorText.replace(/\$page/g, totalPages.value.toString()));
  }
}

</script>
