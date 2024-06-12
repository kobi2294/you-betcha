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
            map(md => md || DbModel.defaultMetadata)
        )
    }

    getUser(id: string): Observable<DbModel.User> {
        const docReference = doc(this.firestore, `users/${id}`);
        return docData(docReference) as Observable<DbModel.User>;
    }

    getGroups(groupIds: string[]): Observable<DbModel.Group[]> {
        if (groupIds.length === 0) return of([]);

        const queries = groupIds
            .map(id => this.getGroup(id));
        const res = combineLatest(queries).pipe(debounceTime(0));

        return res;
    }

    getGroup(groupId: string): Observable<DbModel.Group> {
        const docReference = doc(this.firestore, `groups/${groupId}`);
        return docData(docReference) as Observable<DbModel.Group>;
    }

    getCalculatedGroups(groupId: string): Observable<DbModel.CalculatedGroup> {
        const docReference = doc(this.firestore, `calculated-groups/${groupId}`);
        return docData(docReference) as Observable<DbModel.CalculatedGroup>;
    }

    getCalculatedGroupMatchScores(groupId: string): Observable<DbModel.CalculatedGroupMatchScore[]> {
        const queryReference = query(collection(this.firestore, 'calculated-group-match-scores'), where('groupId', '==', groupId));
        return collectionData(queryReference) as Observable<DbModel.CalculatedGroupMatchScore[]>;
    }


    getGroupCalculatedData(groupId: string | null): Observable<CalculatedDataResult> {
        if ((groupId === null) || (groupId.trim() === '')) return of({
            calculatedGroup: null, 
            calculatedGroupMatchScores: []
        });

        return combineLatest({
            calculatedGroup: this.getCalculatedGroups(groupId),
            calculatedGroupMatchScores: this.getCalculatedGroupMatchScores(groupId)
        })
    }
}

type CalculatedDataResult = {
    calculatedGroup: DbModel.CalculatedGroup | null;
    calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[];  
}
