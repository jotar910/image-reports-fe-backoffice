<template>
  <DataTable :value="list" :lazy="true" responsiveLayout="stack" stripedRows
             :selectionMode="list?.length && !loading && !error ? 'single' : null" @rowSelect="onRowSelect"
             :loading="loading" :loadingIcon="null" @rowContextmenu="$refs.contextMenu.show($event.originalEvent)"
             paginatorTemplate="RowsPerPageDropdown CurrentPageReport CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
             :paginator="true" paginatorPosition="top" :first="0" :rows="10" :rowsPerPageOptions="[10,20,50]" :totalRecords="100"
             :pageLinkSize="3" currentPageReportTemplate="{first} - {last} of {totalRecords}">

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
      <template #body>
        <Button class="p-button-rounded p-button-text p-button-secondary" icon="pi pi-ellipsis-h"
                :disabled="loading" @click="$refs.menu.toggle($event)"/>
      </template>
    </Column>

    <template #empty>
      <div class="flex flex-column align-items-center text-center p-3 md:p-7">
        <ReportsEmptyPlaceholder v-if="!error"/>
        <ReportsErrorPlaceholder v-else/>
      </div>
    </template>

    <template #paginatorstart>
      <div class="flex align-items-center gap-3" data-rows-label="Items per page:">
        <Button type="button" icon="pi pi-refresh" class="p-button-text"/>
      </div>
    </template>
  </DataTable>

  <Menu ref="menu" :model="options" :popup="true"/>
  <ContextMenu ref="contextMenu" :model="options"/>
</template>

<script lang="ts" setup>
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';
import DataTable, { DataTableRowSelectEvent } from 'primevue/datatable';
import Menu from 'primevue/menu';
import Skeleton from 'primevue/skeleton';
import dateFilter from '@/filters/date';
import TableField from '@/components/TableField.vue';
import ReportEvaluation from '@/components/reports/ReportEvaluation.vue';
import ReportsEmptyPlaceholder from '@/components/reports/list/ReportsEmptyPlaceholder.vue';
import ReportsErrorPlaceholder from '@/components/reports/list/ReportsErrorPlaceholder.vue';
import { MenuItem } from 'primevue/menuitem';

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  error: {
    type: Boolean,
    required: false,
    default: false
  },
  list: {
    type: Array,
    required: true
  },
  options: {
    type: Array,
    required: false,
    default: ([] as Array<MenuItem>)
  }
});

function onRowSelect(_: DataTableRowSelectEvent) {
  // TODO
}
</script>

<style scoped></style>
