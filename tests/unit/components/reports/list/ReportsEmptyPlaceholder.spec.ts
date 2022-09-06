import { shallowMount } from '@vue/test-utils';
import ReportsEmptyPlaceholder from '@/components/reports/list/ReportsEmptyPlaceholder.vue';

describe("ReportsEmptyPlaceholder.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportsEmptyPlaceholder);
    expect(wrapper.exists()).toBe(true);
  });
});
