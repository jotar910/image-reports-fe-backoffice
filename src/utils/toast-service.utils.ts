import { inject } from 'vue';
import { ToastServiceMethods } from 'primevue/toastservice';
import ToastInjector, { IToastConfig } from '@/configs/toast.config';
import { ReportApprovalStatusType } from '@/models/report-status.type';

export const useToastService = (toast: ToastServiceMethods) => {
  return new ToastServiceUtils(toast);
}

export class ToastServiceUtils {
  private readonly configs: IToastConfig;

  constructor(private readonly toast: ToastServiceMethods) {
    this.configs = inject(ToastInjector) as IToastConfig;
  }

  createReportSuccess() {
    this.toast.add({
      ...this.configs.success,
      summary: 'New report created!',
      detail: `We added a new report to the system! You can check it on the report's list`
    });
  }

  createReportError() {
    this.toast.add({
      ...this.configs.error,
      summary: 'Something went wrong!',
      detail: `We couldn't add your report image right now! Please try again later.`
    });
  }

  reportPublishSuccess(status: ReportApprovalStatusType) {
    this.toast.add({
      ...this.configs.success,
      summary: `Report ${status.toLowerCase()}!`,
      detail: `The report was ${status.toLowerCase()} with success! Changes will be updated automatically`
    });
  }

  reportPublishError(status: ReportApprovalStatusType) {
    this.toast.add({
      ...this.configs.error,
      summary: 'Something went wrong!',
      detail: `We couldn't publish the report as ${status.toLowerCase()}! Please try again later.`
    });
  }
}
