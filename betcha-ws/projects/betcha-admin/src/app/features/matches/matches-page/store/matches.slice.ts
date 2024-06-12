import { DbModel } from "@tscommon";

export interface MatchesSlice {
    matches: DbModel.Match[];
    editedMatches: DbModel.Match[];
    stages: DbModel.Stage[];
    countries: string[];
    dirty: boolean;
}

export const initialMatchesSlice: MatchesSlice = {
    matches: [],
    editedMatches: [],
    stages: [],
    countries: [],
    dirty: false
};