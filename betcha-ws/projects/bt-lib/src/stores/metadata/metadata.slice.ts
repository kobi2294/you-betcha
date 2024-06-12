import { DbModel } from "@tscommon";

export interface MetadataSlice {
    matches: DbModel.Match[];
    countries: string[];
    stages: DbModel.Stage[];
    statistics: Record<string, DbModel.MatchStatistics>;
}

export const initialMetadataSlice: MetadataSlice = {
    matches: [], 
    countries: [],
    stages: [], 
    statistics: {}
};