import { Injectable, inject } from "@angular/core";
import { Functions, httpsCallableData } from "@angular/fire/functions";
import { DbModel } from "@tscommon";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiService {
    readonly functions = inject(Functions);

    private _getUserDetails = httpsCallableData<void, DbModel.User>(this.functions, 'getUserDetails');
    private _getManagedGroups = httpsCallableData<void, DbModel.Group[]>(this.functions, 'getUserManagedGroups');

    

    getUserDetails(): Observable<DbModel.User> {
        return this._getUserDetails();
    }

    getManagedGroups(): Observable<DbModel.Group[]> {
        return this._getManagedGroups();
    }

}