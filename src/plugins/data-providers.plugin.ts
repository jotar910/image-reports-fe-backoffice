import { App } from 'vue';
import ReportsInjector, { ReportsService } from '@/data/reports.data';

export default {
  install: (app: App) => {
    app.provide(ReportsInjector, new ReportsService());
  }
}
