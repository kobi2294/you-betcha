import { DbModel } from "@tscommon";
import { Slide } from "../models/slide.model";

export interface DashboardSlice {
    readonly group: DbModel.Group | null;
    readonly calculatedGroup: DbModel.CalculatedGroup | null;
    readonly calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[];
    readonly matches: DbModel.Match[];
    readonly statistics: Record<string, DbModel.MatchStatistics>;
    readonly stages: DbModel.Stage[];
    readonly slides: Slide[];
    readonly currentSlideIndex: number;
    
}

export const initialDashboardSlice: DashboardSlice = {
    group: null,
    calculatedGroup: null,
    calculatedGroupMatchScores: [],
    matches: [],
    statistics: {},
    stages: [], 
    slides: [],
    currentSlideIndex: -1
};