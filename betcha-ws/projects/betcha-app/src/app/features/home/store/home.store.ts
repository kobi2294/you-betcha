import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialHomeSlice } from "./home.slice";
import { DestroyRef, computed, inject } from "@angular/core";
import { GameStore } from "../../../stores/game/game.store";
import { firstValueFrom, interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GroupsStore } from "../../../stores/groups/groups.store";
import { ApiService, AuthStore, NotificationsService, comingUp, withDevtools } from "@lib";
import { DbModel } from "@tscommon";

export const HomeStore = signalStore(
    withState(initialHomeSlice),
    withComputed((store, auth = inject(AuthStore), game = inject(GameStore), groups = inject(GroupsStore)) => ({
        comingUp: computed(() => comingUp(game.vm().nextMacthes, store.now())),
        inProgress: computed(() => game.vm().inProgressMatches),
        recent: computed(() => game.vm().recentMatches),
        selectedGroup: computed(() => groups.selectedGroup()), 
        hasNoGroups: computed(() => auth.user() && auth.user()!.groups.length === 0), 
        guesses: computed(() => auth.user()!.guesses)
    })), 
    withMethods((_, api = inject(ApiService), notify = inject(NotificationsService)) => ({
        setGuess: async (matchId: string, guess: DbModel.GuessValue) => {
            try {
                await firstValueFrom(api.setUserGuess(matchId, guess));
            }
            catch (err) {
                notify.error(err);
            }
        }
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