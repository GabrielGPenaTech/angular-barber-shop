import { Component, Inject, type OnDestroy, type OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from "../components/schedule-calendar/schedule-calendar.component";
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ISankBarManagerService } from '../../services/isnackbar-manager.service';
import type { IScheduleServiceService } from '../../services/api-client/schedules/ischedules.service';
import type { Subscription } from 'rxjs';
import type { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, SelectClientModel } from '../schedule.models';
import type { SaveScheduleRequest } from '../../services/api-client/schedules/schedule.models';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService },
  ]
})
export class SchedulesMonthComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = []
  private selectedDate?: Date

  monthSchedule!: ScheduleAppointmentMonthModel
  clients: SelectClientModel[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpClientService: IClientService,
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpScheduleService: IScheduleServiceService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManager: ISankBarManagerService,
  ) {}

  ngOnInit(): void {
    const currentDate = new Date()
    this.fetchSchedule(currentDate)

    this.subscriptions.push(
      this.httpClientService.list().subscribe(data => this.clients = data)
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(
      this.httpScheduleService.delete(schedule.id).subscribe()
    )
  }

  onScheduleClient(schedule: SaveScheduleModel) {
    const { clientId, endAt, startAt } = schedule

    if(startAt && endAt && clientId) {
      const request: SaveScheduleRequest = {
        startAt,
        endAt,
        clientId
      }

      this.subscriptions.push(
        this.httpScheduleService.save(request).subscribe({
          next: (_) => {
            this.snackbarManager.show('Agendamento realizado com sucesso.')
            if(this.selectedDate) {
              this.fetchSchedule(this.selectedDate)
            }
          },
          error: (err) => {
            this.snackbarManager.show('Ocorreu um problema ao realizar o agendamento!')
            console.log(err)
          }
        })
      )
    }
  }

  onDateChange(date: Date) {
    this.selectedDate = date
    this.fetchSchedule(date)
  }

  private fetchSchedule(date: Date): void{
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    this.subscriptions.push(
      this.httpScheduleService.listInMonth(year, month).subscribe(data => this.monthSchedule = data)
    )
  }
}
