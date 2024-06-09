import { Injectable, inject } from "@angular/core";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { DbModel } from "@tscommon";
import { Observable, map } from "rxjs";

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
}