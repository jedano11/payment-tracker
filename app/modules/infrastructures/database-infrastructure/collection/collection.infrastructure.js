import { fromFirebaseObj } from '../utils/firebase.object.mapper';
import CollectionOption from '../utils/denormalization-helpers/collection.option';
import InfrastructureVerifyer from '../utils/infrastructure.verifyer';
import CollectionDenormalizer from '../utils/denormalization-helpers/collection.denormalizer';

export const SYSTEM = 'SYSTEM';
export const SERVER_REF = 'SERVER_REF';

class CollectionInfrastructure {
  firebase: any;

  timestampOffset: number;

  collectionName: string;

  collectionOptions: Object;

  constructor(
    firebase: any,
    name: string,
    collectionOptions: CollectionOption = new CollectionOption(),
  ) {
    this.firebase = firebase;
    this.collectionName = name;
    this.collectionOptions = collectionOptions;
    this.init();
  }

  init = async () => {
    const prefix = `${SYSTEM}/${SERVER_REF}`;
    const serverRef = this.getStore().doc(prefix);

    await serverRef.set({
      serverTimestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
    });

    const snapshot = await serverRef.get();
    const data = snapshot.data();
    const { serverTimestamp } = data;

    this.timestampOffset =
      new Date().getTime() - new Date(serverTimestamp).getTime();

    return snapshot.exists;
  };

  create = async (object: Object) => {
    await this.verifyServerOffset(this.timestampOffset);

    const serverTimestamp = this.getServerTimestamp();
    const newItem = {
      ...object,
      createdAtMs: serverTimestamp,
      updatedAtMs: serverTimestamp,
      deleted: false,
    };

    const addRef = await this.createOrUpdate(newItem);
    const snapShot = await addRef.get();
    const created = await CollectionDenormalizer.getData(
      snapShot,
      this.getInfrastructureHelpers(),
      this.collectionOptions,
    );
    const { id } = snapShot;

    return {
      id,
      ...created,
    };
  };

  createOrUpdate = (newItem: Object) => {
    const createPromise: Promise<any> = new Promise(
      async (resolve: Function) => {
        if (newItem.id) {
          const { id } = newItem;
          const ref = await this.getCollection().doc(id);
          const update = await ref.set(newItem);

          resolve(update);
        } else {
          const ref = await this.getCollection();
          const create = await ref.add(newItem);

          resolve(create);
        }
      },
    );

    return createPromise;
  };

  readDoc = async (id: string) => {
    const doc = await this.getCollection().doc(id);
    const snapshot = await doc.get();

    InfrastructureVerifyer.verifySnapshot(snapshot);
    const data = await CollectionDenormalizer.getData(
      snapshot,
      this.getInfrastructureHelpers(),
      this.collectionOptions,
    );

    return {
      id,
      ...data,
    };
  };

  readCollection = async () => {
    const ref = this.getCollection().where('deleted', '==', false);
    const snapshot = await ref.get();

    if (snapshot.empty) {
      return [];
    }
    const promises = snapshot.docs.map((obj: Object) =>
      CollectionDenormalizer.getData(
        obj,
        this.getInfrastructureHelpers(),
        this.collectionOptions,
      ),
    );
    const firebaseObj = await Promise.all(promises);

    return fromFirebaseObj(firebaseObj);
  };

  update = async (id: string, updatedObject: Object) => {
    await this.verifyServerOffset(this.timestampOffset);

    const ref = this.getCollection().doc(id);
    const snapshot = await ref.get();

    InfrastructureVerifyer.verifySnapshot(snapshot);

    const prev = snapshot.data();

    InfrastructureVerifyer.verifyData(updatedObject);

    const next = {
      ...prev,
      ...updatedObject,
      updatedAtMs: this.getServerTimestamp(),
    };

    await ref.set(next);

    return next;
  };

  delete = async (id: string) => {
    const ref = this.getCollection().doc(id);
    const snapshot = await ref.get();

    InfrastructureVerifyer.verifySnapshot(snapshot);

    const obj = snapshot.data();

    InfrastructureVerifyer.verifyData(obj);

    const next = {
      ...obj,
      deleted: true,
      updatedAtMs: this.getServerTimestamp(),
    };

    await ref.set(next);

    return true;
  };

  verifyServerOffset = async (offset: number) => {
    if (typeof offset === 'undefined') {
      await this.init();
    }
  };

  getInfrastructureHelpers = () => {
    const helpers = {
      getCollection: this.getCollection,
      getStore: this.getStore,
    };

    return helpers;
  };

  getStore = () => this.firebase.firestore();

  getCollection = () => this.getStore().collection(this.collectionName);

  getDatabaseTimeoffset = () => this.timestampOffset;

  getDeviceTimestamp = () => new Date().getTime();

  getServerTimestamp = () => new Date().getTime() + this.timestampOffset;
}

export default CollectionInfrastructure;
