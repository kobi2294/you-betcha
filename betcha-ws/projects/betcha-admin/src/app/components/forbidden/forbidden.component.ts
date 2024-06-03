import { Component, inject } from '@angular/core';
import { AuthStore, PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss'
})
export class ForbiddenComponent {
  authStore = inject(AuthStore);

}
