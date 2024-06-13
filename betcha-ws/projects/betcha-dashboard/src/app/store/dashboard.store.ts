import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialDashboardSlice } from "./dashboard.slice";
import { QueryService, buildGameVm, comingUp, withDevtools, withQuery } from "@lib";
import { DestroyRef, computed, inject } from "@angular/core";
import { catchError, interval, map, of, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
        comingUp: computed(() => comingUp(store.vm().nextMacthes, store.now()))
    })),
    withMethods((store, query = inject(QueryService)) => ({
        setGroupSecret: rxMethod<string>(secret$ => secret$.pipe(
            switchMap(secret => query.getGroupCalculatedDateBySecret(secret).pipe(
                tap(data => console.log('Updating dashboard data', data)),
                tap(data => patchState(store, {...data})), 
                catchError(_ => of())
            ))
        ))
    })),
    withDevtools('Dashboard Group Store'), 
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