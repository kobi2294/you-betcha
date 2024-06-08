import { signalStore, withMethods, withState } from "@ngrx/signals";
import { initialGroupDetailsSlice } from "./group-details.slice";
import { ApiService, withDevtools, withLoadReload } from "@lib";
import { inject } from "@angular/core";
import { switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

export const GroupDetailsStore = signalStore(
    withState(initialGroupDetailsSlice),
    withLoadReload((_, id: string, api = inject(ApiService)) => api.getGroupForAdmin(id)), 
    withDevtools('group details'), 
    withMethods((store, api = inject(ApiService)) => ({
        setDisplayName: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.setGroupDisplayName({groupId: store.groupId(), displayName: val}).pipe(
                tap(_ => store.reload())
            ))
        ))
    }))
)