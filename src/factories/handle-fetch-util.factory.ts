import HandleFetchUtilInjector, { IHandleFetchUtil } from '@/utils/handle-fetch.util';
import { inject, Ref } from 'vue';
import Constructable = jest.Constructable;

export class HandleFetchUtilFactory {
  static createInstance<TValue, TError = unknown>(
    loading: Ref<boolean>,
    error: Ref<boolean>,
    data: Ref<TValue>
  ): IHandleFetchUtil<TValue, TError> {
    const HandleFetch = inject(HandleFetchUtilInjector) as Constructable;
    return new HandleFetch(loading, error, data);
  }
}
