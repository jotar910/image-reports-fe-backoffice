import { App } from 'vue';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';
import ReportsInjector, { ReportsService } from '@/data/reports.data';
import ReportsRealtimeInjector, { ReportsRealtimeService } from '@/data/reports-realtime.data';

export default {
  install: (app: App) => {
    app.provide(AuthenticationInjector, new AuthenticationService());
    app.provide(ReportsInjector, new ReportsService());
    app.provide(ReportsRealtimeInjector, new ReportsRealtimeService());
  }
}
