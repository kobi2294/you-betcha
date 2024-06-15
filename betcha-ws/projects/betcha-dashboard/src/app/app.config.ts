import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseServices, provideLib, provideVersion } from '@lib';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideVersion(environment),
    provideLib(),
    provideFirebaseServices(environment.firebaseConfig, environment.simulation),   
  ]
};
