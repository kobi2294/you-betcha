import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { LoadState } from "../../models/load-state.model";
import { Signal, computed } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { map, tap } from "rxjs";
import { EmptyFeatureResult, SignalStoreFeature, SignalStoreFeatureResult } from "@ngrx/signals/src/signal-store-models";
import { RxMethod } from "./_types";

export type LoadSlice = { loadState: LoadState };
export const initialLoadSlice: LoadSlice = { loadState: 'idle' };

export type LoadStateFeatureResult = {
    state: LoadSlice, 
    signals: {isLoading: Signal<boolean>, isIdle: Signal<boolean>}, 
    methods: { setLoading: () => void, setIdle: () => void, setLoadState: RxMethod<LoadState | boolean> }
}

export type LoadStateFeature = SignalStoreFeature<EmptyFeatureResult, EmptyFeatureResult & LoadStateFeatureResult>

export function withLoadState(): LoadStateFeature {
    return signalStoreFeature(
        withState(initialLoadSlice), 
        withComputed(store => ({
            isLoading: computed(() => store.loadState() === 'loading'),
            isIdle: computed(() => store.loadState() === 'idle'),
        })), 
        withMethods(store => ({
            setLoading: () => patchState(store, { loadState: 'loading' }),
            setIdle: () => patchState(store, { loadState: 'idle' }),
            setLoadState: rxMethod<LoadState | boolean>(trigger$ => trigger$.pipe(
                map(trigger => typeof trigger === 'boolean' ? (trigger ? 'loading' : 'idle') : trigger), 
                tap(loadState => patchState(store, { loadState }))
            ))
        }))
    )
}

export const idleState: LoadSlice = { loadState: 'idle' };
export const loadingState: LoadSlice = { loadState: 'loading' };