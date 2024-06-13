import { Component, inject, input } from '@angular/core';
import { DashboardStore } from '../store/dashboard.store';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
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
