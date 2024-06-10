import { patchState, signalStore, withComputed, withHooks, withState } from "@ngrx/signals";
import { initialMetadataSlice } from "./metadata.slice";
import { computed, inject } from "@angular/core";
import { QueryService, withDevtools } from "@lib";
import { interval, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { nextMatch } from "./metadata.helpers";

export const MetadataStore = signalStore(
    {providedIn: 'root'},
    withState(initialMetadataSlice), 
    withHooks((store, query = inject(QueryService)) => ({
        onInit: () => {
            query.getMetadata().pipe(
                takeUntilDestroyed(),
                tap((md) => {
                    const next = nextMatch(md.matches, md.stages);
                    patchState(store, {matches: md.matches, countries: md.countries, stages: md.stages, next});                
                })
            ).subscribe();

            interval(1000 * 60).pipe(
                takeUntilDestroyed(),
                tap(() => {
                    const next = nextMatch(store.matches(), store.stages());
                    patchState(store, {next});
                })
            ).subscribe();
        }
    })), 
    withDevtools('metadaa')
    
)