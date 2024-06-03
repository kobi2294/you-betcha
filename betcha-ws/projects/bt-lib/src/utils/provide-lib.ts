import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideAnimations } from '@angular/platform-browser/animations';

export function provideLib(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideAnimations(),
    ])
}