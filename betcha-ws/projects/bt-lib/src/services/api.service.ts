import { Injectable, inject } from "@angular/core";
import { Functions, httpsCallableData } from "@angular/fire/functions";
import { Api, DbModel } from "@tscommon";
import { Observable, delay, from, of, switchMap } from "rxjs";
import { fileToNumberArray, imageResizer } from "../utils/helpers/image.helpers";

@Injectable({providedIn: 'root'})
export class ApiService {
    readonly functions = inject(Functions);
    readonly resizer = imageResizer();

    private _getUserDetails = httpsCallableData<void, DbModel.User>(this.functions, 'getUserDetails');
    private _getManagedGroups = httpsCallableData<void, DbModel.Group[]>(this.functions, 'getUserManagedGroups');
    private _createGroup = httpsCallableData<Api.CreateGroupRequest, void>(this.functions, 'createGroup');
    private _isGroupIdFree = httpsCallableData<string, boolean>(this.functions, 'isGroupIdFree');
    private _getGroupForAdmin = httpsCallableData<string, Api.GetGroupForAdminResponse>(this.functions, 'getGroupForAdmin');
    private _setGroupDisplayName = httpsCallableData<Api.SetGroupDisplayNameRequest, void>(this.functions, 'setGroupDisplayName');
    private _setGroupUsersLimit = httpsCallableData<Api.SetGroupUsersLimitRequest, void>(this.functions, 'setGroupUsersLimit');
    private _setGroupBlocked = httpsCallableData<Api.SetGroupBlockedRequest, void>(this.functions, 'setGroupBlocked');
    private _customizeGroup = httpsCallableData<Api.CustomizeGroupRequest, void>(this.functions, 'customizeGroup');
    private _uploadGroupLogoImage = httpsCallableData<Api.UploadFileRequest, void>(this.functions, 'uploadGroupLogoImage');
    private _addAdminToGroup = httpsCallableData<Api.AddRemoveGroupAdminRequest, void>(this.functions, 'addAdminToGroup');
    private _removeAdminFromGroup = httpsCallableData<Api.AddRemoveGroupAdminRequest, void>(this.functions, 'removeAdminFromGroup');
    private _searchUsers = httpsCallableData<string, DbModel.User[]>(this.functions, 'searchUsers');
    private _setUserRole = httpsCallableData<Api.SetUserRoleRequest, void>(this.functions, 'setUserRole');
    private _updateMetadata = httpsCallableData<Partial<DbModel.Metadata>, void>(this.functions, 'updateMetadata');
    private _joinGroup = httpsCallableData<string, DbModel.Group>(this.functions, 'joinGroup');

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

    setGroupUsersLimit(req: Api.SetGroupUsersLimitRequest): Observable<void> {
        return this._setGroupUsersLimit(req);
    }

    setGroupBlocked(req: Api.SetGroupBlockedRequest): Observable<void> {
        return this._setGroupBlocked(req);
    }

    customizeGroup(req: Api.CustomizeGroupRequest): Observable<void> {
        return this._customizeGroup(req).pipe();
    }

    uploadGroupLogoImage(groupId: string, imageFile: File): Observable<void> {
        const req$ = this.resizer.resize(imageFile, 175, 175)
            .then(smallFile => fileToNumberArray(smallFile))
            .then(arr => ({id: groupId, fileType: imageFile.type as DbModel.ImageContentType, content: arr}));

        return from(req$).pipe(
            switchMap(req => this._uploadGroupLogoImage(req))
        );
    }

    addAdminToGroup(req: Api.AddRemoveGroupAdminRequest): Observable<void> {
        return this._addAdminToGroup(req);
    }

    removeAdminFromGroup(req: Api.AddRemoveGroupAdminRequest): Observable<void> {
        return this._removeAdminFromGroup(req);
    }

    searchUsers(keyword: string): Observable<DbModel.User[]> {
        if (keyword.length < 3) return of([]);        
        return this._searchUsers(keyword);
    }

    setUserRole(req: Api.SetUserRoleRequest): Observable<void> {
        return this._setUserRole(req);
    }

    updateMetadata(metadata: Partial<DbModel.Metadata>): Observable<void> {
        return this._updateMetadata(metadata);
    }

    joinGroup(secret: string): Observable<DbModel.Group> {
        return this._joinGroup(secret);
    }
 
}