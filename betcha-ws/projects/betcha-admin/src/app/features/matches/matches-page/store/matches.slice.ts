import { DbModel } from "@tscommon";

export interface MatchesSlice {
    matches: DbModel.Match[];
    stages: DbModel.Stage[];
    countries: string[];
}