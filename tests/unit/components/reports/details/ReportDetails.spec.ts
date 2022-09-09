import { shallowMount } from '@vue/test-utils';
import ReportDetails from '@/components/reports/details/ReportDetails.vue';
import { ReportsFactory } from '@/factories/reports.factory';
import ReportsRealtimeInjector, { ReportsRealtimeService } from '@/data/reports-realtime.data';

describe('ReportDetails.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportDetails, {
      global: {
        provide: {
          [ReportsRealtimeInjector]: new ReportsRealtimeService()
        }
      },
      props: {
        report: ReportsFactory.mockReportsDetails()
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
