import {
  CollectionType,
  DalCollection,
  DalQuery,
  DalUpdater,
} from './dal-types';
import { dalAccess } from './dal-access';
import { on } from '../../utils/functional';
import { DbModel } from '../../models/db/db.alias';

export function getDal() {
  const access = dalAccess();

  function _collectionMethods<T extends DalCollection>(collection: T) {
    return on(access.collection(collection), (x) => ({
      deleteAll: () => x.deleteAll(),
      getAll: (...queries: DalQuery<T>[]) => x.getAll(...queries),
      saveOne: (entity: CollectionType<T>) => x.setDoc(entity),
      getOne: (id: string) => x.doc(id).get(),
      updateOne: (id: string, updater: DalUpdater<T>) =>
        x.doc(id).update(updater),
      deleteOne: (id: string) => x.doc(id).delete(),
    }));
  }

  async function _getGroupBySecret(secret: string): Promise<DbModel.Group | undefined> {
    const groups =  await access.collection('groups').getAll(['secret', '==', secret]);
    return groups[0];
  }

  return {
    batch: access.batch,
    audits: _collectionMethods('audits'),
    groups: { 
      ..._collectionMethods('groups'),
      getBySecret: _getGroupBySecret
    },
    metadata: on(access.collection('metadata'), (x) => ({
      get: () => x.doc('metadata').get(),
      update: (updater: DalUpdater<'metadata'>) =>
        x.doc('metadata').update(updater),
      set: (data: Partial<DbModel.Metadata>) =>
        x.doc('metadata').update((_) => data),
    })),
    users: _collectionMethods('users'),
    calculatedGroups: _collectionMethods('calculated-groups'),
    calculatedMatches: _collectionMethods('calculated-matches'),
    clearAllData: access.clearAllData,
    file: access.file,
  };
}