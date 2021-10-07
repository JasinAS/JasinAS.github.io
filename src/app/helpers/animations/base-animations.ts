import { animate, style, transition, trigger } from '@angular/animations';

export let slideIn = trigger('slideIn', [
  transition(':enter', [
    style({
      transform: 'translateY(100%)',
      opacity: 0,
    }),
    animate(
      '350ms',
      style({
        transform: 'translateY(0%)',
        opacity: 1,
      })
    ),
  ]),
]);

export let scaleAnimation = trigger('scaleAnimation', [
  transition(':enter', [
    style({
      transform: 'scale(0)',
      opacity: 0,
    }),
    animate(
      '1000ms',
      style({
        transform: 'scale(1)',
        opacity: 1,
      })
    ),
  ]),
]);
