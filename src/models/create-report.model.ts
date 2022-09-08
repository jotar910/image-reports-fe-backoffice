export interface CreateReportModel {
  name: string;
  callback: string;
  type: 'file' | 'url';
  url: string;
  file: string;
}
