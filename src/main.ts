import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-green/theme.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import App from './App.vue';
import router from './router';
import ConfigProviders from '@/plugins/config-providers.plugin';
import DataProviders from '@/plugins/data-providers.plugin';
import FocusDirective from '@/directives/focus.directive';

createApp(App)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .use(ConfigProviders)
  .use(DataProviders)
  .directive('focus', FocusDirective)
  .mount('#app');
