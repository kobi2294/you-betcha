import { Injector, inject, runInInjectionContext } from "@angular/core";
import { patchState, signalStoreFeature, withHooks, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { MergeFeatureResults, SignalStoreFeature, SignalStoreFeatureResult } from "@ngrx/signals/src/signal-store-models";
import { Observable, switchMap, tap } from "rxjs";
import { LoadStateFeatureResult, withLoadState } from "./with-load-state.feature";
import { InputStore, RxMethod } from "./_types";

type LoadMethod<Input extends SignalStoreFeatureResult, T> = (store: InputStore<Input>) => Observable<T>;

type LoadMethodFeatureResult = MergeFeatureResults<[LoadStateFeatureResult, {state: {}, signals: {}, methods: {load: RxMethod<void>}}]>;

export function withLoad<Input extends SignalStoreFeatureResult, T>(loadMethod: LoadMethod<Input, T>, loadOnInit: boolean = false)
: SignalStoreFeature<Input, LoadMethodFeatureResult> {
    const res: SignalStoreFeature<Input, LoadMethodFeatureResult> = store => {
        const injector = inject(Injector);
        const storeContent = {
            ...store.slices, 
            ...store.signals, 
            ...store.methods
        };

        const loader = () => runInInjectionContext(injector, () => loadMethod(storeContent));
        const feature = signalStoreFeature(
            withLoadState(),
            withMethods((store) => ({                
                load: rxMethod<void>(trigger$ => trigger$.pipe(
                    tap(_ => patchState(store, { loadState: 'loading' })),
                    switchMap(_ => loader().pipe(
                        tap(data => patchState(store, { ...data, loadState: 'idle'}))
                    ))
                ))
            })), 
            withHooks({
                onInit: store => {
                    if (loadOnInit) {
                        store.load();
                    }
                }
            })
        );

        return feature(store);
    }
    return res;

}