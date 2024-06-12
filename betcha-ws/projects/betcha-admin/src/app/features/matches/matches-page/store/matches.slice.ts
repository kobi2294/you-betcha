import { DbModel } from "@tscommon";

export interface MatchesSlice {
    matches: DbModel.Match[];
    stages: DbModel.Stage[];
    countries: string[];
}

export const initialMatchesSlice: MatchesSlice = {
    matches: [],
    stages: [],
    countries: [],
};