<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component"/>
    </transition>
  </router-view>
  <Toast/>
</template>

<script lang="ts" setup>
import Toast from 'primevue/toast';
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
