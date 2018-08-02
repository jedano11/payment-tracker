import MockFirebase from '../../../__mock__/firebasemock/src/index';
import mockData from '../../../__mock__/data/collectionTestData';
import CollectionInfrastructure from '../../../app/modules/infrastructures/database.infrastructure/collection/collection.infrastructure';

const firebase = new MockFirebase(mockData);

describe('CollectionInfrastructure Update', () => {
  const TEST_UPDATE_COLLECTION_KEY = 'testList';

  const collectionInfra = new CollectionInfrastructure(
    firebase,
    TEST_UPDATE_COLLECTION_KEY,
  );

  it('should not accept number', () => {
    const invalidCreate = collectionInfra.update('TEST_ID', 1234567890);

    expect(invalidCreate).rejects.toEqual({});
  });

  it('should not accept null', () => {
    const invalidCreate = collectionInfra.update('TEST_ID', null);

    expect(invalidCreate).rejects.toEqual({});
  });

  it('should not accept string', () => {
    const invalidCreate = collectionInfra.update('TEST_ID', '');

    expect(invalidCreate).rejects.toEqual({});
  });

  it('updated object passed in our db and returns it with valid object properties', async () => {
    const dataToUpdate = {
      breed: 'Pembroke Welsh Corgi',
    };
    const createdData = await collectionInfra.update('item5', dataToUpdate);

    Object.keys(dataToUpdate).forEach((key: string) => {
      expect(createdData).toHaveProperty(key);
    });
  });
});
