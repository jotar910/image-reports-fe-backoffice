import { PageableModel } from '@/models/pageable.model';

export class PageableFactory {
  static emptyPageable<T>(): PageableModel<T> {
    return {
      content: [],
      page: 0,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0
    };
  }
}
