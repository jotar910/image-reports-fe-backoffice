import { inject, Ref } from 'vue';
import { noop } from 'rxjs';

const HandleFetchUtilInjector = Symbol('Handle fetch util provider identifier');
export default HandleFetchUtilInjector;

export const useHandleFetch = <TValue, TError = unknown>(
  loading: Ref<boolean>,
  error: Ref<boolean>,
  data: Ref<TValue>
): IHandleFetchUtil<TValue, TError> => {
  const HandleFetch = inject(HandleFetchUtilInjector) as IHandleFetchUtilClass<TValue, TError>;
  return new HandleFetch(loading, error, data);
};

type IHandleFetchUtilClass<TValue, TError> = new(loading: Ref<boolean>, error: Ref<boolean>, data: Ref<TValue>) => IHandleFetchUtil<TValue, TError>;

interface IHandleFetchUtil<TValue, TError = unknown> {
  fetch(fetchCb: () => Promise<TValue>): IFetchUtil<TValue, TError>;
}

type FetchUtilOperations = 'before' | 'after' | 'success' | 'error';

interface IFetchUtil<TValue, TError = unknown> {
  before(beforeFetch: () => void): IFetchUtil<TValue, TError>;

  after(afterFetch: () => void): IFetchUtil<TValue, TError>;

  success(successFetch: (value: TValue) => void): IFetchUtil<TValue, TError>;

  error(errorFetch: (error?: TError) => void): IFetchUtil<TValue, TError>;

  do(): Promise<TValue | null>;
}

export class HandleFetchUtil<TValue, TError = unknown> {
  constructor(
    private readonly loading: Ref<boolean>,
    private readonly error: Ref<boolean>,
    private readonly data: Ref<TValue>
  ) {}

  fetch(fetchCb: () => Promise<TValue>): IFetchUtil<TValue, TError> {
    return new FetchUtil<TValue, TError>(fetchCb)
      .before(this.beforeFetch.bind(this))
      .after(this.afterFetch.bind(this))
      .success(this.fetchSuccess.bind(this))
      .error(this.fetchError.bind(this));
  }

  private beforeFetch() {
    this.loading.value = true;
    this.error.value = false;
  }

  private afterFetch() {
    this.loading.value = false;
  }

  private fetchSuccess(data: TValue) {
    this.data.value = data;
  }

  private fetchError() {
    this.error.value = true;
  }
}

export class HandleInfiniteFetchUtil<TValue, TError = unknown> {
  fetch(fetchCb: () => Promise<TValue>): IFetchUtil<TValue, TError> {
    return new FreezeFetchUtilDecorator(
      new FetchUtil<TValue, TError>(fetchCb),
      ['before']
    );
  }
}

class FetchUtil<TValue, TError = unknown> implements IFetchUtil<TValue, TError> {

  private beforeFetchCb: () => void = noop;

  private afterFetchCb: () => void = noop;

  private successFetchCb: (value: TValue) => void = noop;

  private errorFetchCb: (error?: TError) => void = noop;

  constructor(private readonly fetchCb: () => Promise<TValue>) {
  }

  before(beforeFetch: () => void): IFetchUtil<TValue, TError> {
    this.beforeFetchCb = beforeFetch;
    return this;
  }

  after(afterFetch: () => void): IFetchUtil<TValue, TError> {
    this.afterFetchCb = afterFetch;
    return this;
  }

  success(successFetch: (value: TValue) => void): IFetchUtil<TValue, TError> {
    this.successFetchCb = successFetch;
    return this;
  }

  error(errorFetch: (error?: TError) => void): IFetchUtil<TValue, TError> {
    this.errorFetchCb = errorFetch;
    return this;
  }

  do(): Promise<TValue | null> {
    this.beforeFetchCb();
    return this.fetchCb()
      .then((value) => {
        this.successFetchCb(value);
        return value;
      })
      .catch((error) => {
        this.errorFetchCb(error);
        return null;
      })
      .finally(() => this.afterFetchCb());
  }
}

class FreezeFetchUtilDecorator<TValue, TError = unknown> implements IFetchUtil<TValue, TError> {
  private readonly skipSet: Set<FetchUtilOperations>;

  constructor(private readonly fetcher: IFetchUtil<TValue, TError>, skipList: FetchUtilOperations[] = []) {
    this.skipSet = new Set(skipList);
  }

  before(beforeFetch: () => void): IFetchUtil<TValue, TError> {
    if (this.skipSet.has('before')) {
      this.fetcher.before(beforeFetch);
    }
    return this;
  }

  after(afterFetch: () => void): IFetchUtil<TValue, TError> {
    if (this.skipSet.has('after')) {
      this.fetcher.after(afterFetch);
    }
    return this;
  }

  success(successFetch: (value: TValue) => void): IFetchUtil<TValue, TError> {
    if (this.skipSet.has('success')) {
      this.fetcher.success(successFetch);
    }
    return this;
  }

  error(errorFetch: (error?: TError) => void): IFetchUtil<TValue, TError> {
    if (this.skipSet.has('error')) {
      this.fetcher.error(errorFetch);
    }
    return this;
  }

  do(): Promise<TValue | null> {
    return this.fetcher.do();
  }
}
