import { shallowMount } from '@vue/test-utils';
import CreateReportForm from '@/components/reports/create/CreateReportSidebar.vue';
import FileUploadInjector, { createFileUploadConfig } from '@/configs/fileupload.config';
import ToastInjector, { createToastConfig } from '@/configs/toast.config';
import ReportsInjector from '@/data/reports.data';

describe('CreateReportSidebar.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(CreateReportForm, {
      global: {
        provide: {
          [FileUploadInjector]: createFileUploadConfig(),
          [ToastInjector]: createToastConfig(),
          [ReportsInjector]: {}
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
