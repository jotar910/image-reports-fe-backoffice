import { shallowMount } from '@vue/test-utils';
import ReportDetailsView from '@/views/ReportDetailsView.vue';
import ReportsInjector from '@/data/reports.data';
import { ReportsFactory } from '@/factories/reports.factory';
import HandleFetchUtilInjector, { HandleFetchUtil } from '@/utils/handle-fetch.util';

jest.mock('vue-router');
jest.mock('primevue/usetoast');

describe('ReportDetailsView.vue', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('vue-router').useRoute.mockReturnValueOnce({
      params: {
        id: 1
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('primevue/usetoast').useToast.mockReturnValueOnce({
      add: jest.fn()
    });
  });

  it('should create', () => {
    const wrapper = shallowMount(ReportDetailsView, {
      global: {
        provide: {
          [ReportsInjector]: { get: () => Promise.resolve(ReportsFactory.mockReportsDetails()) },
          [HandleFetchUtilInjector]: HandleFetchUtil
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
