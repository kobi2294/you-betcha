import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { DestroyRef, computed, inject } from "@angular/core";
import { Auth, Unsubscribe } from "@angular/fire/auth";
import { canAccessAdminApp, claimsFromUser, getUserDetails, isInProgress, observeAuthStateChange, permissions } from "./store.helpers";
import { ApiService } from "../services/api.service";
import { firstValueFrom, switchMap, tap } from "rxjs";
import { withDevtools } from "../utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { QueryService } from "../services/query.service";

export const AuthStore = signalStore(
    {providedIn: 'root'},
    withState(initialAuthSlice), 
    withComputed(store => ({
        loginRequired: computed(() => store.fireUser() === null), 
        isInProgress: computed(() => (isInProgress(store.fireUser(), store.user(), store.claims()))), 
    })),
    withComputed(store => ({
        adminAppForbidden: computed(() => !store.isInProgress() && !canAccessAdminApp(store.claims())), 
        photoUrl: computed(() => store.user()?.photoUrl || 'assets/images/guest.png'),
        permissions: computed(() => permissions(store.claims())), 
        isTrustee: computed(() => store.claims()?.role === 'trustee' || store.claims()?.role === 'super'),
        isSuper : computed(() => store.claims()?.role === 'super'),
    })),    
    withMethods((_, afAuth = inject(Auth)) => ({
        signOut: () => afAuth.signOut()
    })),
    withHooks((store, destroyRef=inject(DestroyRef), afAuth = inject(Auth), query = inject(QueryService)) => ({
            onInit: () => {
                observeAuthStateChange(afAuth).pipe(
                    takeUntilDestroyed(destroyRef), 
                    tap(fireUser => patchState(store, {fireUser})),
                    switchMap(fireUser => getUserDetails(fireUser, query))                    
                ).subscribe(({user, claims}) => {
                    patchState(store, {user, claims});
                });
            }
        }
    )), 
    withDevtools('auth store')
)