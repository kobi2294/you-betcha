import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, doc, docData, query, where } from "@angular/fire/firestore";
import { DbModel } from "@tscommon";
import { Observable, combineLatest, debounceTime, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class QueryService {
    readonly firestore = inject(Firestore);

    getMetadata(): Observable<DbModel.Metadata> {
        const docReference = doc(this.firestore, 'metadata/metadata');
        const res = docData(docReference) as Observable<DbModel.Metadata | undefined>;
        return res.pipe(
            map(md => md || {id: 'metadata', countries: [], matches: [], stages: []})
        )
    }

    getUser(id: string): Observable<DbModel.User> {
        const docReference = doc(this.firestore, `users/${id}`);
        return docData(docReference) as Observable<DbModel.User>;
    }

    getGroups(groupIds: string[]): Observable<DbModel.Group[]> {
        const queries = groupIds
            .map(groupId => doc(this.firestore, `groups/${groupId}`))
            .map(q => docData(q) as Observable<DbModel.Group>);
        const res = combineLatest(queries).pipe(debounceTime(0));

        return res;
    }
}