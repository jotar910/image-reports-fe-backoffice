<template>
  <PageLayout>
    <template #header>
      <ReportDetailsHeader :report="report">
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
        <ReportDetails :loading="loading" :error="error" :report="report" class="details-grid" @refresh="fetchReportDetails"/>
      </template>
    </Card>
  </PageLayout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import PageLayout from '@/components/PageLayout.vue';
import ReportDetails from '@/components/reports/details/ReportDetails.vue';
import ReportDetailsHeader from '@/components/reports/details/ReportDetailsHeader.vue';
import { ReportsFactory } from '@/factories/reports.factory';
import { inject, onMounted, ref } from 'vue';
import ReportsInjector, { ReportsService } from '@/data/reports.data';
import { HandleFetchUtilFactory } from '@/factories/handle-fetch-util.factory';

const service = inject(ReportsInjector) as ReportsService;

const error = ref(false);
const loading = ref(false);
const report = ref(ReportsFactory.emptyReportDetails());
const dataFetcher = HandleFetchUtilFactory.createInstance(loading, error, report);

const route = useRoute();

onMounted(() => {
  fetchReportDetails();
});

function fetchReportDetails() {
  dataFetcher.fetch(() => service.get(+route.params.id)).do();
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