import type { Observable } from "rxjs";
import type { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from "./schedule.models";

export interface IScheduleServiceService {

  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse>

  delete(id: number): Observable<void>

  listInMonth(year: number, month: number): Observable<ScheduleAppointmentMonthResponse>
}
