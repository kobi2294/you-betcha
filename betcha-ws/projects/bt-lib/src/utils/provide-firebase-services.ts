import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { getFirestore, provideFirestore, connectFirestoreEmulator } from "@angular/fire/firestore";
import { connectAuthEmulator, getAuth, provideAuth, setPersistence } from "@angular/fire/auth";
import { connectFunctionsEmulator, getFunctions, provideFunctions } from "@angular/fire/functions";
import { FirebaseOptions, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { connectStorageEmulator, getStorage, provideStorage } from "@angular/fire/storage";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { USE_EMULATOR as USE_AUTH_EMULATOR } from "@angular/fire/compat/auth";
import firebase from 'firebase/app';


export function provideFirebaseServices(config: FirebaseOptions, simulation: boolean): EnvironmentProviders {

  console.log('firebase settings', config);

  return makeEnvironmentProviders([
    importFirebase(),
    importFirestore(),
    importAuth(),
    importFunctions(),
    importStorage(),
    {
      provide: FIREBASE_OPTIONS, useValue: config
    }, 
    { provide: USE_AUTH_EMULATOR, useValue: simulation ? ['http://localhost:9099', 9099] : undefined }

  ]);


  function importFirebase(): EnvironmentProviders {
    return provideFirebaseApp(() => initializeApp(config));
  }
  function importFirestore(): EnvironmentProviders {
    return provideFirestore(() => {
      const firestore = getFirestore();
      if(simulation) {
        connectFirestoreEmulator(firestore, 'localhost',8080);
      }
      return firestore;
    })
  }
  function importAuth(): EnvironmentProviders {
    return provideAuth(() => {
      const auth = getAuth();
      if(simulation) {
        connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
      }
      return auth;
    })
  }
  function importFunctions(): EnvironmentProviders {
    return  provideFunctions(() => {
      const functions = getFunctions(undefined, 'europe-west3');
      if(simulation) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    })
  }
  function importStorage(): EnvironmentProviders {
    return provideStorage(() => {
      const storage = getStorage();
      if(simulation) {
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    });
  }
  
}

