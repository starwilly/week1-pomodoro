import { Component } from '@angular/core';
import {clockPanelAnimation, slideInOut} from './animations';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOut, clockPanelAnimation]
})
export class AppComponent {
  menuState = null;
  routeState;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.menuState = null;
      }
      if (e instanceof NavigationEnd) {
        // this.routeState = this.route.snapshot.firstChild.data;
        const data = this.route.snapshot.firstChild.routeConfig.data;
        this.routeState = (data && data.animation) || 'out';

      }
    });
  }



  getAnimationData(outlet: RouterOutlet) {
    if (this.menuState !== null) {
      console.log('set by menu state', this.menuState);
      return this.menuState;
    }
    return (outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation);
  }

  toggleMenu() {
    if (this.menuState !== null) {
      this.menuState = this.menuState === 'in' ? 'out' : 'in';
      return;
    }
    const o = (this.route && this.route.snapshot && this.route.snapshot.data &&
      this.route.snapshot.data.animation);
    console.log(this.route.snapshot);
    this.menuState = this.routeState === 'in' ? 'out' : 'in';
  }
}
