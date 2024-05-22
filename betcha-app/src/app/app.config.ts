import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import packageJson from '../../package.json';

import { routes } from './app.routes';
import { APP_VERSION } from './tokens/app-version.token';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { importAuth, importFirebase, importFirestore, importFunctions, importStorage, provideFirebaseServices } from './config/firebase';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: APP_VERSION, useValue: packageJson.version },

    provideFirebaseServices(),
  ],
};
