import { Component, input } from '@angular/core';
import { PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  readonly photoUrl = input.required<string>();
  readonly displayName = input.required<string>();

}
