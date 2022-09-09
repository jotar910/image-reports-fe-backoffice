import { ReportStatusType } from '@/models/report-status.type';
import { ReportEvaluationModel } from '@/models/report-evaluation.model';
import { ReportApprovalModel } from '@/models/report-approval.model';

export interface ReportBaseModel {
  id: number;
  name: string;
  user: string;
  creationDate: number;
  status: ReportStatusType;
  evaluation: ReportEvaluationModel | null;
  approval: ReportApprovalModel | null;
}
