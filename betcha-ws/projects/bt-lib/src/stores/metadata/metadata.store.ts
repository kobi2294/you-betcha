import { signalStore, withState } from "@ngrx/signals";
import { initialMetadataSlice } from "./metadata.slice";
import { inject } from "@angular/core";
import { QueryService, withDevtools, withQuery } from "@lib";
import { map } from "rxjs";

export const MetadataStore = signalStore(
    {providedIn: 'root'},
    withState(initialMetadataSlice), 
    withQuery((_, query = inject(QueryService)) => (query.getMetadata().pipe(
        map(md => ({
            matches: md.matches,
            countries: md.countries,
            stages: md.stages,
            statistics: md.statistics
        }))
    ))),
    withDevtools('metadaa')    
)