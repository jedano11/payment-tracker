import MockFirebase from '../../../__mock__/firebasemock/src/index';
import mockData from '../../../__mock__/data/testdata';
import CollectionInfrastructure, {
  SYSTEM,
  SERVER_REF,
} from '../../../app/modules/infrastructures/database-infrastructure/collection/collection.infrastructure';

const firebase = new MockFirebase(mockData);

describe('Collection infrastructure initialization', () => {
  const TEST_INIT_COLLECTION_KEY = 'INIT_TEST';

  const collectionInfra = new CollectionInfrastructure(
    firebase,
    TEST_INIT_COLLECTION_KEY,
  );

  it('initializes the collection infrastructure', () => {
    expect(collectionInfra instanceof CollectionInfrastructure);
  });

  it('should also create shared document for serverTimeOffset reference', async () => {
    const prefix = `${SYSTEM}/${SERVER_REF}`;
    const docRef = await firebase.firestore().doc(prefix);
    const snapshot = await docRef.get();

    expect(snapshot.exists).toBe(true);
  });
});
