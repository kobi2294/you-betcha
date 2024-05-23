import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import packageJson from '../../package.json';


export const APP_VERSION = new InjectionToken<string>('APP_VERSION');

export function provideVersion(): EnvironmentProviders {
    return makeEnvironmentProviders([
        {provide: APP_VERSION, useValue: packageJson.version}
    ])
}