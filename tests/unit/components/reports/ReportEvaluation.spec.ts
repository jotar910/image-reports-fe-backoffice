import { shallowMount } from '@vue/test-utils';
import ReportEvaluation from '@/components/reports/ReportEvaluation.vue';

describe("ReportEvaluation.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportEvaluation, {
      props: {
        report: {}
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
