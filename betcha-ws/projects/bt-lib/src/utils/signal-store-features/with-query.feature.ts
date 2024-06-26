import { DestroyRef, Injector, inject, runInInjectionContext } from "@angular/core";
import { patchState, signalStoreFeature, withHooks } from "@ngrx/signals";
import { MergeFeatureResults, SignalStoreFeature, SignalStoreFeatureResult } from "@ngrx/signals/src/signal-store-models";
import { Observable } from "rxjs";
import { LoadStateFeatureResult, withLoadState } from "./with-load-state.feature";
import { InputStore } from "./_types";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

type QueryMethod<Input extends SignalStoreFeatureResult, T> = (store: InputStore<Input>) => Observable<T>;

type QueryMethodFeatureResult = MergeFeatureResults<[LoadStateFeatureResult, {state: {}, signals: {}, methods: {}}]>;

export function withQuery<Input extends SignalStoreFeatureResult, T>(queryMethod: QueryMethod<Input, T>)
: SignalStoreFeature<Input, QueryMethodFeatureResult> {
    const res: SignalStoreFeature<Input, QueryMethodFeatureResult> = store => {
        const injector = inject(Injector);
        const storeContent = {
            ...store.slices, 
            ...store.signals, 
            ...store.methods
        };

        const loader = () => runInInjectionContext(injector, () => queryMethod(storeContent));
        const feature = signalStoreFeature(
            withLoadState(),
            withHooks({
                onInit: (store, destroyRef = inject(DestroyRef)) => {
                    loader().pipe(
                        takeUntilDestroyed(destroyRef), 
                    ).subscribe((data: any) => {
                        patchState(store, {...data});
                    })
                }
            })
        );

        return feature(store);
    }
    return res;
}