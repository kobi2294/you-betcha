import { DbModel, toRecord } from "@tscommon";
import { ComingUp, Guess } from "./metadata.slice";

export function nextGuesses(matches: DbModel.Match[], stages: DbModel.Stage[], guesses: Record<string, DbModel.GuessValue>): Guess[] {
    const now = Date.now();
    const futureMatches = matches
        .filter((m) => Date.parse(m.date) > now)
        .filter(m => !!m.home && !!m.away);
    const statesMap = toRecord(stages, (s) => s.id);
    return futureMatches.map((m) => {
        return {
            matchId: m.id,
            guess: guesses[m.id] || null,
            matchDate: Date.parse(m.date),
            home: m.home!,
            away: m.away!,
            stage: statesMap[m.stage].displayName!, 
        };
    });

}


export function nextMatch(matches: DbModel.Match[], stages: DbModel.Stage[]): ComingUp | null {
    // by date, find the closest match to now
    const now = Date.now();
    const entires = matches
        .map((m) => ({match: m, diff: Date.parse(m.date) - now}))
        .sort((a, b) => Math.abs(a.diff) - Math.abs(b.diff))
        .filter((m) => m.diff > 0)

    if (entires.length === 0) {
        return null;
    }

    const match = entires[0].match;
    const stage = stages.find((s) => s.id === match.stage);
    const total = entires[0].diff;

    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
        home: match.home!,
        away: match.away!,
        stage: stage!.displayName!,
        points: stage!.points, 
        date: Date.parse(match.date),
        days, hours, minutes
    };
    
}