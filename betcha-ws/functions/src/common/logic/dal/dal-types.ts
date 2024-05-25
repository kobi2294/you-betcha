import { WhereFilterOp } from "firebase-admin/firestore";
import { DbModel } from "../../models/db/db.alias";

export const DAL_COLLECTIONS = ['audits', 'groups', 'metadata', 'users', 'calculated-groups', 'calculated-matches'] as const;
export type DalCollection = typeof DAL_COLLECTIONS[number];
export type CollectionType<T extends DalCollection> =
    T extends 'audits' ? DbModel.UserAudit
    : T extends 'groups' ? DbModel.Group
    : T extends 'metadata' ? DbModel.Metadata
    : T extends 'users' ? DbModel.User
    : T extends 'calculated-groups' ? DbModel.CalculatedGroup 
    : T extends 'calculated-matches' ? DbModel.CalculatedMatch
    : unknown;

export type DalUpdater<T extends DalCollection> = (state: CollectionType<T>) => Partial<CollectionType<T>>;

export type DalQuery<T extends DalCollection> = [keyof CollectionType<T> & string, WhereFilterOp, any];

export type DalDocAccess<T extends DalCollection> = {
    readonly get: () => Promise<CollectionType<T> | undefined>,
    readonly update: (updater: DalUpdater<T>) => Promise<void>,
    readonly delete: () => Promise<void>,
}

export type DalCollectionAccess<T extends DalCollection> = {
    readonly deleteAll: () => Promise<void>,
    readonly getAll: (...queries: DalQuery<T>[]) => Promise<CollectionType<T>[]>,
    readonly doc: (id: string) => DalDocAccess<T>,
    readonly setDoc: (entity: CollectionType<T>) => Promise<void>
}

export type DalBatchSetAction<T extends DalCollection> = {
    readonly type: 'set',
    readonly collection: T,
    readonly entity: CollectionType<T>
}

export type DalBatchDeleteAction<T extends DalCollection> = {
    readonly type: 'delete',
    readonly collection: T,
    readonly id: string
}

export type DalBatchAction<T extends DalCollection> = DalBatchSetAction<T> | DalBatchDeleteAction<T>;

export type DalBatchActionBase = DalBatchAction<DalCollection>;
  
export type DalBatchAccess = {
    readonly set: <T extends DalCollection>(collection: T, entity: CollectionType<T>) => void,
    readonly setMany: <T extends DalCollection>(collection: T, entities: CollectionType<T>[]) => void,
    readonly delete: <T extends DalCollection>(collection: T, id: string) => void,
    readonly deleteMany: <T extends DalCollection>(collection: T, ids: string[]) => void,
    readonly commit: () => Promise<void>,
}

export type DalAccess = {
    collection: <T extends DalCollection>(collection: T) => DalCollectionAccess<T>,
    batch: () => DalBatchAccess,
    clearAllData: () => Promise<void>,
    file: {
        upload: (path: string, content: string, contentType: DalFileContentType) => Promise<string>,
        delete: (path: string) => Promise<void>,
    }
}

export type DalFileContentType = 'image/png' | 'image/jpg';
