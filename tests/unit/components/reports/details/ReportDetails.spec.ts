import { shallowMount } from '@vue/test-utils';
import ReportDetails from '@/components/reports/details/ReportDetails.vue';
import { ReportsFactory } from '@/factories/reports.factory';

describe('ReportDetails.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportDetails, {
      props: {
        report: ReportsFactory.mockReportsDetails()
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
