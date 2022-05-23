<template>
  <div class="code-demo-wrapper" :id="id">
    <div class="loading" v-if="!loaded" v-html="LoadingSvg"></div>
    <div class="code-demo-header">
      <span class="title" v-if="title">{{ decodeURIComponent(title) }}</span>
    </div>

    <div :class="['code-demo-container']" ref="demoWrapper">

    </div>

    <div class="code-demo-code-wrapper">
      <div class="code-demo-codes-content" :style="{ height }">
        <div class="code-demo-codes" ref="codeContainer">
          <slot></slot>
        </div>
      </div>
      <div class="code-toggle" @click="toggleExpand">查看源码</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoadingSvg } from '../icons'
import { ref, computed, PropType, onMounted } from 'vue'
import { CodeDemoOptions } from '../../../typings';
import { createNormalCode, createVueCode, getCode, injectCSS, injectScript } from './utils';
import { loadVue, loadNormal } from '../../composables'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<"normal" | "vue">,
    default: "normal",
  },

  title: {
    type: String,
    default: "",
  },

  config: {
    type: String,
    default: "",
  },

  code: {
    type: String,
    required: true,
  }
})

const isExpanded = ref(false);
// const codeWrapper = ref<HTMLDivElement | null>(null);
const demoWrapper = ref<HTMLDivElement | null>(null);
const codeContainer = ref<HTMLDivElement | null>(null);
const height = ref("0");
const loaded = ref(false);

const config = computed(
  () =>
    JSON.parse(
      decodeURIComponent(props.config || "{}")
    ) as Partial<CodeDemoOptions>
);

const codeType = computed(() => {
  const codeConfig = JSON.parse(
    decodeURIComponent(props.code || "{}")
  ) as Record<string, string>;

  return getCode(codeConfig);
});

const code = computed(() =>
    props.type === "vue"
    ? createVueCode(codeType.value, config.value)
    : createNormalCode(codeType.value, config.value)
);

const isLegal = computed(() => code.value.isLegal);

const toggleExpand = () => {
  height.value = isExpanded.value ? '0' : `${codeContainer.value!.clientHeight}px`
  isExpanded.value = !isExpanded.value
}

const initDom = (innerHTML = false): void => {
  // attach a shadow root to demo

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shadowRoot = demoWrapper.value!.attachShadow({ mode: "open" });
  const appElement = document.createElement("div");

  appElement.classList.add("code-demo-app");
  shadowRoot.appendChild(appElement);

  console.log(shadowRoot)

  if (isLegal.value) {
    if (innerHTML) appElement.innerHTML = code.value.html;
    injectCSS(shadowRoot, code.value);
    injectScript(props.id, shadowRoot, code.value);

    height.value = "0";
  } else height.value = "auto";

  loaded.value = true;
};

const loadDemo = (): Promise<void> => {
  console.log(code.value)
  switch (props.type) {
    case "vue": {
      return loadVue(code.value).then(() => initDom());
    }

    default: {
      return loadNormal(code.value).then(() => initDom(true));
    }
  }
};

onMounted(() => {
  setTimeout(() => {
    void loadDemo();
  }, MARKDOWN_ENHANCE_DELAY);
});
</script>
