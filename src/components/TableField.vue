<template>
  <Skeleton v-if="loading" :size="loadingSize" :width="loadingWidth" />
  <div v-else><slot /></div>
</template>

<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';

defineProps(['loading', 'loadingSize', 'loadingWidth']);
</script>
