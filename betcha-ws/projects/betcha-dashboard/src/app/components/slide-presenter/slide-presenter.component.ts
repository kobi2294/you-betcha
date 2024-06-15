import { Component, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { SharedModule } from '@lib';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { flyDown, flyEnd, flyStart, flyStartEnd } from '../../models/animations';

@Component({
  selector: 'app-slide-presenter',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './slide-presenter.component.html',
  styleUrl: './slide-presenter.component.scss',
  animations: [
    flyStart,
    flyEnd, 
    flyDown, 
    flyStartEnd
    
  ],
})
export class SlidePresenterComponent {
  readonly store = inject(DashboardStore);
}
