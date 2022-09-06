import { shallowMount } from '@vue/test-utils';
import PageLayout from '@/components/PageLayout.vue';

describe("PageLayout.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(PageLayout);
    expect(wrapper.exists()).toBe(true);
  });
});
