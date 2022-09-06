<template>
  <div class="align-items-center flex justify-content-center mr-3" :title="reportStatusFilter(record)">
    <template v-if="record.status === 'NEW'">
      <i class="pi pi-circle text-color-secondary"></i>
    </template>
    <template v-else-if="record.status === 'EVALUATING'">
      <i class="pi pi-spin pi-spinner text-info"></i>
    </template>
    <template v-else-if="record.status === 'PENDING'">
      <i class="pi pi-circle text-info"></i>
    </template>
    <template v-else-if="record.status === 'PUBLISHED'">
      <i v-if="record.approval.status === 'APPROVED'"
         class="pi pi-check-circle text-success"></i>
      <i v-else class="pi pi-times-circle text-error"></i>
    </template>
    <template v-else>
      <i class="pi pi-exclamation-triangle text-warning"></i>
    </template>
  </div>
  <ProgressBar :value="record.evaluation?.grade" :showValue="false" class="flex-grow-1 max-w-15rem mr-3"
               :mode="record.status === 'EVALUATING' ? 'indeterminate' : 'determinate'"
               :class="{'color-info': record.status === 'EVALUATING' || record.status === 'PENDING', 'color-success': record.status === 'PUBLISHED' && record.approval.status === 'APPROVED', 'color-error': record.status === 'PUBLISHED' && record.approval.status === 'REJECTED'}"/>
  <span class="align-items-center flex justify-content-center w-3rem">
    <template v-if="record.status === 'PENDING' || record.status === 'PUBLISHED'">
      {{ record.evaluation?.grade }}%
    </template>
  </span>
</template>

<script lang="ts" setup>
import ProgressBar from 'primevue/progressbar';
import reportStatusFilter from '@/filters/report-status';

defineProps({
  record: {
    type: Object,
    required: true
  }
});
</script>
