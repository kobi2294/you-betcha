import { Component, inject } from '@angular/core';
import { AuthStore, SharedModule } from '@lib';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
  readonly store = inject(AuthStore);

}
