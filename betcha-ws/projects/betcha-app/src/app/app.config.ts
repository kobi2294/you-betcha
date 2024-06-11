import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseServices, provideLib, provideLoginUi, providePwa, provideVersion } from '@lib';
import { environment } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideVersion(environment),
    provideLib(),
    providePwa(),
    provideFirebaseServices(environment.firebaseConfig, environment.simulation),   
    provideLoginUi(), 
    provideServiceWorker('ngsw-worker.js', {
        // enabled: !isDevMode(),
        enabled: true,
        registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
