<template>
  <Sidebar v-model:visible="visible" position="right" class="p-sidebar-lg sidebar-h-full">
    <ReportDetails :report="report" :loading="loading" :error="error" class="relative"
                   @change="updateReportDetails" @refresh="fetchReportDetails">
      <template #header>
        <ReportDetailsHeader :report="report" :loading="loading" :error="error" :showStatus="false">
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
import ReportsInjector, { ReportsService } from '@/data/reports.data';
import { HandleFetchUtilFactory } from '@/factories/handle-fetch-util.factory';

const service = inject(ReportsInjector) as ReportsService;

const visible = ref(false);
const error = ref(false);
const loading = ref(false);
const report = ref(ReportsFactory.emptyReportDetails());
const dataFetcher = HandleFetchUtilFactory.createInstance(loading, error, report);

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
  dataFetcher.fetch(() => service.get(id)).do();
}
</script>
