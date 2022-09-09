import { App } from 'vue';
import HandleFetchUtilInjector, { HandleFetchUtil } from '@/utils/handle-fetch.util';

export default {
  install: (app: App) => {
    app.provide(HandleFetchUtilInjector, HandleFetchUtil);
  }
}
