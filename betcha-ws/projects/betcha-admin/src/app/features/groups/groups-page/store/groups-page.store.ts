import { signalStore, withComputed, withState } from "@ngrx/signals";
import { initialGroupsPageSlice } from "./groups-page.slice";
import { ApiService, AuthStore, withDevtools, withLoadMethod, withLoadState } from "@lib";
import { computed, inject } from "@angular/core";
import { forkJoin, tap } from "rxjs";

export const GroupsPageStore = signalStore(
    withState(initialGroupsPageSlice), 
    withLoadMethod((_, api = inject(ApiService)) => forkJoin({groups: api.getManagedGroups()}), true), 
    withComputed((_, authStore = inject(AuthStore)) => ({
        canAddGroup: computed(() => authStore.claims()?.role === 'super')
    })),
    withDevtools('groups page'),

)