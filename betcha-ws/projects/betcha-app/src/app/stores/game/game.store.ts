import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialGameSlice } from "./game.slice";
import { computed, effect, inject } from "@angular/core";
import { buildVm } from "./game.helpers";
import { MetadataStore, QueryService, withDevtools } from "@lib";
import { GroupsStore } from "../groups/groups.store";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, debounce, debounceTime, of, switchMap, tap } from "rxjs";

export const GameStore = signalStore(
    {providedIn: 'root'}, 
    withState(initialGameSlice), 
    withComputed((store, metadata = inject(MetadataStore)) => ({
        vm: computed(() => buildVm(metadata.matches(), metadata.statistics(),metadata.stages(), 
            store.calculatedGroup(), store.calculatedGroupMatchScores()))
    })), 
    withMethods((store, query = inject(QueryService)) => ({
        setGroupId: rxMethod<string>(id$ => id$.pipe(
            switchMap(id => query.getGroupCalculatedData(id).pipe(
                tap(data => patchState(store, data)), 
                catchError(_ => of())
            ))
        ))
    })),
    withDevtools('Game Store'), 
    withHooks((store, groups = inject(GroupsStore)) => ({
        onInit: () => {
            store.setGroupId(groups.selectedGroupId);
        }
    }))
)