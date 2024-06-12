import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { DestroyRef, computed, effect, inject } from "@angular/core";
import { Auth, User } from "@angular/fire/auth";
import { canAccessAdminApp, getUserDetails, isInProgress, observeAuthStateChange, permissions } from "../router/store.helpers";
import { catchError, interval, of, switchMap, takeWhile, tap } from "rxjs";
import { withDevtools } from "../../utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { QueryService } from "../../services/query.service";
import { arrayContentEquals } from "@tscommon";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

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
        hasAnyGroups: computed(() => (store.claims()?.userGroups ?? []).length > 0),
    })),    
    withMethods((store, afAuth = inject(Auth), query = inject(QueryService)) => ({
        signOut: () => afAuth.signOut(), 
        refreshDetails: rxMethod<User | null>(user$ => user$.pipe(
            tap(fireUser => patchState(store, {fireUser})),
            switchMap(fireUser => getUserDetails(fireUser, query).pipe(
                tap(({user, claims}) => patchState(store, {user, claims})), 
                catchError(_ => of(null))
            ))                    
        )),
    })),
    withHooks((store, destroyRef=inject(DestroyRef), afAuth = inject(Auth), query = inject(QueryService)) => ({
            onInit: () => {
                observeAuthStateChange(afAuth).pipe(
                    takeUntilDestroyed(destroyRef), 
                    tap(fireUser => store.refreshDetails(fireUser)))
                    .subscribe();

                effect(() => {
                    // when the user claims and the claims are not the same, it means we lag behind
                    // in refreshing one of them. since the user keeps updating automatically, we dont need to 
                    // refresh it, but we do need to refresh the claims

                    const user = store.user();
                    if (user == null) return;

                    const claims = store.claims();
                    const groups = claims?.userGroups || [];
                    const role = claims?.role || 'user';

                    if ((!claims) || (!arrayContentEquals(groups, user.groups)) || (role !== user.role)) {
                        // user and claims are not synchronized
                        // we register to an observable which forces refresh every 2 seconds until we are  in sync
                        interval(2000).pipe(
                            tap(_ => store.refreshDetails(afAuth.currentUser)),
                            takeWhile(_ => (!store.claims() || (!arrayContentEquals(store.claims()!.userGroups, store.user()?.groups??[]) || store.claims()?.role !== store.user()?.role)))
                        ).subscribe();
                    }

                })
            }


        }
    )), 
    withDevtools('auth store')
)