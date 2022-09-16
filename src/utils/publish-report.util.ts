import { inject, Ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import ReportsInjector, { IReportsService } from '@/data/reports.data';
import ReportsRealtimeInjector, { ReportsRealtimeService } from '@/data/reports-realtime.data';
import { ToastServiceUtils, useToastService } from '@/utils/toast-service.utils';
import { ReportApprovalStatusType } from '@/models/report-status.type';
import ApiDataInjector, { IApiDataConfig } from '@/configs/apidata.config';

export const usePublishReport = (loading: Ref<boolean>): PublishReportUtil => {
  return new PublishReportUtil(
    loading,
    inject(ReportsInjector) as IReportsService,
    inject(ReportsRealtimeInjector) as ReportsRealtimeService,
    inject(ApiDataInjector) as IApiDataConfig,
    useToastService(useToast())
  );
};

export class PublishReportUtil {
  constructor(
    private readonly loading: Ref<boolean>,
    private readonly service: IReportsService,
    private readonly realtime: ReportsRealtimeService,
    private readonly configs: IApiDataConfig,
    private readonly toast: ToastServiceUtils
  ) {}

  publish(id: number, status: ReportApprovalStatusType): Promise<void> {
    this.loading.value = true;
    return this.service.publish(id, status, this.configs)
      .then(() => {
        this.toast.reportPublishSuccess(status);
        this.realtime.emitChange(id, {
          status: 'PUBLISHED',
          approval: { status, date: new Date().getTime(), user: 'testing@user.com' }
        });
      })
      .catch(() => this.toast.reportPublishError(status))
      .finally(() => this.loading.value = false);
  }
}
