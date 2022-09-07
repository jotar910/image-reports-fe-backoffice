import { shallowMount } from '@vue/test-utils';
import ReportsTable from '@/components/reports/list/ReportsTable.vue';
import DataTableInjector, { createDataTableConfig } from '@/configs/data-table.config';
import ReportsListInjector from '@/data/reports-list.data';
import { PageableFactory } from '@/factories/pageable.factory';

describe('ReportsTable.vue', () => {
  it('should create', () => {
    const wrapper = shallowMount(ReportsTable, {
      global: {
        provide: {
          [DataTableInjector]: createDataTableConfig(),
          [ReportsListInjector]: { getData: () => Promise.resolve(PageableFactory.emptyPageable()) }
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
