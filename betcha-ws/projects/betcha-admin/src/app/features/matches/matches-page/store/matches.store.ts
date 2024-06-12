import { signalStore, withState } from "@ngrx/signals";
import { initialMatchesSlice } from "./matches.slice";
import { QueryService, withDevtools, withQuery } from "@lib";
import { inject } from "@angular/core";

export const MatchesStore = signalStore(
    withState(initialMatchesSlice), 
    withQuery((_, query = inject(QueryService)) => query.getMetadata()),
    withDevtools('Admin Matches')
)
