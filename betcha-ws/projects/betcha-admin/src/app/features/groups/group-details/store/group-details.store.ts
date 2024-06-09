import { signalStore, withMethods, withState } from "@ngrx/signals";
import { initialGroupDetailsSlice } from "./group-details.slice";
import { ApiService, withDevtools, withLoadReload } from "@lib";
import { inject } from "@angular/core";
import { map, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { DbModel } from "@tscommon";

export const GroupDetailsStore = signalStore(
    withState(initialGroupDetailsSlice),
    withLoadReload((_, id: string, api = inject(ApiService)) => api.getGroupForAdmin(id)), 
    withDevtools('group details'), 
    withMethods((store, api = inject(ApiService)) => ({
        setDisplayName: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.setGroupDisplayName({groupId: store.groupId(), displayName: val}).pipe(
                tap(_ => store.reload())
            ))
        )), 
        setUsersLimit: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            map(val => parseInt(val)), 
            switchMap(val => api.setGroupUsersLimit({groupId: store.groupId(), limit : val}).pipe(
                tap(_ => store.reload())
            ))
        )),
        setBlocked: rxMethod<boolean>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.setGroupBlocked({groupId: store.groupId(), blocked: val}).pipe(
                tap(_ => store.reload())
            ))
        )),
        setSlogan: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.customizeGroup({groupId: store.groupId(), slogan: val}).pipe(
                tap(_ => store.reload())
            ))
        )), 
        setMessage: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.customizeGroup({groupId: store.groupId(), message: val}).pipe(
                tap(_ => store.reload())
            ))
        )),
        setTheme: rxMethod<DbModel.ColorTheme>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.customizeGroup({groupId: store.groupId(), theme: val}).pipe(
                tap(_ => store.reload())
            ))
        )),
        uploadLogo: rxMethod<File>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.uploadGroupLogoImage(store.groupId(), val).pipe(
                tap(_ => store.reload())
            ))
        ))
    }))
)