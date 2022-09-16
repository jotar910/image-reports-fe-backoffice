import axios, { AxiosResponse } from 'axios';
import { ReportListItemModel } from '@/models/report-list-item.model';
import { PageableModel } from '@/models/pageable.model';
import { ListFiltersModel } from '@/models/list-filters.model';
import { CreateReportModel } from '@/models/create-report.model';
import { ReportDetailsModel } from '@/models/report-details.model';
import { ReportApprovalStatusType } from '@/models/report-status.type';
import { IApiDataConfig } from '@/configs/apidata.config';

export default Symbol('Reports provider identifier');

export interface IReportsService {
  add(report: CreateReportModel, configs: IApiDataConfig): Promise<void>;

  get(id: number, configs: IApiDataConfig): Promise<ReportDetailsModel>;

  getList({ page, count }: ListFiltersModel, configs: IApiDataConfig): Promise<PageableModel<ReportListItemModel>>;

  publish(id: number, status: ReportApprovalStatusType, configs: IApiDataConfig): Promise<void>;
}

export class ReportsService implements IReportsService {
  add(report: CreateReportModel, configs: IApiDataConfig): Promise<void> {
    const formData = new FormData();
    formData.set('name', report.name);
    formData.set('callback', report.callback);
    formData.set('type', report.type);
    formData.set('url', report.url);
    formData.set('file', report.file);

    return axios.post(`${configs.apiPath}/${configs.apiVersion}/reports`, formData)
  }

  async get(id: number, configs: IApiDataConfig): Promise<ReportDetailsModel> {
    const response: AxiosResponse<ReportDetailsModel> = await axios.get(
      `${configs.apiPath}/${configs.apiVersion}/reports/${id}`
    );
    return {
      ...response.data,
      image: {
        src: `${configs.apiStoragePath}/${configs.apiVersion}/storage/${response.data.image}/`,
        size: 0,
        height: 0,
        width: 0
      }
    };
  }

  async getList({ page, count }: ListFiltersModel, configs: IApiDataConfig): Promise<PageableModel<ReportListItemModel>> {
    const response: AxiosResponse<PageableModel<ReportListItemModel>> = await axios.get(
      `${configs.apiPath}/${configs.apiVersion}/reports/`,
      { params: { page: page + 1, count } }
    );
    return {
      ...response.data,
      content: response.data.content.map((item) => ({
        ...item,
        image: `${configs.apiStoragePath}/${configs.apiVersion}/storage/${item.image}/`
      })),
      page: response.data.page - 1
    };
  }

  publish(id: number, status: ReportApprovalStatusType, configs: IApiDataConfig): Promise<void> {
    return axios.patch(
      `${configs.apiPath}/${configs.apiVersion}/reports/${id}`,
      {approvalStatus: status}
    );
  }
}
