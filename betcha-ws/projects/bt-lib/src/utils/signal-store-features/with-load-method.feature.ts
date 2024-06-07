import { Injector, Input, Signal, inject, runInInjectionContext } from "@angular/core";
import { patchState, signalStoreFeature, withHooks, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { EmptyFeatureResult, InnerSignalStore, MergeFeatureResults, SignalStoreFeature, SignalStoreFeatureResult, SignalStoreSlices } from "@ngrx/signals/src/signal-store-models";
import { Prettify } from "@ngrx/signals/src/ts-helpers";
import { Observable, switchMap, tap } from "rxjs";
import { LoadStateFeatureResult, withLoadState } from "./with-load-state.feature";
import { RxMethod } from "./_types";




export type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;

export type InputStore<Input extends SignalStoreFeatureResult> = Prettify<
  SignalStoreSlices<Input['state']> &
    Input['signals'] &
    Input['methods']>;

type LoadMethod<Input extends SignalStoreFeatureResult, T> = (store: InputStore<Input>) => Observable<T>;

type InnerStore<Input extends SignalStoreFeatureResult> =  InnerSignalStore<Input["state"], Input["signals"], Input["methods"]>;

type LoadMethodFeatureResult = MergeFeatureResults<[LoadStateFeatureResult, {state: {}, signals: {}, methods: {load: RxMethod<void>}}]>;

export function withLoadMethod<Input extends SignalStoreFeatureResult, T>(loadMethod: LoadMethod<Input, T>, loadOnInit: boolean)
: SignalStoreFeature<Input, LoadMethodFeatureResult> {
    return (store) => {
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

        const res = feature(store);
        
        return res as unknown as InnerSignalStore<LoadMethodFeatureResult["state"], LoadMethodFeatureResult["signals"], LoadMethodFeatureResult["methods"]>;
    }

}