import { Ref } from 'vue';

export class HandleFetchUtil<T> {
  constructor(
    private readonly loading: Ref<boolean>,
    private readonly error: Ref<boolean>,
    private readonly data: Ref<T>
  ) {}

  fetch(fetchCb: () => Promise<T>) {
    this.beforeFetch();
    fetchCb()
      .then(this.fetchSuccess.bind(this))
      .catch(this.fetchError.bind(this));
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
