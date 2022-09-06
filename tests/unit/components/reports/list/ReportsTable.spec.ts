import { shallowMount } from '@vue/test-utils';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';

describe("ReportsTable.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportsTable, {
      props: {
        list: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
