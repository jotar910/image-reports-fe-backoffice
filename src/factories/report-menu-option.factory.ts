import { MenuItemCommandEvent } from 'primevue/menuitem';
import { ReportMenuOption } from '@/models/report-menu-option.model';
import { ReportListItemModel } from '@/models/report-list-item.model';

export class ReportMenuOptionFactory {
  static detailsOption = (config: ReportListItemModel): ReportMenuOption => ({
    key: 'Details',
    label: 'Details',
    visible: true,
    to: `/${config.id}`
  });

  static approveOption = (config: ReportListItemModel, command: (event: MenuItemCommandEvent) => void): ReportMenuOption => ({
    key: 'Approve',
    label: 'Approve',
    visible: () => config.status === 'PENDING',
    command

  });

  static rejectOption = (config: ReportListItemModel, command: (event: MenuItemCommandEvent) => void): ReportMenuOption => ({
    key: 'Reject',
    label: 'Reject',
    visible: () => config.status === 'PENDING',
    command

  });
}
