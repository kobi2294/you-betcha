import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { computed, effect, inject } from "@angular/core";
import { Auth, Unsubscribe, getRedirectResult } from "@angular/fire/auth";

export const AuthStore = signalStore(
    {providedIn: 'root'},
    withState(initialAuthSlice), 
    withComputed(store => ({
        loginRequired: computed(() => store.user() === null), 
        isInProgress: computed(() => store.user() === undefined)
    })),
    withMethods((_, afAuth = inject(Auth)) => ({
        signOut: () => afAuth.signOut()
    })),
    withHooks((store, afAuth = inject(Auth)) => {
        let sub: Unsubscribe | null = null;
        return {
            onInit: () => {
                sub = afAuth.onAuthStateChanged(user => {
                    patchState(store, {user})
                });
            },
            onDestroy: () => {
                if (sub) {
                    sub();
            }
        }
    }})
)