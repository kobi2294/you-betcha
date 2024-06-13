import { patchState, signalStore, withComputed, withHooks, withState } from "@ngrx/signals";
import { initialHomeSlice } from "./home.slice";
import { DestroyRef, computed, inject } from "@angular/core";
import { GameStore } from "../../../stores/game/game.store";
import { interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GroupsStore } from "../../../stores/groups/groups.store";
import { AuthStore, comingUp, withDevtools } from "@lib";

export const HomeStore = signalStore(
    withState(initialHomeSlice),
    withComputed((store, auth = inject(AuthStore), game = inject(GameStore), groups = inject(GroupsStore)) => ({
        comingUp: computed(() => comingUp(game.vm().nextMacthes, store.now())),
        selectedGroup: computed(() => groups.selectedGroup()), 
        hasNoGroups: computed(() => auth.user() && auth.user()!.groups.length === 0)
    })), 
    withDevtools('Home Store'),
    withHooks((store, destroyRef = inject(DestroyRef)) => ({
        onInit: () => {
            interval(3000).pipe(
                takeUntilDestroyed(destroyRef)    
            ).subscribe(() => {
                patchState(store, { now: Date.now() })
            })
        }
    })), 
)