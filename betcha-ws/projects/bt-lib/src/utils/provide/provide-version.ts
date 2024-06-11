import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import packageJson from '../../../package.json';

export type EnvironmentType = 'dev' | 'stage' | 'prod';

export const APP_VERSION = new InjectionToken<string>('APP_VERSION');
export const APP_ENV = new InjectionToken<EnvironmentType>('APP_ENV');

export function provideVersion(environment: {name: string}): EnvironmentProviders {
    return makeEnvironmentProviders([
        {provide: APP_VERSION, useValue: packageJson.version}, 
        {provide: APP_ENV, useValue: environment.name as EnvironmentType}
    ])
}