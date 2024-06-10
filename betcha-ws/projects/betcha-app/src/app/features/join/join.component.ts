import { Component, effect, inject, input, signal } from '@angular/core';
import { ApiService, PagesModule, SharedModule } from '@lib';
import { JoinStore } from './store/join.store';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss', 
  providers: [JoinStore]
})
export default class JoinComponent {
  readonly secret = input.required<string>();
  readonly store = inject(JoinStore);


  constructor() {
    this.store.joinGroup(this.secret);
  }


}
