import { shallowMount } from '@vue/test-utils';
import ReportsListView from '@/views/ReportsListView.vue';

describe('ReportsListView.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportsListView);
    expect(wrapper.exists()).toBe(true);
  });
});
