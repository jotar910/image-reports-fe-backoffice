<template>
  <div class="flex flex-wrap align-items-center justify-content-between column-gap-5">
    <div class="flex column-gap-5 overflow-hidden" v-if="!loading && !error">
      <slot></slot>
      <ReportStatus v-if="showStatus" :report="report" class="mr-3" :title="reportStatusFilter(report)" iconClass="typ-body-lg mt-1"/>
    </div>
    <slot v-else-if="!error" name="loading"></slot>
    <slot v-else name="error"></slot>
    <div class="flex column-gap-2 ml-auto" v-if="loading || error">
      <Skeleton :animation="error ? 'none' : 'wave'" class="p-2 h-2rem w-6rem"/>
      <Skeleton :animation="error ? 'none' : 'wave'" class="p-2 h-2rem w-5rem"/>
    </div>
    <div class="flex column-gap-2 ml-auto" v-else-if="report.status === 'PENDING'">
      <Button label="Approve" class="p-button-success p-button-text" icon="pi pi-check-circle"
              :disabled="disable" @click="$emit('approve')"/>
      <Button label="Reject" class="p-button-danger p-button-text" icon="pi pi-times-circle"
              :disabled="disable" @click="$emit('reject')"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';
import ReportStatus from '@/components/reports/ReportStatus.vue';
import reportStatusFilter from '@/filters/report-status';
import { ReportDetailsModel } from '@/models/report-details.model';

defineProps({
  report: {
    type: Object as PropType<ReportDetailsModel>,
    required: true
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  error: {
    type: Boolean,
    required: false,
    default: false
  },
  disable: {
    type: Boolean,
    required: false,
    default: false
  },
  showStatus: {
    type: Boolean,
    required: false,
    default: true
  }
});
defineEmits(['approve', 'reject']);
</script>
