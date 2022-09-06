import { shallowMount } from '@vue/test-utils';
import ReportsHeader from '@/components/reports/list/ReportsHeader.vue';

describe("ReportsHeader.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(ReportsHeader);
    expect(wrapper.exists()).toBe(true);
  });

  it("should contain the title for the reports list page", () => {
    const wrapper = shallowMount(ReportsHeader);
    expect(wrapper.element.querySelector('h1')?.textContent)
      .toBe('Image report manager');
  });

  it("should contain the description for the reports list page", () => {
    const wrapper = shallowMount(ReportsHeader);
    expect(wrapper.element.querySelector('p')?.textContent)
      .toBe('Prevent offensive content by managing user generated images!You can also generate images by yourself.');
  });
});
