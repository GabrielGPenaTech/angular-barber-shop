import { Component, Inject, type OnDestroy, type OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import type { ClientModelForm } from '../client.models';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import type { ISankBarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import type { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class EditClientComponent implements OnInit, OnDestroy {

  client: ClientModelForm = { id: 0, email: '', name: '', phone: ''};

  private httpSubscription: Subscription[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManager: ISankBarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if(!id) {
      this.snackbarManager.show("Erro ao recuperar as informações do cliente");
      this.router.navigate(['clients/list'])
      return
    }

    this.httpSubscription.push(
      this.httpService.findByID(Number(id)).subscribe(data => this.client = data)
    )

  }

  ngOnDestroy(): void {
    if(this.httpSubscription) {
      this.httpSubscription.forEach(sub => sub.unsubscribe())
    }
  }

  onSubmittedClient(value: ClientModelForm) {
    const {id, ...request} = value

    if(!id) {
      this.snackbarManager.show("Não foi possível encontrar o usuário, para atualizar");
      this.router.navigate(['clients/list'])
      return;
    }

    this.httpSubscription.push(
      this.httpService.update(id, request).subscribe({
        next: (_) => {
          this.snackbarManager.show("Usuário atualizado com sucesso")
          this.router.navigate(['clients/list'])
        },
        error: (err) => {
          this.snackbarManager.show("Não foi possível atualizar o usuário")
          console.log(err)
        }
      })
    )
  }
}
