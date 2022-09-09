import HandleFetchUtilInjector, { HandleFetchUtil } from '@/utils/handle-fetch.util';
import { inject, Ref } from 'vue';

export class HandleFetchUtilFactory {
  static createInstance<TValue>(
    loading: Ref<boolean>,
    error: Ref<boolean>,
    data: Ref<TValue>
  ): HandleFetchUtil<TValue> {
    const HandleFetch = inject(HandleFetchUtilInjector) as typeof HandleFetchUtil;
    return new HandleFetch(loading, error, data);
  }
}
