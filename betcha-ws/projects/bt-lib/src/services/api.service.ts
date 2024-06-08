import { Injectable, inject } from "@angular/core";
import { Functions, httpsCallableData } from "@angular/fire/functions";
import { Api, DbModel } from "@tscommon";
import { Observable, delay } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiService {
    readonly functions = inject(Functions);

    private _getUserDetails = httpsCallableData<void, DbModel.User>(this.functions, 'getUserDetails');
    private _getManagedGroups = httpsCallableData<void, DbModel.Group[]>(this.functions, 'getUserManagedGroups');
    private _createGroup = httpsCallableData<Api.CreateGroupRequest, void>(this.functions, 'createGroup');
    private _isGroupIdFree = httpsCallableData<string, boolean>(this.functions, 'isGroupIdFree');
    private _getGroupForAdmin = httpsCallableData<string, Api.GetGroupForAdminResponse>(this.functions, 'getGroupForAdmin');
    private _setGroupDisplayName = httpsCallableData<Api.SetGroupDisplayNameRequest, void>(this.functions, 'setGroupDisplayName');


    getUserDetails(): Observable<DbModel.User> {
        return this._getUserDetails();
    }

    getManagedGroups(): Observable<DbModel.Group[]> {
        return this._getManagedGroups();
    }

    createGroup(req: Api.CreateGroupRequest): Observable<void> {
        return this._createGroup(req);
    }

    isGroupIdFree(id: string): Observable<boolean> {
        return this._isGroupIdFree(id);
    }

    getGroupForAdmin(groupId: string): Observable<Api.GetGroupForAdminResponse> {
        return this._getGroupForAdmin(groupId);
    }

    setGroupDisplayName(req: Api.SetGroupDisplayNameRequest): Observable<void> {
        return this._setGroupDisplayName(req);
    }

}