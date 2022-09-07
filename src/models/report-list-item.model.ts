import { ReportApprovalModel } from '@/models/report-approval.model';
import { ReportEvaluationModel } from '@/models/report-evaluation.model';
import { ReportStatusType } from '@/models/report-status.type';

export interface ReportListItemModel {
  name: string;
  user: string;
  image: string;
  creationDate: number;
  status: ReportStatusType;
  evaluation: ReportEvaluationModel | null;
  approval: ReportApprovalModel | null;
}
