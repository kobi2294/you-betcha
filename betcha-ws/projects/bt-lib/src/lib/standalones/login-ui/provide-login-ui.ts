import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { sign } from 'crypto';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseui from 'firebaseui';

export const AUTH_UI = new InjectionToken<firebaseui.auth.AuthUI>('AUTH_UI');
export const AUTH_CONFIG = new InjectionToken<firebaseui.auth.Config>(
  'AUTH_CONFIG'
);

export function provideLoginUi(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: AUTH_UI,
      useFactory: () => new firebaseui.auth.AuthUI(firebaseAuth.getAuth()),
    },
    {
      provide: AUTH_CONFIG,
      useValue: {
        callbacks: {
          // signInSuccessWithAuthResult: () => false,
          // uiShown: () => {},
        },
        signInFlow: 'redirect',
        signInSuccessUrl: '/',
        signInOptions: [
          firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
          {
            requireDisplayName: true,
            provider: firebaseAuth.EmailAuthProvider.PROVIDER_ID,
          },
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      },
    },
  ]);
}
