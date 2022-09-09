import { shallowMount } from '@vue/test-utils';
import LogoutView from '@/views/LogoutView.vue';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';

describe('LogoutView.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(LogoutView, {
      global: {
        provide: {
          [AuthenticationInjector]: new AuthenticationService()
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  })
    ;
  });
