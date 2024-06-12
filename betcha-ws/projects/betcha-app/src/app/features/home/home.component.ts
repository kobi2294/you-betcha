import { Component, inject } from '@angular/core';
import { SharedModule } from '@lib';
import { HomeStore } from './store/home.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HomeStore]
})
export default class HomeComponent {
  readonly store = inject(HomeStore);
}
