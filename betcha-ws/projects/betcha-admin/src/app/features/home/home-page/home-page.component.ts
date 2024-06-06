import { Component, inject } from '@angular/core';
import { AuthStore, SharedModule } from '@lib';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent {
    readonly authStore = inject(AuthStore);

}
