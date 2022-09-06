<template>
  <DataTable :value="list" :lazy="true" responsiveLayout="stack" stripedRows
             :selectionMode="list?.length && !loading && !error ? 'single' : null" @rowSelect="onRowSelect"
             :loading="loading" :loadingIcon="null" @rowContextmenu="$refs.contextMenu.show($event.originalEvent)"
             paginatorTemplate="RowsPerPageDropdown CurrentPageReport CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
             :paginator="true" paginatorPosition="top" :first="0" :rows="10" :rowsPerPageOptions="[10,20,50]" :totalRecords="100"
             :pageLinkSize="3"
             currentPageReportTemplate="{first} - {last} of {totalRecords}">
    <Column>
      <template #body="slotProps">
        <TableField :loading="loading" size="2rem">
          <Avatar :image="slotProps.data.image" alt="preview"/>
        </TableField>
      </template>
    </Column>
    <Column header="Name">
      <template #body="slotProps">
        <TableField :loading="loading" width="55%">
          {{ slotProps.data.name }} #{{ slotProps.index }}
        </TableField>
      </template>
    </Column>
    <Column header="User">
      <template #body="slotProps">
        <TableField :loading="loading" width="65%">
          {{ slotProps.data.user }}
        </TableField>
      </template>
    </Column>
    <Column header="Creation Date">
      <template #body="slotProps">
        <TableField :loading="loading" width="55%">
          {{ dateFilter(slotProps.data.creationDate) }}
        </TableField>
      </template>
    </Column>
    <Column header="Evaluation">
      <template #body="slotProps">
        <div class="flex align-items-center">
          <template v-if="loading">
            <i class="pi pi-spin pi-spinner text-secondary mr-3"></i>
            <Skeleton class="flex-grow-1 max-w-15rem mr-3"/>
            <Skeleton class="w-3rem"/>
          </template>
          <template v-else>
            <div class="align-items-center flex justify-content-center mr-3" :title="reportStatusFilter(slotProps.data)">
              <template v-if="slotProps.data.status === 'NEW'">
                <i class="pi pi-circle text-secondary"></i>
              </template>
              <template v-else-if="slotProps.data.status === 'EVALUATING'">
                <i class="pi pi-spin pi-spinner text-info"></i>
              </template>
              <template v-else-if="slotProps.data.status === 'PENDING'">
                <i class="pi pi-circle text-info"></i>
              </template>
              <template v-else-if="slotProps.data.status === 'PUBLISHED'">
                <i v-if="slotProps.data.approval.status === 'APPROVED'"
                   class="pi pi-check-circle text-success"></i>
                <i v-else class="pi pi-times-circle text-error"></i>
              </template>
              <template v-else>
                <i class="pi pi-exclamation-triangle text-warning"></i>
              </template>
            </div>
            <ProgressBar :value="slotProps.data.evaluation?.grade" :showValue="false" class="flex-grow-1 max-w-15rem mr-3"
                         :mode="slotProps.data.status === 'EVALUATING' ? 'indeterminate' : 'determinate'"
                         :class="{'color-info': slotProps.data.status === 'EVALUATING' || slotProps.data.status === 'PENDING', 'color-success': slotProps.data.status === 'PUBLISHED' && slotProps.data.approval.status === 'APPROVED', 'color-error': slotProps.data.status === 'PUBLISHED' && slotProps.data.approval.status === 'REJECTED'}"/>
            <span class="align-items-center flex justify-content-center w-3rem">
              <template v-if="slotProps.data.status === 'PENDING' || slotProps.data.status === 'PUBLISHED'">
                {{ slotProps.data.evaluation?.grade }}%
              </template>
            </span>
          </template>
        </div>
      </template>
    </Column>
    <Column class="max-w-2rem text-center">
      <template #body>
        <Button class="p-button-rounded p-button-text p-button-secondary" icon="pi pi-ellipsis-h"
                :disabled="loading" @click="$refs.menu.toggle($event)"/>
        <Menu ref="menu" :model="options" :popup="true"/>
      </template>
    </Column>
    <template #empty>
      <div class="flex flex-column align-items-center text-center p-3 md:p-7">
        <template v-if="!error">
          <i class="pi pi-exclamation-circle text-primary typ-header-md"></i>
          <p class="typ-header-xs mb-0">No reports found</p>
          <p class="typ-body text-placeholder mb-5">Sorry, we couldn't find any data!</p>
          <Button label="Primary Small" class="typ-body-sm p-button-sm"/>
        </template>
        <template v-else>
          <i class="pi pi-exclamation-triangle text-warning typ-header-md"></i>
          <p class="typ-header-xs mb-0">Something went wrong</p>
          <p class="typ-body text-placeholder mb-5">Sorry, there was an error fetching the data!</p>
          <Button label="Try again" class="typ-body-sm p-button-sm p-button-outlined p-button-secondary"/>
        </template>
      </div>
    </template>
    <template #paginatorstart>
      <div class="flex align-items-center gap-3" data-rows-label="Items per page:">
        <Button type="button" icon="pi pi-refresh" class="p-button-text"/>
      </div>
    </template>
  </DataTable>
  <ContextMenu ref="contextMenu" :model="options"/>
</template>

<script lang="ts" setup>
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Column from "primevue/column";
import ContextMenu from "primevue/contextmenu";
import DataTable, {DataTableRowSelectEvent} from "primevue/datatable";
import Menu from "primevue/menu";
import ProgressBar from "primevue/progressbar";
import Skeleton from "primevue/skeleton";
import dateFilter from "@/filters/date";
import reportStatusFilter from "@/filters/report-status";
import TableField from "@/components/TableField.vue";

defineProps({
  loading: Boolean,
  error: Boolean,
  list: Array,
  options: Array
});

function onRowSelect(event: DataTableRowSelectEvent) {
  console.log(event);
}
</script>

<style scoped>

</style>
