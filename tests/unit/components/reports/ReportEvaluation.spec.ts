import { shallowMount } from '@vue/test-utils';
import ReportEvaluation from '@/components/reports/ReportEvaluation.vue';

describe("ReportEvaluation.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportEvaluation, {
      props: {
        record: {}
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
