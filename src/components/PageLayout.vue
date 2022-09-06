<template>
  <div class="page-container">
    <header>
      <Card class="border-round-0">
        <template #content>
          <div class="header-wrapper">
            <slot name="header"></slot>
          </div>
        </template>
      </Card>
    </header>
    <main>
      <div class="main-wrapper">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
</script>

<style lang="scss" scoped>
@import '@/styles/abstracts/mixins';
@import '@/styles/abstracts/variables';

.page-container {
  height: 100vh;
  width: 100%;
  overflow: auto;

  header {
    background-color: var(--background-color);
  }

  main {
    @extend %card-spacer;
    background-color: var(--body-background-color);
  }

  .header-wrapper,
  .main-wrapper {
    margin: auto;
    max-width: $breakpoint-2xl;
  }
}
</style>
