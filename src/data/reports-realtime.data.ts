import { Observable, Subject } from 'rxjs';
import { ReportBaseModel } from '@/models/report-base.model';

export type IRealtimeReportChanges = Partial<ReportBaseModel>;

export default Symbol('Reports realtime provider identifier');

export class ReportsRealtimeService {
  get changes$(): Observable<IRealtimeReportChanges> {
    return this.changesSubject.asObservable();
  }

  private readonly changesSubject: Subject<IRealtimeReportChanges> = new Subject();

  emitChange(id: number, event: IRealtimeReportChanges) {
    this.changesSubject.next({ id, ...event });
  }
}
