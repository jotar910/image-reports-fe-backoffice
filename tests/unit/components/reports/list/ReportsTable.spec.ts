import { shallowMount } from '@vue/test-utils';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';
import DataTableInjector, { createDataTableConfig } from '@/configs/datatable.config';
import ReportsRealtimeInjector, { ReportsRealtimeService } from '@/data/reports-realtime.data';
import ReportsInjector from '@/data/reports.data';
import { PageableFactory } from '@/factories/pageable.factory';
import HandleFetchUtilInjector, { HandleFetchUtil } from '@/utils/handle-fetch.util';

describe('ReportsTable.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportsTable, {
      global: {
        provide: {
          [DataTableInjector]: createDataTableConfig(),
          [ReportsInjector]: { getList: () => Promise.resolve(PageableFactory.emptyPageable()) },
          [HandleFetchUtilInjector]: HandleFetchUtil,
          [ReportsRealtimeInjector]: new ReportsRealtimeService()
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
