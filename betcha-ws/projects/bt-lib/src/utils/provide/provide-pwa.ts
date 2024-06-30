import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";

export function providePwa(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {provide: APP_INITIALIZER, multi: true, useFactory: () => () => {
            try {
                const nextReloadTime = Date.now() + 1000 * 60 * 60 * 3; // 3 hours at least
                window.addEventListener('visibilitychange', () => {
                    if ((document.visibilityState === 'visible') && (Date.now() > nextReloadTime)) {
                        location.reload();
                    }
                });    
            }catch {}
        }}  
    ])
}