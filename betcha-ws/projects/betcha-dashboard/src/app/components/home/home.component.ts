import { Component, inject, input } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { SharedModule } from '@lib';
import { SlidePresenterComponent } from "../slide-presenter/slide-presenter.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [SharedModule, SlidePresenterComponent]
})
export class HomeComponent {
  readonly store = inject(DashboardStore);

  readonly secret = input.required<string>();

  constructor() {
    this.store.setGroupSecret(this.secret);
  }

}
