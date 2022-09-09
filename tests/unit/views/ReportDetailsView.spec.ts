import { shallowMount } from '@vue/test-utils';
import ReportDetailsView from '@/views/ReportDetailsView.vue';
import ReportsInjector from '@/data/reports.data';
import { ReportsFactory } from '@/factories/reports.factory';

jest.mock('vue-router');

describe('ReportDetailsView.vue', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('vue-router').useRoute.mockReturnValueOnce({
      params: {
        id: 1
      }
    })
  });

  it('should create', () => {
    const wrapper = shallowMount(ReportDetailsView, {
      global: {
        provide: {
          [ReportsInjector]: { get: () => Promise.resolve(ReportsFactory.mockReportsDetails()) }
        },
        mocks: {
          useRoute: () => ({
            params: {
              id: 1
            }
          })
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
