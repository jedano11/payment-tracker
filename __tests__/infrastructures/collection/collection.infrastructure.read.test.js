import MockFirebase from '../../../__mock__/firebasemock/src/index';
import mockData from '../../../__mock__/data/collectionTestData';
import CollectionInfrastructure from '../../../app/modules/infrastructures/database.infrastructure/collection/collection.infrastructure';

jest.setTimeout(30000);

const firebase = new MockFirebase(mockData);

describe('CollectionInfrastructure Read', () => {
  const READ_KEY = 'testList';
  const collectionInfra = new CollectionInfrastructure(firebase, READ_KEY);

  it('should read all data that have flag deleted=false', async () => {
    const read = await collectionInfra.readCollection();

    expect(read.length).toBe(6);
  });
});
