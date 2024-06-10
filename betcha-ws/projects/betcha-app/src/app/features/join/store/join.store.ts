import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialJoinSlice } from "./join.slice";
import { ApiService, AuthStore, rxNotifier, withDevtools, withLoadState } from "@lib";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, tap } from "rxjs";
import { effect, inject } from "@angular/core";
import { Router } from "@angular/router";
import { GroupsStore } from "../../../stores/groups.store";

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
    withHooks((store, router = inject(Router), auth = inject(AuthStore), groupsStore = inject(GroupsStore)) => ({
        onInit: () => {
            effect(() => {
                const group = store.joinedGroup();
                if (group === undefined) {
                    return;
                }
                if (group === null) {   // failed to join group - so move to home
                    router.navigate(['home']);
                    return;
                }

                // ok so if we got here, we have succesfully joined the group. Nowe we can leave the 
                // page when both the user groups and claim groups contain the new group

                const userGroups = auth.user()?.groups || [];
                const claimGroups = auth.claims()?.userGroups || [];

                if (userGroups.includes(group.id) && claimGroups.includes(group.id)) {
                    groupsStore.setSelectedGroup(group.id);
                    router.navigate(['home']);
                }

                // otherwise, we wait for the next change
            })
        }
    }))
)