import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import packageJson from '../../package.json';

import { routes } from './app.routes';
import { APP_VERSION } from './tokens/app-version.token';
import { provideFirebaseServices } from './config/firebase';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: APP_VERSION, useValue: packageJson.version },

    provideFirebaseServices(),
  ],
};
