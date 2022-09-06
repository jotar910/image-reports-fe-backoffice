<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
