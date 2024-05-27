import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  getFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import {
  connectAuthEmulator,
  getAuth,
  provideAuth,
  setPersistence,
} from '@angular/fire/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import {
  FirebaseOptions,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';

export function provideFirebaseServices(
  config: FirebaseOptions,
  simulation: boolean
): EnvironmentProviders {

  return makeEnvironmentProviders([
    importFirebase(),
    importFirestore(),
    importAuth(),
    importFunctions(),
    importStorage(),
  ]);

  function importFirebase(): EnvironmentProviders {
    return provideFirebaseApp(() => initializeApp(config));
  }
  function importFirestore(): EnvironmentProviders {
    return provideFirestore(() => {
      const firestore = getFirestore();
      if (simulation) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    });
  }
  function importAuth(): EnvironmentProviders {
    return provideAuth(() => {
      console.log('AUTH AUTH');
      const auth = getAuth();
      if (simulation) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    });
  }
  function importFunctions(): EnvironmentProviders {
    return provideFunctions(() => {
      const functions = getFunctions(undefined, 'europe-west3');
      if (simulation) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    });
  }
  function importStorage(): EnvironmentProviders {
    return provideStorage(() => {
      const storage = getStorage();
      if (simulation) {
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    });
  }
}
