import { App } from 'vue';
import ReportsListInjector, { ReportsListService } from '@/data/reports-list.data';

export default {
  install: (app: App) => {
    app.provide(ReportsListInjector, new ReportsListService());
  }
}
