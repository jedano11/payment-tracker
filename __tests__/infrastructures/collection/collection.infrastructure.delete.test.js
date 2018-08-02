import MockFirebase from '../../../__mock__/firebasemock/src/index';
import mockData from '../../../__mock__/data/collectionTestData';
import CollectionInfrastructure from '../../../app/modules/infrastructures/database.infrastructure/collection/collection.infrastructure';

const firebase = new MockFirebase(mockData);

describe('CollectionInfrastructure Delete', () => {
  const TEST_DELETE_COLLECTION_KEY = 'testList';
  const collectionInfra = new CollectionInfrastructure(
    firebase,
    TEST_DELETE_COLLECTION_KEY,
  );

  beforeAll(async () => {
    const readData = await collectionInfra.readCollection();

    expect(readData.length).toBe(6);
    readData.forEach(data => expect(data).not.toHaveProperty('deleted'));
  });

  it('Object deleted should no longer be queried by CollectionInfrastructure.getCollection', async () => {
    const idToDelete = 'DELETE_THIS';

    await collectionInfra.delete(idToDelete);
    const readRef = await firebase
      .firestore()
      .collection(TEST_DELETE_COLLECTION_KEY)
      .where('deleted', '==', false);

    const snapshot = await readRef.get();
    const { docs } = snapshot;

    expect(snapshot.empty).toBe(false);
    expect(docs.length).toBe(5);

    expect(docs).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          firstName: 'Electra',
        }),
      ]),
    );
  });
});
