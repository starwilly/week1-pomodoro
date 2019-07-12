import { Component } from '@angular/core';
import {clockPanelAnimation, slideInOut} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOut, clockPanelAnimation]
})
export class AppComponent {
  menuState = 'out';

  toggleMenu() {
    this.menuState = this.menuState === 'in' ? 'out' : 'in';
    console.log(this.menuState);
  }
}
