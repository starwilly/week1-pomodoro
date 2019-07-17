import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, timer} from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor() { }

  @Input() total: number;
  @Input() elapse: number;

  ngOnInit() {
  }

  get percentage(): number {
    return this.elapse / this.total * 100;
  }

  get text(): string {
    const value = this.total - this.elapse;
    // console.log(value);
    const minute = `${Math.floor(value / 60)}`.padStart(2, '0');
    const second = `${value % 60}`.padStart(2, '0');
    return `${minute}:${second}`;
  }

}
