import { DbModel } from "@tscommon";

export interface GameSlice {
    readonly calculatedGroup: DbModel.CalculatedGroup | null;
    readonly calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[];
}

export const initialGameSlice: GameSlice = {
    calculatedGroup: null,
    calculatedGroupMatchScores: [],
};