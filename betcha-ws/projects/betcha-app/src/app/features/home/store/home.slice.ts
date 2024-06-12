import { FutureMatchVm } from "../../../stores/game/game.vm";

export interface HomeSlice {
    readonly now: number;
}

export const initialHomeSlice: HomeSlice = {
    now: Date.now()
}

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
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
        matches,
        days,
        hours,
        minutes
    }
}