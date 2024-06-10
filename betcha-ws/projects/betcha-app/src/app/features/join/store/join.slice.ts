import { DbModel } from "@tscommon"

export interface JoinSlice {   
    joinedGroup: DbModel.Group | null | undefined
}

export const initialJoinSlice: JoinSlice = {
    joinedGroup: undefined
}