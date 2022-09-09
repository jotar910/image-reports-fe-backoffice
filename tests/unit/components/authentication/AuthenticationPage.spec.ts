import { shallowMount } from '@vue/test-utils';
import AuthenticationPage from '@/components/authentication/AuthenticationPage.vue';

jest.mock('primevue/usetoast');

describe("AuthenticationPage.vue", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('primevue/usetoast').useToast.mockReturnValueOnce({
      add: jest.fn()
    });
  });

  it("should create", () => {
    const wrapper = shallowMount(AuthenticationPage);
    expect(wrapper.exists()).toBe(true);
  });
});
