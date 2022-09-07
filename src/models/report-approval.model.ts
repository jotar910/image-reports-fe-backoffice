import { ReportApprovalStatusType } from '@/models/report-status.type';

export interface ReportApprovalModel {
  user: string;
  status: ReportApprovalStatusType;
  date: number;
}
