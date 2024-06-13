import { Injectable, inject } from "@angular/core";
import { CollectionReference, Firestore, collection, collectionData, doc, docData, query, where } from "@angular/fire/firestore";
import { DbModel, toRecord } from "@tscommon";
import { Observable, combineLatest, debounceTime, delay, forkJoin, map, of, retry, tap } from "rxjs";

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
        const res$ = docData(docReference) as Observable<DbModel.Group>;
        return res$.pipe(
            retry({
                count: 3, 
                delay: 3000, 
                resetOnSuccess: true
            })
        )
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

    getGroupBySecret(secret: string): Observable<DbModel.Group> {
        const queryReference = query(collection(this.firestore, 'groups'), where('secret', '==', secret));
        const res = collectionData(queryReference) as Observable<DbModel.Group[]>;
        return res.pipe(
            retry({
                count: 3, 
                delay: 3000, 
                resetOnSuccess: true
            }),
            map(groups => groups[0] ?? null)
        )
    }

    getCalculatedGroupBySecret(secret: string): Observable<DbModel.CalculatedGroup> {
        const queryReference = query(collection(this.firestore, 'calculated-groups'), where('secret', '==', secret));
        const res = collectionData(queryReference) as Observable<DbModel.CalculatedGroup[]>;
        return res.pipe(
            retry({
                count: 3, 
                delay: 3000, 
                resetOnSuccess: true
            }),
            map(groups => groups[0] ?? null)
        )
    }

    getCalculatedGroupMatchScoresBySecret(secret: string): Observable<DbModel.CalculatedGroupMatchScore[]> {
        const queryReference = query(collection(this.firestore, 'calculated-group-match-scores'), where('secret', '==', secret));   
        const res = collectionData(queryReference) as Observable<DbModel.CalculatedGroupMatchScore[]>;
        return res.pipe(
            retry({
                count: 3, 
                delay: 3000, 
                resetOnSuccess: true
            })
        )
    }


    getGroupCalculatedDateBySecret(secret: string): Observable<ExtendedCalculatedDataResult> {
        return combineLatest({
            group: this.getGroupBySecret(secret),
            calculatedGroup: this.getCalculatedGroupBySecret(secret),
            calculatedGroupMatchScores: this.getCalculatedGroupMatchScoresBySecret(secret)
        })
    }
}

type CalculatedDataResult = {
    calculatedGroup: DbModel.CalculatedGroup | null;
    calculatedGroupMatchScores: DbModel.CalculatedGroupMatchScore[];  
}

type ExtendedCalculatedDataResult = CalculatedDataResult & { readonly group: DbModel.Group | null; }
