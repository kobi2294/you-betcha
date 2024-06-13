import { DbModel } from "@tscommon";

export interface DashboardSlice {
    readonly group: DbModel.Group | null;
    readonly calculatedGroup: DbModel.CalculatedGroup | null;
    readonly calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[];
    readonly matches: DbModel.Match[];
    readonly statistics: Record<string, DbModel.MatchStatistics>;
    readonly stages: DbModel.Stage[];
    readonly now: number;
    
}

export const initialDashboardSlice: DashboardSlice = {
    group: null,
    calculatedGroup: null,
    calculatedGroupMatchScores: [],
    matches: [],
    statistics: {},
    stages: [], 
    now: Date.now()
};