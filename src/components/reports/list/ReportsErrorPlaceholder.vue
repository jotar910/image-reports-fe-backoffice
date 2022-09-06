<template>
  <i class="pi pi-exclamation-triangle text-warning typ-header-md"></i>
  <p class="typ-header-xs mb-0">Something went wrong</p>
  <p class="typ-body text-placeholder mb-5">Sorry, there was an error fetching the data!</p>
  <Button label="Try again" class="typ-body-sm p-button-sm p-button-outlined p-button-secondary" @click="$emit('retry')"/>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';

defineEmits(['retry']);
</script>

<style scoped></style>
