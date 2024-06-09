import { DbModel } from "@tscommon";

export interface MetadataSlice {
    matches: DbModel.Match[];
    stages: DbModel.Stage[];
    countries: string[];
    isEditing: boolean;
}

export const initialMetadataSlice: MetadataSlice = {
    matches: [],
    stages: [],
    countries: [], 
    isEditing: false
}

