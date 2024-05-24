import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
export function provideFirebaseUi(): EnvironmentProviders {
    return makeEnvironmentProviders([
        importProvidersFrom(AngularFireAuthModule),
        importProvidersFrom(FirebaseUIModule.forRoot(baseConfig)), 
    ])
}

const baseConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect', 
    
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID, 
        {
            requireDisplayName: true, 
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        }
    ], 
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
}