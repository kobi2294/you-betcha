import { Injector, Signal, inject, runInInjectionContext } from "@angular/core";
import { patchState, signalStoreFeature, withHooks, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { EmptyFeatureResult, SignalStoreFeature, SignalStoreFeatureResult, SignalStoreSlices } from "@ngrx/signals/src/signal-store-models";
import { Prettify } from "@ngrx/signals/src/ts-helpers";
import { Observable, switchMap, tap } from "rxjs";

export type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;

export type InputStore<Input extends SignalStoreFeatureResult> = Prettify<
  SignalStoreSlices<Input['state']> &
    Input['signals'] &
    Input['methods']>;

type LoadMethod<Input extends SignalStoreFeatureResult, T> = (store: InputStore<Input>) => Observable<T>;

type AddedState = { methods: { load: (inp: RxMethodInput<void>) => void } };

export function withLoadMethod<Input extends SignalStoreFeatureResult, T>(loadMethod: LoadMethod<Input, T>, loadOnInit: boolean): SignalStoreFeature<Input, EmptyFeatureResult & AddedState> {
    return store => {
        const injector = inject(Injector);
        const storeContent = {
            ...store.slices, 
            ...store.signals, 
            ...store.methods
        };

        const loader = () => runInInjectionContext(injector, () => loadMethod(storeContent));
        const feature = signalStoreFeature(
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

}