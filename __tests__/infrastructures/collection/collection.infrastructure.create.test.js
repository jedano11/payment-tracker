import MockFirebase from '../../../__mock__/firebasemock/src/index';
import mockData from '../../../__mock__/data/testdata';
import CollectionInfrastructure from '../../../app/infrastructures/database-infrastructure/collection/collection.infrastructure';

const firebase = new MockFirebase(mockData);

describe('CollectionInfrastructure Create', () => {
  const TEST_CREATE_COLLECTION_KEY = 'CREATE_TEST';

  const collectionInfra = new CollectionInfrastructure(
    firebase,
    TEST_CREATE_COLLECTION_KEY,
  );

  it('should not accept number', () => {
    const invalidCreate = collectionInfra.create(
      1234567890,
      TEST_CREATE_COLLECTION_KEY,
    );

    expect(invalidCreate).rejects.toEqual({});
  });

  it('should not accept null', () => {
    const invalidCreate = collectionInfra.create(
      null,
      TEST_CREATE_COLLECTION_KEY,
    );

    expect(invalidCreate).rejects.toEqual({});
  });

  it('should not accept string', () => {
    const invalidCreate = collectionInfra.create(
      '',
      TEST_CREATE_COLLECTION_KEY,
    );

    expect(invalidCreate).rejects.toEqual({});
  });

  it('creates object passed in our db and returns it with valid object properties', async () => {
    const dataToCreate = {
      firstName: 'Jojo',
      lastName: 'Narte',
      status: 'gwapo',
    };
    const createdData = await collectionInfra.create(dataToCreate);

    Object.keys(dataToCreate).forEach((key: string) => {
      expect(createdData).toHaveProperty(key);
    });
  });

  it('creates object passed in our db and returns it with extra properties we need', async () => {
    const dataToCreate = {
      status: 'SECRET',
    };
    const createdData = await collectionInfra.create(dataToCreate);

    expect(createdData).toHaveProperty('createdAtMs');
    expect(createdData).toHaveProperty('updatedAtMs');
    expect(createdData).toHaveProperty('deleted');
    expect(createdData.deleted).toBe(false);
  });

  it('createdAtMs and updatedAtMs are numbers', async () => {
    const dataToCreate = {
      status: 'SECRET',
    };
    const createdData = await collectionInfra.create(dataToCreate);

    expect(typeof createdData.createdAtMs).toBe('number');
    expect(typeof createdData.updatedAtMs).toBe('number');
  });
});
