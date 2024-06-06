import { getState, signalStoreFeature, withHooks } from "@ngrx/signals";
import { EmptyFeatureResult, SignalStoreFeature, SignalStoreFeatureResult } from '@ngrx/signals/src/signal-store-models';
import { reduxDevtoolsDestroy, reduxDevtoolsInit, reduxDevtoolsSend } from './devtools.helpers';
import { effect } from "@angular/core";


export function withDevtools<Input extends SignalStoreFeatureResult>(instanceName: string): 
    SignalStoreFeature<Input, EmptyFeatureResult> {
    return store => {
        const session = reduxDevtoolsInit(instanceName, store);

        const feature = signalStoreFeature(
            withHooks({
                onInit(store) {
                    effect(() => {
                        const state = getState(store);
                        reduxDevtoolsSend(session, 'action', store);
                    
                    })
                },
                onDestroy() {
                    reduxDevtoolsDestroy(session);
                }
            })
        );

        return feature(store);    
    }
}
