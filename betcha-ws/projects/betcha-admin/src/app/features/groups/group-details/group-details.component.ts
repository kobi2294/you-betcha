import { Component } from '@angular/core';
import { SharedModule, onChangeMap, repeatNotNull } from '@lib';
import { Subject, delay, of, tap } from 'rxjs';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export default class GroupDetailsComponent {
  readonly subj$ = new Subject<number | null>();

  readonly res$ = this.subj$.pipe(
    repeatNotNull(),
    onChangeMap(n => of(n).pipe(
      tap(n => console.log(`started ${n}`)), 
      delay(5000),
      tap(n => console.log(`ended ${n}`))
    ))
  );

  constructor() {
    this.res$.subscribe();
  }
}
