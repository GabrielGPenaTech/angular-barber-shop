import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { CardHeaderComponent } from "../card-header/card-header.component";

@Component({
  selector: 'app-menu-bar',
  imports: [MatMenuModule, MatButtonModule, CardHeaderComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

  constructor(
    private router: Router
  ) {}

  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
