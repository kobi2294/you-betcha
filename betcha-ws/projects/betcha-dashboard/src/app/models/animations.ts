import { animate, style, transition, trigger } from '@angular/animations';

export const flyStart = trigger('flyStart', [
  transition(':enter', [
    style({ transform: 'translateX(-1000px)', opacity: 0 }),
    animate(
      '2500ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate(
      '2500ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      style({ transform: 'translateX(-1000px)', opacity: 0 })
    ),
  ]),
]);

export const flyEnd = trigger('flyEnd', [
  transition(':enter', [
    style({ transform: 'translateX(1000px)', opacity: 0 }),
    animate(
      '1000ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate(
      '1000ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      style({ transform: 'translateX(1000px)', opacity: 0 })
    ),
  ]),
]);

export const flyDown = trigger('flyDown', [
    transition(':enter', [
      style({ transform: 'translate(-50%, 1000px)', opacity: 0 }),
      animate(
        '500ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        style({ transform: 'translate(-50%, 0)', opacity: 1 })
      ),
    ]),
    transition(':leave', [
      style({ transform: 'translate(-50%, 0)', opacity: 1 }),
      animate(
        '500ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        style({ transform: 'translate(-50%, 1000px)', opacity: 0 })
      ),
    ]),      
  ]);

  export const flyStartEnd = trigger('flyStartEnd', [
    transition(':enter', [
      style({ transform: 'translate(-1000px, -50%)', opacity: 0 }),
      animate(
        '2000ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        style({ transform: 'translate(-50%, -50%)', opacity: 1 })
      ),
    ]),
    transition(':leave', [
      style({ transform: 'translate(-50%, -50%)', opacity: 1 }),
      animate(
        '2000ms cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        style({ transform: 'translate(1000px, -50%)', opacity: 0 })
      ),
    ]),      
  ]);

  export const fade = trigger('fade', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(
        '500ms ease-in-out',
        style({ opacity: 1 })
      ),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(
        '500ms ease-in-out',
        style({ opacity: 0 })
      ),
    ]),      
  ]);

