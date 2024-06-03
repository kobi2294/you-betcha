import { Component, inject, input } from '@angular/core';
import { AuthStore } from '../../../../stores/auth.store';

@Component({
  selector: 'lib-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  admin = input(false);

  store = inject(AuthStore);

}
