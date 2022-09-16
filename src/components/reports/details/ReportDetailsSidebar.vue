<template>
  <Sidebar v-model:visible="visible" position="right" class="p-sidebar-lg sidebar-h-full">
    <ReportDetails :report="report" :loading="loading" :error="error" class="relative"
                   @changed="updateReportDetails" @refresh="fetchReportDetails">
      <template #header>
        <ReportDetailsHeader :report="report" :loading="loading" :error="error" :disable="publishing" :showStatus="false"
                             @approve="publishReport('APPROVED')" @reject="publishReport('REJECTED')">
          <router-link :to="'/'+report.id" class="p-button p-button-link p-button-secondary text-body truncate p-0">
            <h1 class="typ-header-sm-medium my-3">Report name</h1>
          </router-link>
          <template #loading>
            <Skeleton class="my-3" width="min(100%, 18rem)" height="38px"/>
          </template>
          <template #error>
            <Skeleton animation="none" class="my-3" width="min(100%, 18rem)" height="38px"/>
          </template>
        </ReportDetailsHeader>
      </template>
    </ReportDetails>
  </Sidebar>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { merge } from 'lodash';
import Sidebar from 'primevue/sidebar';
import Skeleton from 'primevue/skeleton';
import ReportDetails from '@/components/reports/details/ReportDetails.vue';
import ReportDetailsHeader from '@/components/reports/details/ReportDetailsHeader.vue';
import { IRealtimeReportChanges } from '@/data/reports-realtime.data';
import { ReportsFactory } from '@/factories/reports.factory';
import ReportsInjector, { IReportsService } from '@/data/reports.data';
import { useHandleFetch } from '@/utils/handle-fetch.util';
import { usePublishReport } from '@/utils/publish-report.util';
import { ReportApprovalStatusType } from '@/models/report-status.type';
import ApiDataInjector, { IApiDataConfig } from '@/configs/apidata.config';

const service = inject(ReportsInjector) as IReportsService;
const apiConfigs = inject(ApiDataInjector) as IApiDataConfig;

const visible = ref(false);
const error = ref(false);
const loading = ref(false);
const report = ref(ReportsFactory.emptyReportDetails());
const publishing = ref(false);

const dataFetcher = useHandleFetch(loading, error, report);
const publisher = usePublishReport(publishing);

const emit = defineEmits(['close']);
defineExpose({ show, close });

function show(id: number) {
  fetchReportDetails(id);
  visible.value = true;
}

function close<T>(payload?: T) {
  emit('close', payload);
  visible.value = false;
}

function updateReportDetails(changes: IRealtimeReportChanges) {
  report.value = merge(report.value, changes);
}

function fetchReportDetails(id: number) {
  dataFetcher.fetch(() => service.get(id, apiConfigs)).do();
}

function publishReport(status: ReportApprovalStatusType) {
  publisher.publish(report.value.id, status);
}
</script>
