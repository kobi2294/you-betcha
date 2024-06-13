export interface HomeSlice {
    readonly now: number;
}

export const initialHomeSlice: HomeSlice = {
    now: Date.now()
}
