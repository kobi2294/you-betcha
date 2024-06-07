import { signalStore, withComputed, withState } from "@ngrx/signals";
import { initialGroupsPageSlice } from "./groups-page.slice";
import { ApiService, AuthStore, withDevtools, withLoad, withLoadState } from "@lib";
import { computed, inject } from "@angular/core";
import { forkJoin, tap } from "rxjs";

export const GroupsPageStore = signalStore(
    withState(initialGroupsPageSlice), 
    withLoad((_, api = inject(ApiService)) => forkJoin({groups: api.getManagedGroups()}), true), 
    withComputed((_, authStore = inject(AuthStore)) => ({
        canAddGroup: computed(() => authStore.claims()?.role === 'super')
    })),
    withDevtools('groups page'),

)