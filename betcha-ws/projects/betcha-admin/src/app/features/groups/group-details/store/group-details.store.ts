import { signalStore, withState } from "@ngrx/signals";
import { initialGroupDetailsSlice } from "./group-details.slice";
import { ApiService, withDevtools, withLoadReload } from "@lib";
import { inject } from "@angular/core";
import { fork } from "child_process";
import { forkJoin } from "rxjs";

export const GroupDetailsStore = signalStore(
    withState(initialGroupDetailsSlice),
    withLoadReload((_, id: string, api = inject(ApiService)) => api.getGroupForAdmin(id)), 
    withDevtools('group details')
)