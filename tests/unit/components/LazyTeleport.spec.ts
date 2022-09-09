import { shallowMount } from '@vue/test-utils';
import LazyTeleport from '@/components/LazyTeleport.vue';

describe("LazyTeleport.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(LazyTeleport);
    expect(wrapper.exists()).toBe(true);
  });
});
