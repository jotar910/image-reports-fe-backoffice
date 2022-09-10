<template>
  <div class="page-container">
    <header>
      <Card class="border-round-0 border-none">
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
    <footer class="py-3 card-spacer flex justify-content-end" v-if="isLoggedIn">
      <span class="mr-2 p-2 typ-body-md-thin">{{ user || 'Unknown' }}</span>
      <router-link to="/logout" class="p-button p-button-text p-button-secondary p-2 typ-body-md-thin block border-none">
        Logout
      </router-link>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import Card from 'primevue/card';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';

const service = inject(AuthenticationInjector) as AuthenticationService;

const user = computed(() => service.user());
const isLoggedIn = computed(() => service.isLoggedIn());
</script>

<style lang="scss" scoped>
@import '@/styles/abstracts/mixins';
@import '@/styles/abstracts/variables';

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: auto;

  header {
    background-color: var(--background-color);
  }

  main {
    @extend %card-spacer;
    background-color: var(--body-background-color);
    flex-grow: 1;
  }

  .main-wrapper {
    margin: auto;
    max-width: $breakpoint-xl;
  }
}
</style>
