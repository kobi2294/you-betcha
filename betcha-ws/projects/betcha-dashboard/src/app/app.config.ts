import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseServices, provideVersion } from '@lib';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideVersion(environment),
    provideFirebaseServices(environment.firebaseConfig, environment.simulation),   
  ]
};
