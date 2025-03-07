import { Routes } from '@angular/router';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { SchedulesMonthComponent } from './schedules/schedules-month/schedules-month.component';

export const routes: Routes = [
  {path: 'client/list', component: ListClientsComponent, title: 'Clientes Cadastrados' },
  {path: 'client/new-client', component: NewClientComponent, title: 'Cadastrar Cliente' },
  {path: 'client/edit-client/:id', component: EditClientComponent, title: 'Atualizar Cliente'},
  {path: 'schedules/month', component: SchedulesMonthComponent, title: 'Agendamentos'},
  {path: '**', redirectTo: 'schedules/month'}
];
