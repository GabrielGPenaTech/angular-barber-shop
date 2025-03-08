import { Component, Inject, type OnDestroy, type OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { RouterModule, Router } from '@angular/router';
import { ClientTableComponent } from "../components/client-table/client-table.component";
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { ISankBarManagerService } from '../../services/isnackbar-manager.service';
import { ClientModelTable } from '../client.models';

@Component({
  selector: 'app-list-clients',
  imports: [RouterModule, ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },

  ]
})
export class ListClientsComponent implements OnInit, OnDestroy {

  private httpSubscriptions: Subscription[] = []

  clients: ClientModelTable[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISankBarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe(data => this.clients = data)
    )
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(sub => sub.unsubscribe())
  }

  update(client: ClientModelTable) {
    this.router.navigate(['clients/edit-client', client.id])
  }

  delete(client: ClientModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(client.id).subscribe({
        next: (_) => this.snackBarManager.show(`O cliente ${client.name} foi deletado com sucesso.`),
        error: (err) => {
          this.snackBarManager.show(`Ocorreu um erro ao deletar o cliente!`)
          console.log(err)
        }
      })
    )
  }
}
