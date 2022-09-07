export interface PageableModel<T> {
  content: T[];
  page: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}
