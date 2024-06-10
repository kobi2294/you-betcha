import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialJoinSlice } from "./join.slice";
import { ApiService, AuthStore, rxNotifier, withDevtools, withLoadState } from "@lib";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, tap } from "rxjs";
import { effect, inject } from "@angular/core";
import { Router } from "@angular/router";

export const JoinStore = signalStore(
    withState(initialJoinSlice), 
    withLoadState(),
    withMethods((store, api = inject(ApiService), notif = rxNotifier()) => ({
        joinGroup: rxMethod<string>(secret$ => secret$.pipe(
            tap(_ => store.setLoading()), 
            exhaustMap(secret => api.joinGroup(secret).pipe(
                tap({
                    next: group => patchState(store, { joinedGroup: group}),
                    error: err => patchState(store, { joinedGroup: null})
                }),
                notif(''), 
            ))
        ))
    })),
    withDevtools('join store'), 
    withHooks((store, router = inject(Router), auth = inject(AuthStore)) => ({
        onInit: () => {
            effect(() => {
                const group = store.joinedGroup();
                const userGroups = auth.user()?.groups ?? [];
                if (group === undefined) {
                    return;
                }

                if ((group === null) || (userGroups.includes(group.id))) {
                    router.navigate(['home']);
                    return;
                }
            })
        }
    }))
)