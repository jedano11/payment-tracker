import DenormalizationOption from './collection.denormalization.option';
import ReferenceResolver from './document.reference.resolver';
import { fromFirebaseObj } from '../firebase.object.mapper';
import CollectionOption from './collection.option';

class CollectionDenormalizer {
  getExpandedDocument = async (
    document: Object,
    getFirestoreProviders: Object,
    collectionOptions: CollectionOption,
  ) => {
    const data = document.data();
    const { id } = document;
    const subCollections = await this.filteredSubCollections(
      id,
      getFirestoreProviders,
      collectionOptions,
    );
    const references = await ReferenceResolver.getReferencedData(data);
    const denormalizations = await this.denormalize(
      id,
      getFirestoreProviders,
      collectionOptions,
    );

    return {
      id,
      ...data,
      ...subCollections,
      ...references,
      ...denormalizations,
    };
  };

  denormalize = (
    id: string,
    getFirestoreProviders: Object,
    collectionOptions: CollectionOption,
  ) => {
    const { denormalizationOptions } = collectionOptions;
    const { getCollection, getStore } = getFirestoreProviders;

    const denormalizationPromise: Promise<any> = new Promise(
      async (resolve: Function) => {
        if (
          typeof denormalizationOptions === 'undefined' ||
          denormalizationOptions.length === 0
        ) {
          return resolve({});
        }

        const denorms = await denormalizationOptions.map(
          async (option: DenormalizationOption) => {
            const { collectionName, referencingKey, qualifier } = option;
            const referrer = `refs.${referencingKey}`;
            const docRef = getCollection().doc(id);
            const denormalizationRef = await getStore()
              .collection(collectionName)
              .where(referrer, qualifier, docRef);
            const snapshot = await denormalizationRef.get();

            if (snapshot.empty) {
              return [];
            }

            const promises = await snapshot.docs.map((doc: Object) =>
              this.getExpandedDocument(
                doc,
                getFirestoreProviders,
                collectionOptions,
              ),
            );
            const firebaseObj = await Promise.all(promises);

            return { [collectionName]: firebaseObj } || {};
          },
        );

        return resolve(...denorms);
      },
    );

    return denormalizationPromise;
  };

  filteredSubCollections = (
    id: string,
    getFirestoreProviders: Object,
    collectionOptions: CollectionOption,
  ): Promise<any> => {
    const { subCollectionKeys } = collectionOptions;
    const subCollectionPromise = new Promise(async (resolve: Function) => {
      if (
        typeof subCollectionKeys === 'undefined' ||
        subCollectionKeys.length === 0
      ) {
        return resolve({});
      }
      const { getCollection } = getFirestoreProviders;
      const collections = await subCollectionKeys.map(async (key: string) => {
        const subCollection = await getCollection()
          .doc(id)
          .collection(key)
          .get();
        const promises = await subCollection.docs.map((doc: Object) =>
          this.getExpandedDocument(
            doc,
            getFirestoreProviders,
            collectionOptions,
          ),
        );

        const firebaseObj = await Promise.all(promises);
        const fromFirebase = fromFirebaseObj(firebaseObj);

        return { [key]: fromFirebase } || {};
      });
      const validCollections = await Promise.all(collections);

      return resolve(Object.assign({}, ...validCollections));
    });

    return subCollectionPromise;
  };
}

export default new CollectionDenormalizer();
