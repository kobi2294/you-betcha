import { Injectable, inject } from "@angular/core";
import { Functions, httpsCallableData } from "@angular/fire/functions";
import { DbModel } from "@tscommon";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiService {
    readonly functions = inject(Functions);

    private getUserDetailsCallable = httpsCallableData<void, DbModel.User>(this.functions, 'getUserDetails');

    

    getUserDetails(): Observable<DbModel.User> {
        return this.getUserDetailsCallable();
    }

}