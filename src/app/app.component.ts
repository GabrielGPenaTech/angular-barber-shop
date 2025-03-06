import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from "./clients/components/client-form/client-form.component";
import { NewClientComponent } from "./clients/new-client/new-client.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NewClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-barber-shop';
}
