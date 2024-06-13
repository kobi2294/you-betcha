import { FutureMatchVm } from "./game.vm";

export interface ComingUp {
    readonly matches: FutureMatchVm[];
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
}

export function comingUp(matches: FutureMatchVm[], now: number): ComingUp | null {
    if (matches.length === 0) return null;

    const effectiveDate = matches[0].dateValue;

    const total = effectiveDate - now;
    const minutes = Math.max(0, Math.ceil( (total/1000/60) % 60 ));
    const hours = Math.max(0, Math.floor( (total/(1000*60*60)) % 24 ));
    const days = Math.max(0, Math.floor( total/(1000*60*60*24) ));

    return {
        matches,
        days,
        hours,
        minutes
    }
}