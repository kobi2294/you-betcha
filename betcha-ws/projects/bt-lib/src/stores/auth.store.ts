import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { computed, effect, inject } from "@angular/core";
import { Auth, Unsubscribe } from "@angular/fire/auth";
import { canAccessAdminApp, claimsFromUser, isInProgress } from "./store.helpers";
import { ApiService } from "../services/api.service";
import { firstValueFrom } from "rxjs";

export const AuthStore = signalStore(
    {providedIn: 'root'},
    withState(initialAuthSlice), 
    withComputed(store => ({
        loginRequired: computed(() => store.fireUser() === null), 
        isInProgress: computed(() => (isInProgress(store.fireUser(), store.user(), store.claims()))), 
    })),
    withComputed(store => ({
        adminAppForbidden: computed(() => !store.isInProgress() && !canAccessAdminApp(store.claims()))
    })),    
    withMethods((_, afAuth = inject(Auth)) => ({
        signOut: () => afAuth.signOut()
    })),
    withHooks((store, afAuth = inject(Auth), api = inject(ApiService)) => {
        let sub: Unsubscribe | null = null;
        return {
            onInit: () => {
                sub = afAuth.onAuthStateChanged(async fireUser => {
                    patchState(store, {fireUser});
                    if (fireUser) {
                        const user = await firstValueFrom(api.getUserDetails());
                        const claims = await claimsFromUser(fireUser);

                        patchState(store, {claims, user});
                    } else {
                        patchState(store, {claims: null, user: null});
                    }
                });

                effect(() => {
                    console.log('user store', getState(store));
                });
            },
            onDestroy: () => {
                if (sub) {
                    sub();
            }
        }
    }})
)