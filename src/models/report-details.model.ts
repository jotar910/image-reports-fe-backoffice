import { ReportBaseModel } from '@/models/report-base.model';
import { ReportImageModel } from '@/models/report-image.model';

export interface ReportDetailsModel extends ReportBaseModel {
  image: ReportImageModel;
}
