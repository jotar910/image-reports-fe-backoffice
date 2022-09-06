import { shallowMount } from '@vue/test-utils';
import TableField from '@/components/TableField.vue';

describe("TableField.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(TableField);
    expect(wrapper.exists()).toBe(true);
  });
});
