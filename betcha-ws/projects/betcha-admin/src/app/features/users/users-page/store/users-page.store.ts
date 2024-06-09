import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialUsersPageSlice } from "./users-page.slice";
import { ApiService, rxNotifier, withDevtools, withLoadReload } from "@lib";
import { inject } from "@angular/core";
import { concatMap, delay, forkJoin, tap } from "rxjs";
import { Api } from "@tscommon";
import { rxMethod } from "@ngrx/signals/rxjs-interop";



export const UsersPageStore = signalStore(
    withState(initialUsersPageSlice), 
    withLoadReload((_, search: string, api = inject(ApiService)) => 
            forkJoin({users: api.searchUsers(search)})),
    withMethods((store, api = inject(ApiService), rxNotif = rxNotifier(() => store.setIdle())) => ({
        setUserRole: rxMethod<Api.SetUserRoleRequest>(req$ => req$.pipe(
            tap(_ => store.setLoading()),
            concatMap(req => api.setUserRole(req).pipe(
                tap(_ => store.reload()), 
                rxNotif('User role has been updated')
            ))
        ))
    })),
    withDevtools('users page')
)