import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";

export function providePwa(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {provide: APP_INITIALIZER, multi: true, useFactory: () => () => {            
            const isStandalone = ('standalone' in window.navigator) && ((window.navigator as any).standalone);
            if (isStandalone) {
                window.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'visible') {
                        location.reload();
                    }
                });    
            }
        }}  
    ])
}