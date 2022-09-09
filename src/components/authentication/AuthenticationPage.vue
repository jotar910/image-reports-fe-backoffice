<template>
  <PageLayout class="relative">
    <template #header>
      <ReportsListHeader/>
    </template>
    <Card class="p-2">
      <template #content>
        <ReportsTable/>
      </template>
    </Card>
    <Overlay>
      <Card class="content-card bg-white max-w-30rem">
        <template #content>
          <slot></slot>
        </template>
      </Card>
    </Overlay>
  </PageLayout>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import Card from 'primevue/card';
import Overlay from '@/components/Overlay.vue';
import PageLayout from '@/components/PageLayout.vue';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';
import ReportsListHeader from '@/components/reports/list/ReportsHeader.vue';
import ReportsInjector from '@/data/reports.data';
import { NoopReportsService } from '@/utils/reports-data.util';
import HandleFetchUtilInjector, { HandleInfiniteFetchUtil } from '@/utils/handle-fetch.util';

provide(ReportsInjector, new NoopReportsService());
provide(HandleFetchUtilInjector, HandleInfiniteFetchUtil);
</script>

<style lang="scss" scoped>
@import '@/styles/abstracts/variables';

.content-card {
  margin: $spacer-md;

  @media screen and (min-height: $breakpoint-sm) {
    margin-bottom: max($spacer-md, 25vh);
  }
}
</style>
