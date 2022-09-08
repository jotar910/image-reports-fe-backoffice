import { shallowMount } from '@vue/test-utils';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';
import DataTableInjector, { createDataTableConfig } from '@/configs/datatable.config';
import ReportsInjector from '@/data/reports.data';
import { PageableFactory } from '@/factories/pageable.factory';

describe('ReportsTable.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportsTable, {
      global: {
        provide: {
          [DataTableInjector]: createDataTableConfig(),
          [ReportsInjector]: { getList: () => Promise.resolve(PageableFactory.emptyPageable()) }
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
