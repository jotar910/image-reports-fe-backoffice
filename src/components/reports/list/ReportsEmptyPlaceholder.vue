<template>
  <i class="pi pi-exclamation-circle text-primary typ-header-md"></i>
  <p class="typ-header-xs mb-0">No reports found</p>
  <p class="typ-body text-placeholder mb-5">Sorry, we couldn't find any data!</p>
  <Button label="Add new report" icon="pi pi-plus" class="typ-body-sm p-button-sm" @click="$emit('add')"/>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';

defineEmits(['add']);
</script>

<style scoped></style>
