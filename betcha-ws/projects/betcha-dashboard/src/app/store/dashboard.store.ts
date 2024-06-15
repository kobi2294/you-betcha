import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialDashboardSlice } from "./dashboard.slice";
import { QueryService, buildGameVm, comingUp, withDevtools, withQuery } from "@lib";
import { DestroyRef, computed, inject } from "@angular/core";
import { catchError, interval, map, of, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { trigger } from "@angular/animations";
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
                tap(data => console.log('Updating dashboard data', data)),
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
            const trigger$ = interval(10000).pipe(map(() => {}), takeUntilDestroyed(destroyRef));
            store.recalcSlide(trigger$);
        }
    })), 

)