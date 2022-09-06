<template>
  <Skeleton v-if="loading" v-bind="$attrs" />
  <div v-else><slot /></div>
</template>

<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';

defineProps(['loading']);
</script>
