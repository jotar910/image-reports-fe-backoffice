<template>
  <ReportStatus :report="report" class="mr-3" :title="reportStatusFilter(report)" />
  <ProgressBar :value="report.evaluation?.grade" :showValue="false" class="flex-grow-1 max-w-15rem mr-3"
               :mode="report.status === 'EVALUATING' ? 'indeterminate' : 'determinate'"
               :class="{'color-info': report.status === 'EVALUATING' || report.status === 'PENDING', 'color-success': report.status === 'PUBLISHED' && report.approval.status === 'APPROVED', 'color-error': report.status === 'PUBLISHED' && report.approval.status === 'REJECTED'}"/>
  <span class="align-items-center flex justify-content-center w-3rem">
    <template v-if="report.status === 'PENDING' || report.status === 'PUBLISHED'">
      {{ report.evaluation?.grade || 0 }}%
    </template>
  </span>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import ProgressBar from 'primevue/progressbar';
import ReportStatus from '@/components/reports/ReportStatus.vue';
import reportStatusFilter from '@/filters/report-status';
import { ReportDetailsModel } from '@/models/report-details.model';

defineProps({
  report: {
    type: Object as PropType<Pick<ReportDetailsModel, 'status' | 'evaluation' | 'approval'>>,
    required: true
  }
});
</script>
