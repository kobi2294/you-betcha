import { getState, signalStoreFeature, withHooks } from "@ngrx/signals";
import { EmptyFeatureResult, SignalStoreFeature, SignalStoreFeatureResult } from '@ngrx/signals/src/signal-store-models';
import { reduxDevtoolsDestroy, reduxDevtoolsInit, reduxDevtoolsSendObject, reduxDevtoolsSendStore } from './devtools.helpers';
import { effect } from "@angular/core";
import { getSignalValues } from "./get-signal-values";


export function withDevtools<Input extends SignalStoreFeatureResult>(instanceName: string): 
    SignalStoreFeature<Input, EmptyFeatureResult> {
    const res: SignalStoreFeature<Input, EmptyFeatureResult> = store => {
        const session = reduxDevtoolsInit(instanceName, store);

        const feature = signalStoreFeature(
            withHooks({
                onInit(store) {
                    effect(() => {
                        const state = getSignalValues(store);
                        reduxDevtoolsSendObject(session, 'action', state);
                    
                    })
                },
                onDestroy() {
                    reduxDevtoolsDestroy(session);
                }
            })
        );

        const r = feature(store);    
        return r;
    }

    return res;
}
