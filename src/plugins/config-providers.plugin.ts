import { App } from 'vue';
import DataTableInjector, { createDataTableConfig } from '@/configs/data-table.config';

export default {
  install: (app: App) => {
    app.provide(DataTableInjector, createDataTableConfig());
  }
}
