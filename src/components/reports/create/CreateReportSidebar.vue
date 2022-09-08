<template>
  <Sidebar v-model:visible="visible" position="right" class="p-sidebar-md sidebar-h-full">
    <template #header>
      <h1 class="typ-header-xs-bold">Add new report</h1>
    </template>
    <CreateReportForm @submitted="close(true)"/>
  </Sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Sidebar from 'primevue/sidebar';
import CreateReportForm from '@/components/reports/create/CreateReportForm.vue';

const visible = ref(false);

const emit = defineEmits(['close']);
defineExpose({ show, close });

function show() {
  visible.value = true;
}

function close<T>(payload?: T) {
  emit('close', payload);
  visible.value = false;
}
</script>
