import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  constructor() { }

  @Input() value: number;
  @Input() showBorder = true;
  @Input() bgColor = 'transparent';
  @Input() foregroundColor = '#EA5548';

  ngOnInit() {
  }

  get dashArray(): string {
    return `${this.value === 100 ? 101 : this.value} 100`;
  }

}
