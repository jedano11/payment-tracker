import DenormalizationOption from './collection.denormalization.option';
import ReferenceResolver from './document.reference.resolver';
import { fromFirebaseObj } from '../firebase.object.mapper';
import CollectionOption from './collection.option';

class CollectionDenormalizer {
  getData = async (
    document: Object,
    getInfrastructureHelpers: Object,
    collectionOptions: CollectionOption,
  ) => {
    const data = document.data();
    const { id } = document;
    const subCollections = await this.getSubCollections(
      id,
      getInfrastructureHelpers,
      collectionOptions,
    );
    const references = await ReferenceResolver.getReferencedData(data);
    const denormalizations = await this.denormalize(
      id,
      getInfrastructureHelpers,
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
    infrastructureHelpers: Object,
    collectionOptions: CollectionOption,
  ) => {
    const { denormalizationOptions } = collectionOptions;
    const { getCollection, getStore } = infrastructureHelpers;

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

            const promises = await snapshot.docs.map((obj: Object) =>
              this.getData(obj, infrastructureHelpers, collectionOptions),
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

  getReferencedFields = (data: Object): Promise<any> => {
    const denormalizationPromise = new Promise(async (resolve: Function) => {
      const { refs } = data;

      if (typeof refs === 'undefined') {
        resolve({});
      }

      const denormalizations = await Object.keys(refs).map(
        async (key: string) => {
          const field = await refs[key].get();
          const fieldData = await field.data();

          return { [key]: fieldData };
        },
      );
      const promisedDenormalizations = await Promise.all(denormalizations);
      const denormalized = Object.assign({}, ...promisedDenormalizations);

      resolve(denormalized);
    });

    return denormalizationPromise;
  };

  getSubCollections = (
    id: string,
    infrastructureHelpers: Object,
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
      const { getCollection } = infrastructureHelpers;
      const collections = await subCollectionKeys.map(async (key: string) => {
        const subCollection = await getCollection()
          .doc(id)
          .collection(key)
          .get();
        const promises = await subCollection.docs.map((obj: Object) =>
          this.getData(obj, infrastructureHelpers, collectionOptions),
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
