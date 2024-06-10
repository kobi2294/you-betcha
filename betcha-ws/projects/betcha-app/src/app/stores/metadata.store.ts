import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialMetadataSlice } from "./metadata.slice";
import { computed, effect, inject } from "@angular/core";
import { AuthStore, QueryService, withDevtools } from "@lib";
import { debounceTime, interval, map, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { nextGuesses, nextMatch } from "./metadata.helpers";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

export const MetadataStore = signalStore(
    {providedIn: 'root'},
    withState(initialMetadataSlice), 
    withMethods((store, auth = inject(AuthStore)) => ({
        recalc: rxMethod<void>(trigger$ => trigger$.pipe(
            debounceTime(0),
            tap(_ => {
                const next = nextMatch(store.matches(), store.stages());
                const guesses = nextGuesses(store.matches(), store.stages(), auth.user()?.guesses ?? {});
                patchState(store, {next, guesses});
            })))
        })
    ),
    withHooks((store, query = inject(QueryService), auth = inject(AuthStore)) => ({
        onInit: () => {
            effect(() => {
                const matches = store.matches();
                const stages = store.stages();
                const guesses = auth.user()?.guesses ?? {};
                store.recalc();
            });

            query.getMetadata().pipe(
                takeUntilDestroyed(),
                tap((md) => {
                    patchState(store, {matches: md.matches, countries: md.countries, stages: md.stages});                
                })
            ).subscribe();

            store.recalc(interval(1000 * 60).pipe(map(() => {})));
        }
    })), 
    withDevtools('metadaa')
    
)