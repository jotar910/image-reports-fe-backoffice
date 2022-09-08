export interface IDataTableConfig {
  defaultRows: number;
  rowsPerPage: number[];
  pageLinkSize: number;
  paginatorPosition: 'top' | 'bottom';
}

export const createDataTableConfig = (): IDataTableConfig => ({
  defaultRows: 10,
  rowsPerPage: [10, 20, 50],
  pageLinkSize: 3,
  paginatorPosition: 'top'
});

export default Symbol('Data table configs provider identifier');
