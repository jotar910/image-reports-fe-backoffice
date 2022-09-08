<template>
  <PageLayout>
    <template #header>
      <ReportsListHeader @addReport="$refs.createReport.show()"/>
    </template>
    <Card class="p-2">
      <template #content>
        <ReportsTable ref="reportsTable" @addReport="$refs.createReport.show()"/>
      </template>
    </Card>
    <CreateReportSidebar ref="createReport" @close="$event && $refs.reportsTable.refresh()" />
  </PageLayout>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
import PageLayout from '@/components/PageLayout.vue';
import CreateReportSidebar from '@/components/reports/create/CreateReportSidebar.vue';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';
import ReportsListHeader from '@/components/reports/list/ReportsHeader.vue';
</script>
