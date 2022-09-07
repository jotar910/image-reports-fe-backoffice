import { shallowMount } from '@vue/test-utils';
import ReportsOptions from '@/components/reports/list/ReportsOptions.vue';

describe('ReportsOptions.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportsOptions);
    expect(wrapper.exists()).toBe(true);
  });
});
