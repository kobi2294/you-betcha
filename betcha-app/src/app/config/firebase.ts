import { EnvironmentProviders } from "@angular/core";
import { getFirestore, provideFirestore, connectFirestoreEmulator } from "@angular/fire/firestore";
import { environment } from "../../environments/environment";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import { connectFunctionsEmulator, getFunctions, provideFunctions } from "@angular/fire/functions";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { connectStorageEmulator, getStorage, provideStorage } from "@angular/fire/storage";


export function importFirebase(): EnvironmentProviders {
  return provideFirebaseApp(() => initializeApp(environment.firebaseConfig));
}
export function importFirestore(): EnvironmentProviders {
  return provideFirestore(() => {
    const firestore = getFirestore();
    if(environment.simulation) {
      connectFirestoreEmulator(firestore, 'localhost',8080);
    }
    return firestore;
  })
}

export function importAuth(): EnvironmentProviders {
  return provideAuth(() => {
    const auth = getAuth();
    if(environment.simulation) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    return auth;
  })
}

export function importFunctions(): EnvironmentProviders {
  return  provideFunctions(() => {
    const functions = getFunctions(undefined, 'europe-west3');
    if(environment.simulation) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
  })
}

export function importStorage(): EnvironmentProviders {
  return provideStorage(() => {
    const storage = getStorage();
    if(environment.simulation) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
    return storage;
  });
}
