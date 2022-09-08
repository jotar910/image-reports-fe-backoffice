import { ReportListItemModel } from '@/models/report-list-item.model';
import { PageableModel } from '@/models/pageable.model';
import { ListFiltersModel } from '@/models/list-filters.model';
import { ReportListFactory } from '@/factories/report-list.factory';
import { CreateReportModel } from '@/models/create-report.model';

export class ReportsService {
  add(report: CreateReportModel): Promise<void> {
    console.log('Submitting', report);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject('Error');
          return;
        }
        resolve();
      }, 2000);
    });
  }

  getList({ page, count }: ListFiltersModel): Promise<PageableModel<ReportListItemModel>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject('Error');
          return;
        }
        const items: ReportListItemModel[] = ReportListFactory.mockReportListItems();
        const totalElements = items.length;
        resolve({
          page,
          totalElements,
          totalPages: Math.ceil(totalElements / count),
          numberOfElements: Math.min(items.length, page),
          content: items.slice(page * count, (page + 1) * count)
        });
      }, 2000);
    });
  }
}

export default Symbol('Reports provider identifier');
