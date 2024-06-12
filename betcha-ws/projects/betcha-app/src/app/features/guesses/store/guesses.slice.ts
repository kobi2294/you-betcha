import { DbModel } from "@tscommon";
import { FutureMatchVm } from "../../../stores/game/game.vm";

export interface MatchGuess {
    readonly id: string;
    readonly date: string;
    readonly home: string;
    readonly away: string;
    readonly stageName: string;
    readonly points: number;
    readonly guess: DbModel.GuessValue | null;
}

export function matchGuess(guesses: Record<string, DbModel.GuessValue>, futureMatch: FutureMatchVm): MatchGuess {
    return {
        id: futureMatch.id,
        date: futureMatch.date,
        home: futureMatch.home,
        away: futureMatch.away,
        stageName: futureMatch.stageName,
        points: futureMatch.points,
        guess: guesses[futureMatch.id] || null
    };
}