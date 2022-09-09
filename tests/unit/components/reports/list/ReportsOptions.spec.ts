import { shallowMount } from '@vue/test-utils';
import ReportsOptions from '@/components/reports/list/ReportsOptions.vue';
import ReportsInjector  from '@/data/reports.data';
import {NoopReportsService}  from '@/utils/reports-data.util';
import ReportsRealtimeInjector, { ReportsRealtimeService } from '@/data/reports-realtime.data';

jest.mock('primevue/usetoast');

describe('ReportsOptions.vue', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('primevue/usetoast').useToast.mockReturnValueOnce({
      add: jest.fn()
    });
  });

  it('should create', () => {
    const wrapper = shallowMount(ReportsOptions, {
      global: {
        provide: {
          [ReportsInjector]: new NoopReportsService(),
          [ReportsRealtimeInjector]: new ReportsRealtimeService()
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
