<template>
  <section class="hero-main">
    <div>
      <img :src="frontmatter.heroImage" alt="hero" />
      <p class="description">{{ frontmatter.tagline }}</p>
      <div class="home-badges">
        <a v-for="(badge, index) in frontmatter.badges" :key="'badge' + index" :target="badge.black === false ? 'self' : '_black'" :href="badge.link">
          <img :alt="badge.text" :src="badge.imgUrl" />
        </a>
      </div>
      <p class="actions">
        <a v-for="(action, index) in frontmatter.actions" :href="action.link" class="nav-link action-button" :class="{ primary: action.type === 'primary' }" :style="action.style || {}">{{ action.text }}</a>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'
const frontmatter = usePageFrontmatter()
</script>

<style lang="scss" scoped>
.hero-main {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 3.4rem);
  min-height: 452px;
  overflow: hidden;
  text-align: center;
  background: url(../../../../../../templates/assets/bg.svg) 50%/cover no-repeat;
  .description {
    font-size: 20px;
    margin-bottom: 2rem;
  }
  .home-badges {
    a {
      margin-right: 0.4rem;
    }
  }
  .action-button {
    display: inline-block;
    overflow: hidden;
    margin: 0.6rem 0.8rem;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--theme-color);
    border-radius: 0.5rem;
    color: var(--theme-color);
    font-size: 1.2rem;
    transition: background-color var(--color-transition),color var(--color-transition);
    &:hover, &.primary {
      background-color: var(--theme-color);
      color: var(--white);
    }
  }
}
</style>
