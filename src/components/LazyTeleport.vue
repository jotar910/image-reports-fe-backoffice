<template>
  <Teleport v-if="render" :to="to">
    <slot></slot>
  </Teleport>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';

const render = ref(false);
nextTick(() => render.value = true);

defineProps({
  to: {
    type: String,
    required: true
  }
});
</script>
