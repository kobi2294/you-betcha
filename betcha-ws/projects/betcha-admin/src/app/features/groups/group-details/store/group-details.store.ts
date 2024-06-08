import { signalStore, withMethods, withState } from "@ngrx/signals";
import { initialGroupDetailsSlice } from "./group-details.slice";
import { ApiService, withDevtools, withLoadReload } from "@lib";
import { inject } from "@angular/core";
import { fork } from "child_process";
import { forkJoin } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

export const GroupDetailsStore = signalStore(
    withState(initialGroupDetailsSlice),
    withLoadReload((_, id: string, api = inject(ApiService)) => api.getGroupForAdmin(id)), 
    withDevtools('group details'), 
    withMethods(store => ({
        setDisplayName: rxMethod<string>(trigger$ => trigger$.pipe())
    }))
)