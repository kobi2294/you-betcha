import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialMetadataSlice } from './metadata.slice';
import {
  ApiService,
  NotificationsService,
  QueryService,
  withDevtools,
  withLoad,
  withLoadState,
} from '@lib';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom, tap } from 'rxjs';
import { validatePartialMetadata } from './metadata.validator';

export const MetadataStore = signalStore(
  withState(initialMetadataSlice),
  withLoadState(),
  withMethods(
    (
      store,
      api = inject(ApiService),
      notify = inject(NotificationsService)
    ) => ({
      startEdit: () => patchState(store, { isEditing: true }),
      save: async (str: string) => {
        store.setLoading();
        
        try {
          const obj = JSON.parse(str) as any;
          if (validatePartialMetadata(obj)) {
            await firstValueFrom(api.updateMetadata(obj));
            notify.success('Metadata updated');
            patchState(store, { isEditing: false, loadState: 'idle' });
          } else {
            notify.error('Invalid metadata');
          }
        } catch {
          notify.error('Failed to update metadata');
          patchState(store, { loadState: 'idle' });
        }
      },
      cancel: () => patchState(store, { isEditing: false }),
    })
  ),
  withHooks((store, query = inject(QueryService)) => ({
    onInit: () => {
      query
        .getMetadata()
        .pipe(
          takeUntilDestroyed(),
          tap((v) => console.log('metadata', v))
        )
        .subscribe((m) =>
          patchState(store, {
            countries: m.countries,
            matches: m.matches,
            stages: m.stages,
          })
        );
    },
  })), 
  withDevtools('metadata'),

);
