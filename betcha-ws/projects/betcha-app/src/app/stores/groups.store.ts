import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialGroupsSlice } from "./groups.slice";
import { DestroyRef, computed, inject } from "@angular/core";
import { AuthStore, QueryService, withDevtools } from "@lib";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { catchError, debounceTime, filter, forkJoin, map, of, switchMap, tap } from "rxjs";
import { fixSelectedGroup } from "./groups.helper";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

export const GroupsStore = signalStore(
    {providedIn: 'root'},
    withState(initialGroupsSlice), 
    withMethods(store => ({
        setSelectedGroup: rxMethod<string>(id$ => id$.pipe(
            debounceTime(0),
            tap(id => patchState(store, {selectedGroupId: id}))
        )),
    })),    
    withComputed(store => ({
        selectedGroup: computed(() => store.groups()[store.selectedGroupId()]),
    })),
    withHooks((store, auth=inject(AuthStore), query = inject(QueryService), destroyRef = inject(DestroyRef)) => ({
        onInit: () => {
            toObservable(auth.user).pipe(
                map(user => user?.groups || []),
                filter(groups => groups.length > 0), 
                switchMap(groupIds => query.getGroupsData(groupIds).pipe(
                    tap(({groups, calculatedGroups}) => patchState(store, {groups, calculatedGroups,  selectedGroupId: fixSelectedGroup(store.selectedGroupId(), Object.keys(groups))})), 
                    catchError(err => of())
                )),
                takeUntilDestroyed(destroyRef), 
            ).subscribe()
        }
    })), 

    withDevtools('Groups Store')

)