import { signalStore, withMethods, withState } from "@ngrx/signals";
import { initialGroupDetailsSlice } from "./group-details.slice";
import { ApiService, rxNotifier, withDevtools, withLoadReload } from "@lib";
import { inject } from "@angular/core";
import { map, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { DbModel } from "@tscommon";

export const GroupDetailsStore = signalStore(
    withState(initialGroupDetailsSlice),
    withLoadReload((_, id: string, api = inject(ApiService)) => api.getGroupForAdmin(id)), 
    withDevtools('Admin - Group Detials'), 
    withMethods((store, api = inject(ApiService), rxNotify = rxNotifier(() => store.setIdle())) => ({
        setDisplayName: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.setGroupDisplayName({groupId: store.groupId(), displayName: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Group display name updated')
            ))
        )), 
        setUsersLimit: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            map(val => parseInt(val)), 
            switchMap(val => api.setGroupUsersLimit({groupId: store.groupId(), limit : val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('User Limit updated')
            ))
        )),
        setBlocked: rxMethod<boolean>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.setGroupBlocked({groupId: store.groupId(), blocked: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Registration status updated')
            ))
        )),
        setSlogan: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.customizeGroup({groupId: store.groupId(), slogan: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Group Slogan updated')

            ))
        )), 
        setMessage: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.customizeGroup({groupId: store.groupId(), message: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Group Message updated')

            ))
        )),
        setTheme: rxMethod<DbModel.ColorTheme>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.customizeGroup({groupId: store.groupId(), theme: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Group Theme updated')

            ))
        )),
        uploadLogo: rxMethod<File>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.uploadGroupLogoImage(store.groupId(), val).pipe(
                tap(_ => store.reload()), 
                rxNotify('Group Logo updated')
            ))
        )), 
        addAdmin: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.addAdminToGroup({groupId: store.groupId(), email: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Admin added')
            ))
        )),
        removeAdmin: rxMethod<string>(trigger$ => trigger$.pipe(
            tap(_ => store.setLoading()), 
            switchMap(val => api.removeAdminFromGroup({groupId: store.groupId(), email: val}).pipe(
                tap(_ => store.reload()), 
                rxNotify('Admin removed')
            ))
        ))
    }))
)