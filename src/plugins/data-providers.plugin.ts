import { App } from 'vue';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';
import ReportsInjector, { ReportsService } from '@/data/reports.data';

export default {
  install: (app: App) => {
    app.provide(AuthenticationInjector, new AuthenticationService());
    app.provide(ReportsInjector, new ReportsService());
  }
}
