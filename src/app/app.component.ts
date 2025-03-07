import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CardHeaderComponent } from "./commons/components/card-header/card-header.component";
import { filter, map, type Subscription } from 'rxjs';
import { MenuBarComponent } from "./commons/components/menu-bar/menu-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = '';
  private routeSubscription?: Subscription

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getRouteTitle(this.activatedRoute))
    ).subscribe(title => this.title = title)
  }

  ngOnDestroy(): void {
    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  private getRouteTitle(router: ActivatedRoute ): string {
    let child = router
    while(child.firstChild) {
      child = child.firstChild;
    }

    return child.snapshot.data['title'] || 'Default Title'
  }
}
