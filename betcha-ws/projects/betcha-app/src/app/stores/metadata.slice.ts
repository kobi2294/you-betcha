import { DbModel } from "@tscommon";

export interface MetadataSlice {
    matches: DbModel.Match[];
    countries: string[];
    stages: DbModel.Stage[];
    next: ComingUp | null;

}

export interface ComingUp {
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly home: string;
    readonly away: string;
    readonly stage: string;
    readonly points: number;
    readonly date: number; 
}


export const initialMetadataSlice: MetadataSlice = {
    matches: [], 
    countries: [],
    stages: [], 
    next: null
};