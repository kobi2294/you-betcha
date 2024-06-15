import { Component, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';

@Component({
  selector: 'app-coming-up',
  standalone: true,
  imports: [],
  templateUrl: './coming-up.component.html',
  styleUrl: './coming-up.component.scss'
})
export class ComingUpComponent {
  readonly store = inject(DashboardStore);

}
