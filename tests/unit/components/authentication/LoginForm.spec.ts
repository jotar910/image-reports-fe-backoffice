import { shallowMount } from '@vue/test-utils';
import { noop } from 'lodash';
import LoginForm from '@/components/authentication/LoginForm.vue';

describe("LoginForm.vue", () => {
  it("should create", () => {
    const wrapper = shallowMount(LoginForm, {
      global: {
        directives: {
          focus: noop
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
