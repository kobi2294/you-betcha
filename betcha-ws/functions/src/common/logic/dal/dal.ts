import {
  CollectionType,
  DalCollection,
  DalQuery,
  DalUpdater,
} from './dal-types';
import { dalAccess } from './dal-access';
import { on } from '../../utils/functional';

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

  return {
    batch: access.batch,
    audits: _collectionMethods('audits'),
    groups: _collectionMethods('groups'),
    metadata: _collectionMethods('metadata'),
    users: _collectionMethods('users'),
    calculatedGroups: _collectionMethods('calculated-groups'),
    calculatedMatches: _collectionMethods('calculated-matches'),
    clearAllData: access.clearAllData,
  };
}
