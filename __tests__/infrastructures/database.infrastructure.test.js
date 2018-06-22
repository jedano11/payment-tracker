import MockFirebase from '../../__mock__/firebasemock/src/index';
import DatabaseInfrastructure from '../../app/infrastructures/database-infrastructure/database.infrastructure';
import ErrorMessages from '../../app/infrastructures/error.messages';
import mockData from '../../__mock__/data/testdata';
import mockcontract from '../../__mock__/data/mockcontract';

const firebase = new MockFirebase(mockData);
const databaseInfrastructure = new DatabaseInfrastructure(firebase);
const failingDatabaseInfrastructure = new DatabaseInfrastructure(firebase);

const TEST_ROOT_KEY = 'contractList';
const CREATE_TEST_COLLECTION_KEY = 'createdList';
const TEST_COLLECTION_KEY = 'existingList';

// INIT TESTS
describe('DatabaseInfrastructure init', () => {
  it('initializes our db', async () => {
    const init = await databaseInfrastructure.init(
      mockcontract,
      TEST_ROOT_KEY,
      mockcontract.id,
    );

    expect(init).toEqual(true);
  });

  it('should also set serverTimeOffset when initialized', () => {
    const serverTimeOffset = databaseInfrastructure.timestampOffset;

    expect(typeof serverTimeOffset).toBe('number');
  });
});

// CREATE TESTS
describe('DatabaseInfrastructure create', () => {
  const expectedObject = {
    currentTime: new Date().getTime(),
  };
  let createdData = null;
  const prefix = `${TEST_ROOT_KEY}/${mockcontract.id}`;

  beforeAll(async () => {
    createdData = await databaseInfrastructure.create(
      expectedObject,
      CREATE_TEST_COLLECTION_KEY,
    );
  });

  it('should fail if DatabaseInfrastructure is not yet initialized', () => {
    const failingCreate = failingDatabaseInfrastructure.create(
      expectedObject,
      CREATE_TEST_COLLECTION_KEY,
    );

    expect(failingCreate).rejects.toEqual(new Error(ErrorMessages.noPrefix));
  });

  it('should not accept non-objects', () => {
    const invalidCreate = databaseInfrastructure.create(
      1234567890,
      CREATE_TEST_COLLECTION_KEY,
    );

    expect(invalidCreate).rejects.toEqual({});
  });

  it('creates object passed in our db and returns it with valid properties', () => {
    expect(createdData).toHaveProperty('id');
    expect(createdData).toHaveProperty('currentTime');
    expect(createdData).toHaveProperty('createdAtMs');
    expect(createdData).toHaveProperty('updatedAtMs');
    expect(createdData).toHaveProperty('deleted');
    expect(createdData.deleted).toBe(false);
  });

  it('createdAtMs and updatedAtMs are numbers', () => {
    expect(typeof createdData.createdAtMs).toBe('number');
    expect(typeof createdData.updatedAtMs).toBe('number');
  });

  it('firestore should create document for the object', async () => {
    const { id } = createdData;
    const path = `${prefix}/${CREATE_TEST_COLLECTION_KEY}/${id}`;
    const docRef = await firebase.firestore().collection(path);
    const snapshot = await docRef.get();
    const documentData = snapshot.data();

    expect(documentData.currentTime).toBe(createdData.currentTime);
    expect(documentData.deleted).toBe(false);
  });
});

// READ TESTS
describe('DatabaseInfrastructure read', () => {
  let readData = null;

  beforeAll(async () => {
    readData = await databaseInfrastructure.read(TEST_COLLECTION_KEY);
  });

  it('should fail if DatabaseInfrastructure is not yet initialized', () => {
    const failingRead = failingDatabaseInfrastructure.read(TEST_COLLECTION_KEY);

    expect(failingRead).rejects.toEqual(new Error(ErrorMessages.noPrefix));
  });

  it('if valid collection key is passed it should return an object array', () => {
    expect(typeof readData).toBe('object');
    expect(Array.isArray(readData)).toBe(true);
  });

  it('if the collection key passed corresponds to an empty map it should return an empty Array', async () => {
    const invalidRead = await databaseInfrastructure.read('INVALID_KEY');

    expect(Array.isArray(invalidRead)).toBe(true);
    expect(invalidRead).toEqual([]);
  });

  it('should contain the exact amount of data in the mock', () => {
    expect(readData.length).toBe(4);
  });

  it('should not contain deleted property', () => {
    readData.forEach(data => expect(data).not.toHaveProperty('deleted'));
  });
});

// UPDATE TESTS
describe('DatabaseInfrastructure update', () => {
  const ID_TO_BE_UPDATED = 'document2';
  const updateProperties = {
    name: 'Updated Name',
    age: 9999,
    isImmortal: true,
  };
  let updateRef = null;

  it('should fail if DatabaseInfrastructure is not yet initialized', () => {
    const failingUpdate = failingDatabaseInfrastructure.update(
      updateProperties,
      TEST_COLLECTION_KEY,
      ID_TO_BE_UPDATED,
    );

    expect(failingUpdate).rejects.toEqual(new Error(ErrorMessages.noPrefix));
  });

  // data initialized in `../../__mock__/data/testdata` see {existingList}
  it('should update/add the specific properties passed', async () => {
    updateRef = await databaseInfrastructure.update(
      updateProperties,
      TEST_COLLECTION_KEY,
      ID_TO_BE_UPDATED,
    );

    expect(updateRef).toHaveProperty('name');
    expect(updateRef).toHaveProperty('age');
    expect(updateRef).toHaveProperty('isImmortal');
  });

  it('should not remove/update properties that are not included in passed object', () => {
    expect(updateRef).toHaveProperty('id');
    expect(updateRef).toHaveProperty('deleted');
  });

  it('updates should be written into the firebase document', async () => {
    const { id } = mockcontract;
    const path = `${TEST_ROOT_KEY}/${id}/${TEST_COLLECTION_KEY}/${ID_TO_BE_UPDATED}`;
    const readRef = await firebase
      .firestore()
      .doc(path)
      .get();

    const data = readRef.data();

    expect(data).toHaveProperty('name', updateProperties.name);
    expect(data).toHaveProperty('age', updateProperties.age);
    expect(data).toHaveProperty('isImmortal', updateProperties.isImmortal);
  });
});

// DELETE TESTS
describe('DatabaseInfrastructure delete', () => {
  let readData = null;
  const ID_TO_BE_DELETED = 'document3';

  // data initialized in `../../__mock__/data/testdata` see {existingList}
  beforeAll(async () => {
    readData = await databaseInfrastructure.read(TEST_COLLECTION_KEY);
    expect(readData.length).toBe(4);
    readData.forEach(data => expect(data).not.toHaveProperty('deleted'));
  });

  it('if document exist it should delete normally', async () => {
    const deleteRef = await databaseInfrastructure.delete(
      TEST_COLLECTION_KEY,
      ID_TO_BE_DELETED,
    );

    expect(deleteRef).toBe(true);
  });

  it('deleted object will not be included in read queries', async () => {
    const readAfterDelete = await databaseInfrastructure.read(
      TEST_COLLECTION_KEY,
    );

    expect(readAfterDelete).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          id: ID_TO_BE_DELETED,
        }),
      ]),
    );
  });

  it('read count should be decreased', async () => {
    const readAfterDelete = await databaseInfrastructure.read(
      TEST_COLLECTION_KEY,
    );

    expect(readAfterDelete.length).toBe(3);
  });

  it('should handle invalid id', () => {
    const failingDelete = databaseInfrastructure.delete(
      TEST_COLLECTION_KEY,
      'INVALID_ID',
    );

    expect(failingDelete).rejects.toEqual(new Error(ErrorMessages.noReference));
  });

  it('should handle already deleted id', () => {
    const alreadyExistingIdDelete = databaseInfrastructure.delete(
      TEST_COLLECTION_KEY,
      'INVALID_ID',
    );

    expect(alreadyExistingIdDelete).rejects.toEqual(
      new Error(ErrorMessages.alreadyDeleted),
    );
  });

  it('should fail if DatabaseInfrastructure is not yet initialized', () => {
    const failingDelete = failingDatabaseInfrastructure.delete(
      TEST_COLLECTION_KEY,
      ID_TO_BE_DELETED,
    );

    expect(failingDelete).rejects.toEqual(new Error(ErrorMessages.noPrefix));
  });
});
