<template>
  <Skeleton v-if="loading || error" :animation="error ? 'none' : 'wave'"
            :width="loadingWidth" :height="loadingHeight" :size="loadingSize" />
  <div v-else class="break-word"><slot /></div>
</template>

<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';

defineProps(['loading', 'error', 'loadingWidth', 'loadingHeight', 'loadingSize']);
</script>

