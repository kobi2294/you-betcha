import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, doc, docData, query, where } from "@angular/fire/firestore";
import { DbModel, toRecord } from "@tscommon";
import { Observable, combineLatest, debounceTime, forkJoin, map, of, tap } from "rxjs";

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

    getCalculatedGroups(groupIds: string[]): Observable<DbModel.CalculatedGroup[]> {
        const queries = groupIds
            .map(groupId => doc(this.firestore, `calculated-groups/${groupId}`))
            .map(q => docData(q) as Observable<DbModel.CalculatedGroup>);
        const res = combineLatest(queries).pipe(debounceTime(0));

        return res;
    }

    getGroupsData(groupIds: string[]) {

        return combineLatest({
            groups: this.getGroups(groupIds),
            calculatedGroups: this.getCalculatedGroups(groupIds),
        }).pipe(
            map(({groups, calculatedGroups}) => ({
                groups: toRecord(groups, g => g.id),
                calculatedGroups: toRecord(calculatedGroups, g => g.id),
            }))
        );
    }
}