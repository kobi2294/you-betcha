import { signalStore, withState } from "@ngrx/signals";
import { initialGroupsPageSlice } from "./groups-page.slice";
import { ApiService, withDevtools, withLoadMethod, withLoadState } from "@lib";
import { inject } from "@angular/core";
import { forkJoin, tap } from "rxjs";

export const GroupsPageStore = signalStore(
    withState(initialGroupsPageSlice), 
    withDevtools('groups page'),
    withLoadState(), 
    withLoadMethod((_, api = inject(ApiService)) => forkJoin({groups: api.getManagedGroups()}), true), 
)