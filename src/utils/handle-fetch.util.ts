import { Ref } from 'vue';
import { noop } from 'rxjs';

export default Symbol('Handle fetch util provider identifier');

export class HandleFetchUtil<T> {
  constructor(
    private readonly loading: Ref<boolean>,
    private readonly error: Ref<boolean>,
    private readonly data: Ref<T>
  ) {}

  fetch(fetchCb: () => Promise<T>) {
    return new FetchUtil(fetchCb)
      .before(this.beforeFetch.bind(this))
      .success(this.fetchSuccess.bind(this))
      .error(this.fetchError.bind(this));
  }

  private beforeFetch() {
    this.loading.value = true;
    this.error.value = false;
  }

  private fetchSuccess(data: T) {
    this.data.value = data;
    this.loading.value = false;
  }

  private fetchError() {
    this.error.value = true;
    this.loading.value = false;
  }
}

class FetchUtil<TValue, TError = unknown> {

  private beforeFetchCb: () => void = noop;

  private afterFetchCb: () => void = noop;

  private successFetchCb: (value: TValue) => void = noop;

  private errorFetchCb: (error?: TError) => void = noop;

  constructor(private readonly fetchCb: () => Promise<TValue>) {}

  before(beforeFetch: () => void): this {
    this.beforeFetchCb = beforeFetch;
    return this;
  }

  after(afterFetch: () => void): this {
    this.afterFetchCb = afterFetch;
    return this;
  }

  success(successFetch: (value: TValue) => void): this {
    this.successFetchCb = successFetch;
    return this;
  }

  error(errorFetch: (error?: TError) => void): this {
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
