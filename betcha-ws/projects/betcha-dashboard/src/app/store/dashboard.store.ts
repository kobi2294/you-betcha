import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialDashboardSlice } from "./dashboard.slice";
import { QueryService, buildGameVm, withDevtools, withQuery } from "@lib";
import { DestroyRef, computed, inject } from "@angular/core";
import { catchError, filter, interval, map, of, startWith, switchMap, take, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { slidesForState } from "../models/slides-organizer";

export const DashboardStore = signalStore(
    {providedIn: 'root'}, 
    withState(initialDashboardSlice), 
    withQuery((_, query = inject(QueryService)) => query.getMetadata().pipe(
        map(md => ({
            matches: md.matches,
            stages: md.stages,
            statistics: md.statistics
        }))
    )),
    withComputed((store) => ({
        vm: computed(() => buildGameVm(store.matches(), store.statistics(), 
            store.stages(), store.calculatedGroup(), store.calculatedGroupMatchScores()))
    })),
    withComputed((store) => ({
        currentSlide: computed(() => store.currentSlideIndex() >= 0 ? store.slides()[store.currentSlideIndex()] : null),
    })),
    withMethods((store, query = inject(QueryService)) => ({
        setGroupSecret: rxMethod<string>(secret$ => secret$.pipe(
            switchMap(secret => query.getGroupCalculatedDateBySecret(secret).pipe(
                tap(data => patchState(store, {...data})), 
                catchError(_ => of())
            ))
        )), 
        recalcSlide: rxMethod<void>(trigger$ => trigger$.pipe(
            tap(() => {
                const state = slidesForState(store.vm());
                patchState(store, {slides: state.slides, currentSlideIndex: state.index})
            })
        ))
    })),
    withDevtools('Dashboard Group Store'), 
    withHooks((store, destroyRef = inject(DestroyRef)) => ({
        onInit: () => {
            const trig$ = toObservable(store.group).pipe(
                filter(g => !!g),
                take(1), 
                switchMap(_ => interval(5000).pipe(startWith(0), map(() => {}), )), 
                takeUntilDestroyed(destroyRef)
            );
            store.recalcSlide(trig$);
        }
    })), 

)