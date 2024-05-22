import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_VERSION } from './tokens/app-version.token';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  version = inject(APP_VERSION);
  env = environment.name;
}
