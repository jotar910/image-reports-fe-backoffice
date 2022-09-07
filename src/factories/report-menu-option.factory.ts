import { ReportMenuOption } from '@/models/report-menu-option.model';

export class ReportMenuOptionFactory {
  static options = (): ReportMenuOption[] => [
    ReportMenuOptionFactory.detailsOption(),
    ReportMenuOptionFactory.approveOption(),
    ReportMenuOptionFactory.rejectOption()
  ];

  private static detailsOption = (): ReportMenuOption => ({
    key: 'Details',
    label: 'Details'
  });

  private static approveOption = (): ReportMenuOption => ({
    key: 'Approve',
    label: 'Approve'
  });

  private static rejectOption = (): ReportMenuOption => ({
    key: 'Reject',
    label: 'Reject'
  });
}
