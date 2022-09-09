<template>
  <div class="align-items-center flex column-gap-2">
    <template v-if="report.status === 'NEW'">
      <i class="pi pi-circle text-color-secondary" :class="iconClass"></i>
    </template>
    <template v-else-if="report.status === 'EVALUATING'">
      <i class="pi pi-spin pi-spinner text-info" :class="iconClass"></i>
    </template>
    <template v-else-if="report.status === 'PENDING'">
      <i class="pi pi-circle text-info" :class="iconClass"></i>
    </template>
    <template v-else-if="report.status === 'PUBLISHED'">
      <i v-if="report.approval.status === 'APPROVED'"
         class="pi pi-check-circle text-success" :class="iconClass"></i>
      <i v-else class="pi pi-times-circle text-error" :class="iconClass"></i>
    </template>
    <template v-else>
      <i class="pi pi-exclamation-triangle text-warning" :class="iconClass"></i>
    </template>
    <span v-if="showLabel" :class="labelClass">{{ reportStatusFilter(report) }}</span>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import reportStatusFilter from '@/filters/report-status';
import { ReportDetailsModel } from '@/models/report-details.model';

defineProps({
  report: {
    type: Object as PropType<Pick<ReportDetailsModel, 'status' | 'approval'>>,
    required: true
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: false
  },
  iconClass: {
    type: String,
    required: false,
    default: ''
  },
  labelClass: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
span {
  margin-top: 1px;
}
</style>
