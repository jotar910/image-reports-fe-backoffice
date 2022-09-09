<template>
  <Menu ref="menu" :model="options" :popup="true"/>
  <ContextMenu ref="contextMenu" :model="options"/>
</template>

<script lang="ts" setup>
import { defineExpose, nextTick, Ref, ref } from 'vue';
import ContextMenu from 'primevue/contextmenu';
import Menu from 'primevue/menu';
import { ReportMenuOptionFactory } from '@/factories/report-menu-option.factory';
import { ReportListItemModel } from '@/models/report-list-item.model';
import { ReportMenuOption } from '@/models/report-menu-option.model';

const menu: Ref<Menu | null> = ref(null);
const options: Ref<ReportMenuOption[]> = ref([]);
const contextMenu: Ref<Menu | null> = ref(null);

defineExpose({
  showMenu: toggleMenu,
  showContextMenu: toggleContextMenu
});

function toggleMenu(event: Event, config: ReportListItemModel) {
  toggle(menu.value!, contextMenu.value!, event, config);
}

function toggleContextMenu(event: Event, config: ReportListItemModel) {
  toggle(contextMenu.value!, menu.value!, event, config);
}

function toggle(target: Menu, other: Menu, event: Event, config: ReportListItemModel) {
  other.hide();
  target.hide();
  setMenuOptionsVisibility(config);
  nextTick(() => target.toggle(event));
}

function setMenuOptionsVisibility(config: ReportListItemModel) {
  options.value = [
    ReportMenuOptionFactory.detailsOption(config),
    ReportMenuOptionFactory.approveOption(config),
    ReportMenuOptionFactory.rejectOption(config)
  ];
}
</script>
