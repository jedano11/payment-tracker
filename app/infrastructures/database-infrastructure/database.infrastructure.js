import { fromFirebaseObj } from '../../utils/firebase.object.mapper';
import ErrorMessages from '../error.messages';

class DatabaseInfrastructure {
  prefix: string;

  timestampOffset: number;

  firebase: any;

  constructor(firebase: any) {
    this.firebase = firebase;
  }

  init = async (obj: any, path: string, id: string) => {
    this.prefix = `${path}/${id}`;
    const refContracts = this.getStore().doc(`${this.prefix}`);

    await refContracts.set({
      ...obj,
      serverTimestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
    });

    const snapshot = await refContracts.get();
    const data = snapshot.data();
    const { serverTimestamp } = data;

    this.timestampOffset =
      new Date().getTime() - new Date(serverTimestamp).getTime();

    return snapshot.exists;
  };

  create = async (obj: any, path: string) => {
    this.checkPrefix();

    const ref = this.getStore().collection(`${this.prefix}/${path}`);
    const serverTimestamp = this.getServerTimestamp();
    const next = {
      ...obj,
      createdAtMs: serverTimestamp,
      updatedAtMs: serverTimestamp,
      deleted: false,
    };

    const addRef = await ref.add(next);
    const { id } = addRef;

    return {
      id,
      ...next,
    };
  };

  read = async (path: string) => {
    this.checkPrefix();

    const ref = this.getStore()
      .collection(`${this.prefix}/${path}`)
      .where('deleted', '==', false);
    const snapshot = await ref.get();

    if (snapshot.empty) {
      return [];
    }
    const firebaseObj = snapshot.docs.map(obj => obj.data());

    return fromFirebaseObj(firebaseObj);
  };

  update = async (obj: any, path: string, id: string) => {
    this.checkPrefix();

    const ref = this.getStore().doc(`${this.prefix}/${path}/${id}`);
    const snapshot = await ref.get();

    this.verifySnapshot(snapshot);

    const prev = snapshot.data();

    this.verifyData(obj);

    const next = { ...prev, ...obj, updatedAtMs: this.getServerTimestamp() };

    await ref.set(next);

    return next;
  };

  delete = async (path: string, id: string) => {
    this.checkPrefix();

    const ref = this.getStore().doc(`${this.prefix}/${path}/${id}`);
    const snapshot = await ref.get();

    this.verifySnapshot(snapshot);

    const obj = snapshot.data();

    this.verifyData(obj);

    const next = {
      ...obj,
      deleted: true,
      updatedAtMs: this.getServerTimestamp(),
    };

    await ref.set(next);

    return true;
  };

  checkPrefix = () => {
    if (!this.prefix) {
      throw new Error(ErrorMessages.noPrefix);
    }
  };

  verifySnapshot = (snapshot: any) => {
    if (!snapshot.exists) {
      throw new Error(ErrorMessages.noReference);
    }
  };

  verifyData = (data: any) => {
    if (data.deleted) {
      throw new Error(ErrorMessages.alreadyDeleted);
    }
  };

  getStore = () => this.firebase.firestore();

  getDatabaseTimeoffset = () => this.timestampOffset;

  getDeviceTimestamp = () => new Date().getTime();

  getServerTimestamp = () => new Date().getTime() + this.timestampOffset;
}

export default DatabaseInfrastructure;
