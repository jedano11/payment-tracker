import firebase from 'react-native-firebase';

export default class Reference {
  refs: Object = {};

  addReference = (
    referencedDoc: string,
    referenceId: string,
    refAlias: string,
  ) => {
    const ref = this.createReference(referencedDoc, referenceId);

    this.refs[refAlias] = ref;

    return this;
  };

  createReference = (referencedDoc: string, referenceId: string) => {
    const ref = `${referencedDoc}/${referenceId}`;

    return firebase.firestore().doc(ref);
  };
}
