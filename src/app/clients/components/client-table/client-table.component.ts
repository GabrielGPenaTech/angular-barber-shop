import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ClientModelTable } from '../../client.models';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import  { IDialogManagerService } from '../../../services/idialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [
    {provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService},
    {provide: MatPaginatorIntl, useClass: CustomPaginator}

  ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() clients: ClientModelTable[] = []

  dataSource!: MatTableDataSource<ClientModelTable>

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']

  private dialogManagerServiceSubscriptions?: Subscription

  @Output() onConfirmDelete = new EventEmitter<ClientModelTable>()

  @Output() onRequestUpdate = new EventEmitter<ClientModelTable>()

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManageService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients)

      if(this.paginator) {
        this.dataSource.paginator = this.paginator
      }
    }
  }

  ngOnDestroy(): void {
    if(this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe()
    }
  }


  requestUpdate(client: ClientModelTable) {
      this.onRequestUpdate.emit(client)
  }

  deleteClient(client: ClientModelTable) {
    this.dialogManageService.showYesNoDialog(YesNoDialogComponent,
      {title: 'Exclusão do cliente', content: `Confirma a exclusão do cliente ${client.name} ?`}
    )
    .subscribe(result => {
      if(result) {
        this.onConfirmDelete.emit(client)
        const updatedList = this.dataSource.data.filter(dataRowTable => dataRowTable.id != client.id)
        this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList)
      }
    })
  }

  formatPhone(phone: string) {
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}}`
  }

}
