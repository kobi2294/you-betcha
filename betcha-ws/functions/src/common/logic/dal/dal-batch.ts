import { bufferCount } from "../../utils/arrays";
import { CollectionType, DalBatchAccess, DalBatchActionBase, DalCollection } from "./dal-types";
import { getFirestore } from "firebase-admin/firestore";


export function dalBatch(firestore = getFirestore()): DalBatchAccess {
    const actions: DalBatchActionBase[] = [];
    let isCommited = false;

    function _set<T extends DalCollection>(collection: T, entity: CollectionType<T>) {
      if (isCommited) return;
      actions.push({type: 'set', collection, entity});
    }

    function _setMany<T extends DalCollection>(collection: T, entities: CollectionType<T>[]) {
      if (isCommited) return;
      entities.forEach((entity) => _set(collection, entity));
    }

    function _delete<T extends DalCollection>(collection: T, id: string) {
      if (isCommited) return;
      actions.push({type: 'delete', collection, id});
    }

    function _deleteMany<T extends DalCollection>(collection: T, ids: string[]) {
      if (isCommited) return;
      ids.forEach((id) => _delete(collection, id));
    }

    async function _commit() {
      if (isCommited) return;
      isCommited = true;
      const buffers = bufferCount(actions, 250);

      const promises = buffers.map(async (buffer) => {
        const b = firestore.batch();

        buffer.forEach((action) => {
          if (action.type === 'set') {
            const ref = firestore.collection(action.collection).doc(action.entity.id);
            b.set(ref, action.entity);  
          } else if (action.type === 'delete') {
            const ref = firestore.collection(action.collection).doc(action.id);
            b.delete(ref);
          }
        });

        await b.commit();        
      });

      await Promise.all(promises);

    }

    return {
      set: _set,
      setMany: _setMany,
      delete: _delete,
      deleteMany: _deleteMany,
      commit: _commit
    };
  }
