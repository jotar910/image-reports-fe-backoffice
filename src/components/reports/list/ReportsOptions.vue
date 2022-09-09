<template>
  <Menu ref="menu" :model="options" :popup="true"/>
  <ContextMenu ref="contextMenu" :model="options"/>
</template>

<script lang="ts" setup>
import { inject, nextTick, Ref, ref } from 'vue';
import ContextMenu from 'primevue/contextmenu';
import Menu from 'primevue/menu';
import { useToast } from 'primevue/usetoast';
import ReportsInjector, { IReportsService } from '@/data/reports.data';
import ReportsRealtimeInjector, { ReportsRealtimeService } from '@/data/reports-realtime.data';
import { ReportMenuOptionFactory } from '@/factories/report-menu-option.factory';
import { useToastService } from '@/utils/toast-service.utils';
import { ReportListItemModel } from '@/models/report-list-item.model';
import { ReportMenuOption } from '@/models/report-menu-option.model';
import { ReportApprovalStatusType } from '@/models/report-status.type';

const service = inject(ReportsInjector) as IReportsService;
const realtime = inject(ReportsRealtimeInjector) as ReportsRealtimeService;

const toast = useToastService(useToast());

const menu: Ref<Menu | null> = ref(null);
const options: Ref<ReportMenuOption[]> = ref([]);
const contextMenu: Ref<Menu | null> = ref(null);
const runningCommand: Ref<boolean> = ref(false);

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
    ReportMenuOptionFactory.approveOption(config, menuOptionCommand(config, 'APPROVED')),
    ReportMenuOptionFactory.rejectOption(config, menuOptionCommand(config, 'REJECTED'))
  ];
}

function menuOptionCommand(config: ReportListItemModel, status: ReportApprovalStatusType) {
  return () => {
    if (runningCommand.value) {
      return;
    }

    runningCommand.value = true;
    service.publish(config.id, status)
      .then(() => {
        toast.reportPublishSuccess(status);
        realtime.emitChange(config.id, {
          status: 'PUBLISHED',
          approval: { status, date: new Date().getTime(), user: 'testing@user.com' }
        });
      })
      .catch(() => toast.reportPublishError(status))
      .finally(() => runningCommand.value = false);
  };
}
</script>
