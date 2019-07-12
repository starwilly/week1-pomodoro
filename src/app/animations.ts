import {
  trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  state('in', style({
    transform: 'translateX(0)'
  })),
  state('out', style({
    transform: 'translateX(calc(100% - 80px))'
  })),
  transition('in => out', animate('.4s ease-in-out')),
  transition('out => in', animate('.4s ease-in-out'))
]);

export const clockPanelAnimation = trigger('clockPanelAnimation', [
  state('in', style({
    marginRight: '50%'
  })),
  state('out', style({
    marginRight: '80px'
  })),
  transition('in => out', animate('.4s ease-in-out')),
  transition('out => in', animate('.4s ease-in-out'))
]);

