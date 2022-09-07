import { shallowMount } from '@vue/test-utils';
import ReportsMenu from '@/components/reports/list/ReportsMenu.vue';

describe('ReportsMenu.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportsMenu);
    expect(wrapper.exists()).toBe(true);
  });
});
