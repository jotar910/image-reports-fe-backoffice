import { shallowMount } from '@vue/test-utils';
import ReportsErrorPlaceholder from '@/components/reports/list/ReportsErrorPlaceholder.vue';

describe("ReportsErrorPlaceholder.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportsErrorPlaceholder);
    expect(wrapper.exists()).toBe(true);
  });
});
