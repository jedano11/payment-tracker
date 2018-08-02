import { fromFirebaseObj } from '../utils/firebase.object.mapper';
import CollectionOption from '../utils/denormalization-helpers/collection.option';
import InfrastructureVerifyer from '../utils/infrastructure.verifyer';
import DocumentExpander from '../utils/denormalization-helpers/document.expander';

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

    const documentSnapshot = await serverRef.get();
    const data = documentSnapshot.data();
    const { serverTimestamp } = data;

    InfrastructureVerifyer.verifyServerTimestamp(serverTimestamp);
    this.timestampOffset =
      new Date().getTime() - new Date(serverTimestamp).getTime();

    return documentSnapshot.exists;
  };

  create = async (object: Object) => {
    const serverTimestamp = this.getServerTimestamp();
    const newItem = {
      ...object,
      createdAtMs: serverTimestamp,
      updatedAtMs: serverTimestamp,
      deleted: false,
    };

    const addRef = await this.createWithOrWithoutId(newItem);
    const documentSnapshot = await addRef.get();
    const created = await DocumentExpander.getExpandedDocument(
      documentSnapshot,
      this.getFirestoreProviders(),
      this.collectionOptions,
    );
    const { id } = documentSnapshot;

    return {
      id,
      ...created,
    };
  };

  createWithOrWithoutId = (newItem: Object) => {
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
    const docRef = await this.getCollection().doc(id);
    const documentSnapshot = await docRef.get();

    InfrastructureVerifyer.verifySnapshot(documentSnapshot);
    const data = await DocumentExpander.getExpandedDocument(
      documentSnapshot,
      this.getFirestoreProviders(),
      this.collectionOptions,
    );

    return {
      id,
      ...data,
    };
  };

  readCollection = async () => {
    const collectionRef = this.getCollection().where('deleted', '==', false);
    const querySnapshot = await collectionRef.get();

    if (querySnapshot.empty) {
      return [];
    }
    const promises = querySnapshot.docs.map((obj: Object) =>
      DocumentExpander.getExpandedDocument(
        obj,
        this.getFirestoreProviders(),
        this.collectionOptions,
      ),
    );
    const firebaseObj = await Promise.all(promises);

    return fromFirebaseObj(firebaseObj);
  };

  readSubCollection = async (id: string, name: string) => {
    const subCollectionRef = await this.getCollection()
      .doc(id)
      .collection(name);
    const querySnapshot = await subCollectionRef.get();

    if (querySnapshot.empty) {
      return [];
    }
    const promises = querySnapshot.docs.map((obj: Object) =>
      DocumentExpander.getExpandedDocument(
        obj,
        this.getFirestoreProviders(),
        this.collectionOptions,
      ),
    );
    const firebaseObj = await Promise.all(promises);

    return fromFirebaseObj(firebaseObj);
  };

  update = async (id: string, updatedObject: Object) => {
    const docRef = this.getCollection().doc(id);
    const documentSnapshot = await docRef.get();

    InfrastructureVerifyer.verifySnapshot(documentSnapshot);

    const prev = documentSnapshot.data();

    InfrastructureVerifyer.verifyData(updatedObject);

    const next = {
      ...prev,
      ...updatedObject,
      updatedAtMs: this.getServerTimestamp(),
    };

    await docRef.set(next);

    return next;
  };

  delete = async (id: string) => {
    const ref = this.getCollection().doc(id);
    const documentSnapshot = await ref.get();

    InfrastructureVerifyer.verifySnapshot(documentSnapshot);

    const obj = documentSnapshot.data();

    InfrastructureVerifyer.verifyData(obj);

    const next = {
      ...obj,
      deleted: true,
      updatedAtMs: this.getServerTimestamp(),
    };

    await ref.set(next);

    return true;
  };

  getFirestoreProviders = () => {
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
