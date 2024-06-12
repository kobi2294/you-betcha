import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialMetadataSlice } from './metadata.slice';
import {
  ApiService,
  NotificationsService,
  QueryService,
  withDevtools,
  withLoadState,
  withQuery,
} from '@lib';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { validatePartialMetadata } from './metadata.validator';

export const MetadataStore = signalStore(
  withState(initialMetadataSlice),
  withQuery((_, query = inject(QueryService)) => query.getMetadata()),
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
  withDevtools('metadata'),

);
