import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialGroupsSlice } from "./groups.slice";
import { computed, effect, inject } from "@angular/core";
import { AuthStore, QueryService, withDevtools } from "@lib";
import { debounceTime, switchMap, tap } from "rxjs";
import { getSelectedGroup } from "./groups.helper";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { toRecord } from "@tscommon";

export const GroupsStore = signalStore(
    {providedIn: 'root'},
    withState(initialGroupsSlice), 
    withComputed(store => ({
        selectedGroup: computed(() => getSelectedGroup(store.groups(), store.selectedGroupId())),
        groupsArray: computed(() => Object.values(store.groups()).sort((a, b) => a.displayName.localeCompare(b.displayName))),
    })),
    withMethods((store, query = inject(QueryService)) => ({
        setSelectedGroup: rxMethod<string>(id$ => id$.pipe(
            debounceTime(0),
            tap(id => patchState(store, {selectedGroupId: id})),
        )),
        setGroupIds: rxMethod<string[]>(ids$ => ids$.pipe(
            tap(ids => console.log('Groups Store - setGroupIds', ids)),
            switchMap(ids => query.getGroups(ids)), 
            tap(groups => patchState(store, {groups: toRecord(groups, g => g.id), selectedGroupId: store.selectedGroupId() || groups[0]?.id || ''}))
        ))
    })),    
    withHooks((store, auth=inject(AuthStore)) => ({
        onInit: () => {
            const groupIds = computed(() => auth.user()?.groups || []);
            store.setGroupIds(groupIds);
        }
    })), 

    withDevtools('Groups Store')

)