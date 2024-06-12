import { Component, inject, input } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { APP_ENV, EnvironmentType } from '../../../../utils';

@Component({
  selector: 'lib-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  admin = input(false);

  store = inject(AuthStore);
  env = inject(APP_ENV);

  envLabel = this.labelOfEnv(this.env);

  labelOfEnv(env: EnvironmentType): string { 
    switch (env) {
      case 'dev': return 'D';
      case 'stage': return 'S';
      case 'prod': return '';
    }
  }

}
