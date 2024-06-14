import { computed, inject } from "@angular/core";
import { ApiService, AuthStore, NotificationsService } from "@lib";
import { signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { GameStore } from "../../../stores/game/game.store";
import { firstValueFrom } from "rxjs";
import { DbModel } from "@tscommon";

export const GuessesStore = signalStore(
    withState({}), 
    withComputed((_, auth = inject(AuthStore), game = inject(GameStore)) => ({
        matches: computed(() => game.vm().futureMatches), 
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
    }))
)