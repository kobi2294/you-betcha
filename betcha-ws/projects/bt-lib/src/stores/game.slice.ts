import { DbModel } from "@tscommon";

export interface GameSlice {
    readonly stages: DbModel.Stage[];
    readonly matches: DbModel.Match[];
    readonly statistics: Record<string, DbModel.MatchStatistics>;
    readonly group: DbModel.Group;
    readonly calculatedGroup: DbModel.CalculatedGroup;
    readonly calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[];
    readonly now: number;
}

export interface MatchVm {
    readonly id: string;
    readonly home: string;
    readonly away: string;
    readonly date: string;
    readonly stageName: string;
    readonly statistics: DbModel.MatchStatistics;

}