<template>
  <PageLayout>
    <template #header>
      <ReportsListHeader/>
    </template>
    <Card class="p-2">
      <template #content>
        <ReportsTable/>
      </template>
    </Card>
  </PageLayout>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
import PageLayout from '@/components/PageLayout.vue';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';
import ReportsListHeader from '@/components/reports/list/ReportsHeader.vue';
</script>
