import { DbModel } from "../db/db.alias";

export interface SetUserGuessRequest {
    matchId: string;
    guess: DbModel.GuessValue;
}