import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';
import { DashboardStore } from './store/dashboard.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  document = inject(DOCUMENT);

  readonly store = inject(DashboardStore);


  @HostBinding('class')
  get themeClass() {
    const color = this.store.group()?.theme || 'blue';
    return `theme-${color}`;
  }


  constructor() {
    console.log('Dashboard starting');
    timer(1000 * 60 * 60).subscribe(() => {
      this.document.location.reload();
    });
  }
}
