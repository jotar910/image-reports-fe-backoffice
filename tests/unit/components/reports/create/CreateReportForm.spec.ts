import { shallowMount } from '@vue/test-utils';
import CreateReportSidebar from '@/components/reports/create/CreateReportSidebar.vue';

describe('CreateReportSidebar.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(CreateReportSidebar);
    expect(wrapper.exists()).toBe(true);
  });
});
