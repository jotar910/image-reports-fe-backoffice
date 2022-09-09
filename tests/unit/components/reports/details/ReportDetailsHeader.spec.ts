import { shallowMount } from '@vue/test-utils';
import ReportDetailsHeader from '@/components/reports/details/ReportDetailsHeader.vue';
import { ReportsFactory } from '@/factories/reports.factory';

describe('ReportDetailsHeader.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportDetailsHeader, {
      props: {
        report: ReportsFactory.mockReportsDetails()
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
