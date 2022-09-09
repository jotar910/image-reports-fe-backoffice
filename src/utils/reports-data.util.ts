import { IReportsService } from '@/data/reports.data';
import { ReportDetailsModel } from '@/models/report-details.model';
import { ReportsFactory } from '@/factories/reports.factory';
import { PageableModel } from '@/models/pageable.model';
import { ReportListItemModel } from '@/models/report-list-item.model';
import { PageableFactory } from '@/factories/pageable.factory';

export class NoopReportsService implements IReportsService {
  add(): Promise<void> {
    return Promise.resolve();
  }

  get(): Promise<ReportDetailsModel> {
    return Promise.resolve(ReportsFactory.emptyReportDetails());
  }

  getList(): Promise<PageableModel<ReportListItemModel>> {
    return Promise.resolve(PageableFactory.emptyPageable());
  }

  publish(): Promise<void> {
    return Promise.resolve();
  }
}
