<template>
  <DataTable :value="list.content" :lazy="true" responsiveLayout="stack" stripedRows
             :selectionMode="list.content?.length && !loading && !error ? 'single' : null" @rowSelect="$emit('select', $event.data.id)"
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
          <ReportEvaluation v-if="!loading" :report="slotProps.data"/>
          <template v-else>
            <i class="pi pi-spin pi-spinner text-color-secondary mr-3"></i>
            <Skeleton class="flex-grow-1 max-w-15rem mr-3"/>
            <Skeleton class="w-3rem"/>
          </template>
        </div>
      </template>
    </Column>

    <Column class="max-w-3rem text-center">
      <template #body="slotProps">
        <Button class="p-button-rounded p-button-text p-button-secondary" icon="pi pi-ellipsis-h"
                :disabled="loading" @click="$refs.menu.showMenu($event, slotProps.data)"/>
      </template>
    </Column>

    <template #empty>
      <div class="flex flex-column align-items-center text-center p-3 md:p-7">
        <ReportsEmptyPlaceholder v-if="!error" @add="$emit('addReport')"/>
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
import { inject, onMounted, onUnmounted, Ref, ref } from 'vue';
import { merge } from 'lodash';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable, { DataTablePageEvent } from 'primevue/datatable';
import Skeleton from 'primevue/skeleton';
import { Subscription } from 'rxjs';
import dateFilter from '@/filters/date';
import ApiDataInjector, { IApiDataConfig } from '@/configs/apidata.config';
import DataTableInjector, { IDataTableConfig } from '@/configs/datatable.config';
import ReportsInjector, { IReportsService } from '@/data/reports.data';
import ReportsRealtimeInjector, { IRealtimeReportChanges, ReportsRealtimeService } from '@/data/reports-realtime.data';
import TableField from '@/components/TableField.vue';
import ReportEvaluation from '@/components/reports/ReportEvaluation.vue';
import ReportsEmptyPlaceholder from '@/components/reports/list/ReportsEmptyPlaceholder.vue';
import ReportsErrorPlaceholder from '@/components/reports/list/ReportsErrorPlaceholder.vue';
import ReportsOptions from '@/components/reports/list/ReportsOptions.vue';
import { PageableFactory } from '@/factories/pageable.factory';
import { ReportsFactory } from '@/factories/reports.factory';
import { useHandleFetch } from '@/utils/handle-fetch.util';
import { ReportListItemModel } from '@/models/report-list-item.model';
import { PageableModel } from '@/models/pageable.model';
import { ListFiltersModel } from '@/models/list-filters.model';

const service = inject(ReportsInjector) as IReportsService;
const realtime = inject(ReportsRealtimeInjector) as ReportsRealtimeService;
const tableConfigs = inject(DataTableInjector) as IDataTableConfig;
const apiConfigs = inject(ApiDataInjector) as IApiDataConfig;

const emptyPage: PageableModel<ReportListItemModel> = PageableFactory.emptyPageable();
const loadingItems: ReportListItemModel[] = ReportsFactory.emptyReportListItems(5);
const subscriptions: Subscription[] = [];

const rows = ref(tableConfigs.defaultRows);
const list: Ref<PageableModel<ReportListItemModel>> = ref(emptyPage);
const loading = ref(false);
const error = ref(false);

const dataFetcher = useHandleFetch(loading, error, list);

defineEmits(['addReport', 'select']);
defineExpose({ refresh: fetchInitialTableData });

onMounted(() => {
  fetchInitialTableData();
  subscriptions.push(realtime.changes$.subscribe(handleRealtimeUpdate));
});

onUnmounted(() => {
  subscriptions.forEach((s) => s.unsubscribe());
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
  dataFetcher.fetch(() => service.getList(filters, apiConfigs))
    .before(beforeFetchTableData)
    .after(afterFetchTableData)
    .success(handleFetchTableDataSuccess)
    .error(handleFetchTableDataError)
    .do();
}

function beforeFetchTableData() {
  loading.value = true;
  error.value = false;
  list.value = Object.assign({}, list.value, { content: loadingItems });
}

function afterFetchTableData() {
  loading.value = false;
}

function handleFetchTableDataSuccess(value: PageableModel<ReportListItemModel>) {
  list.value = value;
}

function handleFetchTableDataError() {
  list.value = emptyPage;
  error.value = true;
}

function handleRealtimeUpdate(event: IRealtimeReportChanges): void {
  const reportIndex = list.value.content.findIndex((item) => item.id === event.id);
  if (reportIndex !== -1) {
    list.value.content[reportIndex] = merge(list.value.content[reportIndex], event);
  }
}
</script>
