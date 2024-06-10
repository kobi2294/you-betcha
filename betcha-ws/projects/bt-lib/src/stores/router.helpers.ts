import { ActivatedRouteSnapshot } from "@angular/router";

export function collectRouterData(route: ActivatedRouteSnapshot | null): Record<string, any> {
    let res: Record<string, any> = {};

    while (route !== null) {
        res = { ...res, ...route.data };
        route = route.firstChild;
    }

    return res;
}