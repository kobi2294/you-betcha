import { Injector, inject, runInInjectionContext } from "@angular/core";
import { patchState, signalStoreFeature, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { InnerSignalStore, MergeFeatureResults, SignalStoreFeature, SignalStoreFeatureResult } from "@ngrx/signals/src/signal-store-models";
import { Observable, tap } from "rxjs";
import { LoadStateFeatureResult, withLoadState } from "./with-load-state.feature";
import { InputStore, RxMethod } from "./_types";
import { repeatNotNull } from "../rxjs/repeat-not-null";
import { onChangeMap } from "../rxjs/on-change-map";
import { rxNotifier } from "../rxjs/catch-and-notify";

type LoadMethod<Input extends SignalStoreFeatureResult, Params, T> = (store: InputStore<Input>, prm: Params) => Observable<T>;

type LoadMethodFeatureResult<Params> = MergeFeatureResults<[LoadStateFeatureResult, {state: {}, signals: {}, methods: {load: RxMethod<Params>, reload: RxMethod<void>}}]>;

export function withLoadReload<Input extends SignalStoreFeatureResult, Params, T>(loadMethod: LoadMethod<Input, Params, T>)
: SignalStoreFeature<Input, LoadMethodFeatureResult<Params>> {
    const res: SignalStoreFeature<Input, LoadMethodFeatureResult<Params>> = store => {
        const injector = inject(Injector);
        const storeContent = {
            ...store.slices, 
            ...store.signals, 
            ...store.methods
        };
        const rxNotify = rxNotifier();
        const loader = (prm: Params) => runInInjectionContext(injector, () => loadMethod(storeContent, prm));
        
        const feature = signalStoreFeature(
            withLoadState(),
            withMethods((store) => {
                const _load = rxMethod<Params | null>(trigger$ => trigger$.pipe(
                    repeatNotNull(),
                    tap(_ => patchState(store, { loadState: 'loading' })),
                    onChangeMap(prm => loader(prm).pipe(
                        tap(data => patchState(store, { ...data, loadState: 'idle'})), 
                        rxNotify('', () => patchState(store, { loadState: 'idle'}))
                    ))
                ));
                return {
                    reload: () => _load(null),
                    load: (prm: Params) => _load(prm)
                }})
        );

        return feature(store);        
    }

    return res;
}