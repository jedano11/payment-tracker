import CollectionOptions from '../../../app/modules/infrastructures/database.infrastructure/utils/denormalization-helpers/collection.option';
import DenormalizationOption from '../../../app/modules/infrastructures/database.infrastructure/utils/denormalization-helpers/collection.denormalization.option';

describe('CollectionOptions constructor test', () => {
  it('should accept an array of string and an array of CollectionDenormalizationOption as constructor args', () => {
    const testArrayOfString = ['Batman', 'Superman', 'Robin'];
    const testArrayOfCollectionDenormalizationOption = [
      new DenormalizationOption('superheroes', 'superherolist', '=='),
      new DenormalizationOption('villains', 'villainlist', '>='),
    ];
    const testColOption = new CollectionOptions(
      testArrayOfString,
      testArrayOfCollectionDenormalizationOption,
    );

    expect(testColOption.subCollectionKeys).toBe(testArrayOfString);
    expect(testColOption.denormalizationOptions).toBe(
      testArrayOfCollectionDenormalizationOption,
    );
  });

  it('should accept empty arrays as constructor arguments', () => {
    const testEmptyArgOption = new CollectionOptions([], []);

    expect(testEmptyArgOption.subCollectionKeys).toEqual([]);
    expect(testEmptyArgOption.denormalizationOptions).toEqual([]);
  });
});
