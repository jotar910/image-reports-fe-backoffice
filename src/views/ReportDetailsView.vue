<template>
  <PageLayout>
    <template #header>
      <ReportDetailsHeader :report="report" :disable="publishing"
                           @approve="publishReport('APPROVED')"
                           @reject="publishReport('REJECTED')">
        <h1 class="typ-header-sm-bold truncate">Report name</h1>
      </ReportDetailsHeader>
    </template>
    <div class="back-link-container">
      <router-link to="/" class="p-button p-button-secondary p-button-link no-underline">
        <i class="pi pi-arrow-left typ-body-md-medium"></i>
        <span class="ml-2 typ-body-md-medium">Back</span>
      </router-link>
    </div>
    <Card>
      <template #content>
        <ReportDetails :loading="loading" :error="error" :report="report" class="details-grid"
                       @changed="updateReportDetails" @refresh="fetchReportDetails"/>
      </template>
    </Card>
  </PageLayout>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { merge } from 'lodash';
import Card from 'primevue/card';
import PageLayout from '@/components/PageLayout.vue';
import ReportDetails from '@/components/reports/details/ReportDetails.vue';
import ReportDetailsHeader from '@/components/reports/details/ReportDetailsHeader.vue';
import { ReportsFactory } from '@/factories/reports.factory';
import ReportsInjector, { IReportsService } from '@/data/reports.data';
import { IRealtimeReportChanges } from '@/data/reports-realtime.data';
import { useHandleFetch } from '@/utils/handle-fetch.util';
import { usePublishReport } from '@/utils/publish-report.util';
import { ReportApprovalStatusType } from '@/models/report-status.type';

const service = inject(ReportsInjector) as IReportsService;

const error = ref(false);
const loading = ref(false);
const report = ref(ReportsFactory.emptyReportDetails());
const publishing = ref(false);

const dataFetcher = useHandleFetch(loading, error, report);
const publisher = usePublishReport(publishing);

const route = useRoute();

onMounted(() => {
  fetchReportDetails();
});

function fetchReportDetails() {
  dataFetcher.fetch(() => service.get(+route.params.id)).do();
}

function updateReportDetails(changes: IRealtimeReportChanges) {
  report.value = merge(report.value, changes);
}

function publishReport(status: ReportApprovalStatusType) {
  publisher.publish(report.value.id, status);
}
</script>

<style lang="scss" scoped>
@import '~@/styles/abstracts/variables';

.details-grid {
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: $breakpoint-xl) {
    grid-template-columns: auto 1fr;
  }
}

.back-link-container {
  a {
    left: -$spacer-md;
    position: relative;
    margin: $spacer-sm 0;

    @media screen and (min-width: $breakpoint-md) {
      margin: $spacer-lg 0;
    }

    @media screen and (min-width: $breakpoint-lg) {
      left: -$spacer-2xl;
      margin: $spacer-3xl 0;
    }
  }
}
</style>
