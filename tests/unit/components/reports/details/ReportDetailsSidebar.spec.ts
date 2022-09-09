import { shallowMount } from '@vue/test-utils';
import ReportDetailsSidebar from '@/components/reports/details/ReportDetailsSidebar.vue';
import ReportsInjector from '@/data/reports.data';
import { ReportsFactory } from '@/factories/reports.factory';

describe('ReportDetailsSidebarSidebar.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportDetailsSidebar, {
      global: {
        provide: {
          [ReportsInjector]: { get: () => Promise.resolve(ReportsFactory.mockReportsDetails()) }
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
