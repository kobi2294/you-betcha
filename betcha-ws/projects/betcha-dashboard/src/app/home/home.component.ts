import { Component, inject, input } from '@angular/core';
import { DashboardStore } from '../store/dashboard.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly store = inject(DashboardStore);

  readonly secret = input.required<string>();

  constructor() {
    this.store.setGroupSecret(this.secret);
  }

}
