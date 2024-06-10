import { patchState, signalStore, withHooks, withState } from "@ngrx/signals";
import { initialRouterSlice } from "./router.slice";
import { DestroyRef, inject } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { collectRouterData } from "./router.helpers";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export const RouterStore = signalStore(
    {providedIn: 'root'},
    withState(initialRouterSlice), 
    withHooks((store, router = inject(Router), destroyRef = inject(DestroyRef)) => ({
        onInit: () => {
            router.events.pipe(
                filter(ev => ev instanceof NavigationEnd),
                map(_ => router.routerState.snapshot.root), 
                map(route => collectRouterData(route)), 
                takeUntilDestroyed(destroyRef)
            ).subscribe(data => {
                patchState(store, {data})
            })
        }
    }))
)