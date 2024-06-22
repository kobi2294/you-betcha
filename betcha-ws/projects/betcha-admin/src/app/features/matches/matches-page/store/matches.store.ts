import { signalStore, withState, withMethods, patchState } from "@ngrx/signals";
import { MatchesSlice, initialMatchesSlice } from "./matches.slice";
import { ApiService, QueryService, withDevtools, withQuery } from "@lib";
import { inject } from "@angular/core";
import { Observable, map, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { DbModel, replaceArrayItem } from "@tscommon";

export const MatchesStore = signalStore(
    withState(initialMatchesSlice), 
    withQuery((_, query = inject(QueryService)) => loadData(query)),
    withMethods((store, api = inject(ApiService)) => ({
        save: rxMethod<void>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()),
            switchMap(_ => api.updateMatches(store.editedMatches()))
        )), 
        updateMatch: (index: number, state: Partial<DbModel.Match>) => {
            const editedMatches = replaceArrayItem(store.editedMatches(), index, match => ({...match, ...state}))
            patchState(store, {editedMatches, dirty: true})
        }, 
        cancelChanges: () => patchState(store, {editedMatches: store.matches(), dirty: false})
    })),
    withDevtools('Admin Matches')
)


function loadData(query: QueryService): Observable<Partial<MatchesSlice>> {
    return query.getMetadata().pipe(
        map(res => ({...res, editedMatches: res.matches, dirty: false, loadState: 'loaded'}))
    )
}