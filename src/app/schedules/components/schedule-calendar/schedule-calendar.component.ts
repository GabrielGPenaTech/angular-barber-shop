import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {  MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointmentMonthModel,
  SelectClientModel
} from '../../schedule.models';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTimepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
  providers: [
    {provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService}
  ]
})
export class ScheduleCalendarComponent {

  private _selected: Date = new Date()

  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions']

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>

  addingSchedule: boolean = false

  newSchedule: SaveScheduleModel = {}

  clientSelectFormControl = new FormControl()

  @Input() monthSchedule!: ScheduleAppointmentMonthModel
  @Input() clients: SelectClientModel[] = []

  @Output() onDateChange = new EventEmitter<Date>()
  @Output() onConfirmDelete = new EventEmitter<ClientScheduleAppointmentModel>()
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>()

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: DialogManagerService
  ) {}

}
