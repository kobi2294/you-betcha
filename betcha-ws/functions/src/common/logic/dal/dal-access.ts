import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import {
  CollectionType,
  DalAccess,
  DalCollection,
  DalFileContentType,
  DalQuery,
  DalUpdater,
} from './dal-types';
import { dalBatch } from './dal-batch';
import { PassThrough } from 'stream';

export function dalAccess(firestore = getFirestore()): DalAccess {
  async function _getCollection<T extends DalCollection>(
    collection: T,
    ...queries: DalQuery<T>[]
  ): Promise<CollectionType<T>[]> {
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      firestore.collection(collection);
    for (const q of queries) {
      query = query.where(q[0], q[1], q[2]);
    }

    const res = await query.get();

    return res.docs.map((doc) => doc.data() as CollectionType<T>);
  }

  async function _getDoc<T extends DalCollection>(
    collection: T,
    id: string
  ): Promise<CollectionType<T> | undefined> {
    const query = await firestore.collection(collection).doc(id).get();
    return query.data() as CollectionType<T> | undefined;
  }

  async function _setDoc<T extends DalCollection>(
    collection: T,
    entity: CollectionType<T>
  ) {
    await firestore.collection(collection).doc(entity.id).set(entity);
  }

  async function _delDoc<T extends DalCollection>(collection: T, id: string) {
    await firestore.collection(collection).doc(id).delete();
  }

  async function _updateDoc<T extends DalCollection>(
    collection: T,
    id: string,
    updater: DalUpdater<T>
  ) {
    const entity = await _getDoc(collection, id);
    if (!entity) return;

    const updated = {
      ...entity,
      ...updater(entity),
    };
    await _setDoc(collection, updated);
  }

  async function _clearAllData(
    subCollections?:
      | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>[]
      | undefined
  ) {
    const collections = subCollections ?? (await firestore.listCollections());
    for (const coll of collections) {
      // Get a new write batch
      const batch = firestore.batch();
      const documents = await coll.listDocuments();

      for (const doc of documents) {
        await _clearAllData(await doc.listCollections());
        batch.delete(doc);
      }
      await batch.commit();
    }
    return;
  }

  async function _deleteCollection(collection: DalCollection) {
    const coll = firestore.collection(collection);
    await _clearAllData([coll]);
  }

  function _uploadFile(
    path: string,
    content: string,
    contentType: DalFileContentType
  ): Promise<string> {
    const bucket = getStorage().bucket();

    return new Promise((resolve, reject) => {
      const blob = bucket.file(path);
      const bufferStream = new PassThrough();

      bufferStream.pipe(
        blob.createWriteStream({
          metadata: { contentType },
        })
      );

      bufferStream.on('error', (err) => {
        reject(err);
      });

      bufferStream.on('finish', () => {
        resolve(path);
      });

      bufferStream.end(Buffer.from(content, 'base64'));

    });
  }

  async function _deleteFile(path: string): Promise<void> {
      await getStorage().bucket().file(path).delete({ignoreNotFound: true});
  }

  return {
    collection: <T extends DalCollection>(collection: T) => ({
      deleteAll: () => _deleteCollection(collection),
      getAll: (...queries: DalQuery<T>[]) =>
        _getCollection(collection, ...queries),
      doc: (id: string) => ({
        get: () => _getDoc(collection, id),
        update: (updater: DalUpdater<T>) => _updateDoc(collection, id, updater),
        delete: () => _delDoc(collection, id),
      }),
      setDoc: (entity: CollectionType<T>) => _setDoc(collection, entity),
    }),
    batch: () => dalBatch(firestore),
    clearAllData: () => _clearAllData(),
    file: {
      upload: _uploadFile,
      delete: _deleteFile
    },
  };
}
