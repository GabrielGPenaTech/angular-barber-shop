import { Component, EventEmitter, Inject, Input, Output, ViewChild, type AfterViewInit, type OnChanges, type OnDestroy, type SimpleChanges } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ClientModelTable } from '../../client.models';
import type { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import type { IDialogManagerService } from '../../../services/idialog-manager.service';

@Component({
  selector: 'app-client-table',
  imports: [MatTableModule, MatIconModule, MatMiniFabButton, MatPaginatorModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [
    {provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService}
  ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() clients: ClientModelTable[] = []

  dataSource!: MatTableDataSource<ClientModelTable>

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']

  private dialogManagerServiceSubscriptions?: Subscription

  @Output() confirmDelete = new EventEmitter<ClientModelTable>()

  @Output() requestUpdate = new EventEmitter<ClientModelTable>()

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


  onRequestUpdate(_t44: any) {
  throw new Error('Method not implemented.');
  }

  deleteClient(_t44: any) {
  throw new Error('Method not implemented.');
  }

  formatPhone(phone: string) {
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}}`
  }

}
