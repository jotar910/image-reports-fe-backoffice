import { ReportMenuOption } from '@/models/report-menu-option.model';
import { ReportListItemModel } from '@/models/report-list-item.model';

export class ReportMenuOptionFactory {
  static detailsOption = (config: ReportListItemModel): ReportMenuOption => ({
    key: 'Details',
    label: 'Details',
    visible: true,
    to: `/${config.id}`
  });

  static approveOption = (config: ReportListItemModel): ReportMenuOption => ({
    key: 'Approve',
    label: 'Approve',
    visible: () => config.status === 'PENDING'
  });

  static rejectOption = (config: ReportListItemModel): ReportMenuOption => ({
    key: 'Reject',
    label: 'Reject',
    visible: () => config.status === 'PENDING'
  });
}
