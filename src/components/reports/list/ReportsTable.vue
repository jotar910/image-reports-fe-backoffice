<template>
  <DataTable :value="items" :lazy="true" responsiveLayout="stack" stripedRows
             :selectionMode="items?.length && !loading && !error ? 'single' : null" @rowSelect="onRowSelect"
             :loading="loading" :loadingIcon="null" @rowContextmenu="$refs.menu.showContextMenu($event.originalEvent, $event.data)"
             paginatorTemplate="RowsPerPageDropdown CurrentPageReport CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
             :paginator="true" :paginatorPosition="tableConfigs.paginatorPosition" :totalRecords="list.totalElements"
             :first="list.page * rows" :rows="rows" @page="changeTablePage"
             :rowsPerPageOptions="tableConfigs.rowsPerPage" :pageLinkSize="tableConfigs.pageLinkSize"
             currentPageReportTemplate="{first} - {last} of {totalRecords}">

    <Column>
      <template #body="slotProps">
        <TableField :loading="loading" loadingSize="2rem">
          <Avatar :image="slotProps.data.image" alt="preview"/>
        </TableField>
      </template>
    </Column>

    <Column header="Name">
      <template #body="slotProps">
        <TableField :loading="loading" loadingWidth="55%">
          {{ slotProps.data.name }} #{{ slotProps.index }}
        </TableField>
      </template>
    </Column>

    <Column header="User">
      <template #body="slotProps">
        <TableField :loading="loading" loadingWidth="65%">
          {{ slotProps.data.user }}
        </TableField>
      </template>
    </Column>

    <Column header="Creation Date">
      <template #body="slotProps">
        <TableField :loading="loading" loadingWidth="55%">
          {{ dateFilter(slotProps.data.creationDate) }}
        </TableField>
      </template>
    </Column>

    <Column header="Evaluation">
      <template #body="slotProps">
        <div class="flex align-items-center">
          <ReportEvaluation v-if="!loading" :record="slotProps.data"/>
          <template v-else>
            <i class="pi pi-spin pi-spinner text-color-secondary mr-3"></i>
            <Skeleton class="flex-grow-1 max-w-15rem mr-3"/>
            <Skeleton class="w-3rem"/>
          </template>
        </div>
      </template>
    </Column>

    <Column class="max-w-2rem text-center">
      <template #body="slotProps">
        <Button class="p-button-rounded p-button-text p-button-secondary" icon="pi pi-ellipsis-h"
                :disabled="loading" @click="$refs.menu.showMenu($event, slotProps.data)"/>
      </template>
    </Column>

    <template #empty>
      <div class="flex flex-column align-items-center text-center p-3 md:p-7">
        <ReportsEmptyPlaceholder v-if="!error"/>
        <ReportsErrorPlaceholder v-else @retry="fetchInitialTableData"/>
      </div>
    </template>

    <template #paginatorstart>
      <div class="flex align-items-center gap-3" data-rows-label="Items per page:">
        <Button type="button" icon="pi pi-refresh" class="p-button-text"
                :disabled="loading" @click="fetchInitialTableData"/>
      </div>
    </template>
  </DataTable>

  <ReportsOptions ref="menu"/>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, Ref, ref } from 'vue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable, { DataTablePageEvent, DataTableRowSelectEvent } from 'primevue/datatable';
import Skeleton from 'primevue/skeleton';
import dateFilter from '@/filters/date';
import DataTableInjector, { IDataTableConfig } from '@/configs/data-table.config';
import ReportsListInjector, { ReportsListService } from '@/data/reports-list.data';
import TableField from '@/components/TableField.vue';
import ReportEvaluation from '@/components/reports/ReportEvaluation.vue';
import ReportsEmptyPlaceholder from '@/components/reports/list/ReportsEmptyPlaceholder.vue';
import ReportsErrorPlaceholder from '@/components/reports/list/ReportsErrorPlaceholder.vue';
import ReportsOptions from '@/components/reports/list/ReportsOptions.vue';
import { PageableFactory } from '@/factories/pageable.factory';
import { ReportListFactory } from '@/factories/report-list.factory';
import { ReportListItemModel } from '@/models/report-list-item.model';
import { PageableModel } from '@/models/pageable.model';
import { ListFiltersModel } from '@/models/list-filters.model';

const service = inject(ReportsListInjector) as ReportsListService;
const tableConfigs = inject(DataTableInjector) as IDataTableConfig;

const emptyList = ReportListFactory.emptyReportListItems(5);

const list: Ref<PageableModel<ReportListItemModel>> = ref(PageableFactory.emptyPageable());
const rows = ref(tableConfigs.defaultRows);
const loading = ref(false);
const error = ref(false);

const items = computed<ReportListItemModel[]>(() => loading.value ? emptyList : list.value.content);

onMounted(() => {
  fetchInitialTableData();
});

function fetchInitialTableData(): void {
  fetchTableData({
    page: 0,
    count: rows.value
  });
}

function changeTablePage(event: DataTablePageEvent): void {
  fetchTableData({
    page: event.page,
    count: event.rows
  });
}

function fetchTableData(filters: ListFiltersModel): void {
  loading.value = true;
  service.getData(filters)
    .then((value: PageableModel<ReportListItemModel>) => {
      list.value = value;
      loading.value = false;
    })
    .catch(() => {
      error.value = true;
      loading.value = false;
    });
}

function onRowSelect(_: DataTableRowSelectEvent) {
  // TODO
}
</script>

<style scoped></style>
