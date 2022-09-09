import { shallowMount } from '@vue/test-utils';
import ReportDetailsSidebar from '@/components/reports/details/ReportDetailsSidebar.vue';
import ReportsInjector from '@/data/reports.data';
import HandleFetchUtilInjector, {HandleFetchUtil} from '@/utils/handle-fetch.util';
import { ReportsFactory } from '@/factories/reports.factory';

jest.mock('primevue/usetoast');

describe('ReportDetailsSidebarSidebar.vue', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('primevue/usetoast').useToast.mockReturnValueOnce({
      add: jest.fn()
    });
  });

  it('should create', () => {
    const wrapper = shallowMount(ReportDetailsSidebar, {
      global: {
        provide: {
          [ReportsInjector]: { get: () => Promise.resolve(ReportsFactory.mockReportsDetails()) },
          [HandleFetchUtilInjector]: HandleFetchUtil
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
