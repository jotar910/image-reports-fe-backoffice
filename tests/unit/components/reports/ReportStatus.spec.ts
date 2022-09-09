import { shallowMount } from '@vue/test-utils';
import ReportStatus from '@/components/reports/ReportStatus.vue';

describe("ReportStatus.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportStatus, {
      props: {
        report: {}
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
