import DenormalizationOption from '../../../app/modules/infrastructures/database.infrastructure/utils/denormalization-helpers/collection.denormalization.option';

describe('CollectionDenormalizationOption test', () => {
  it('accepts 3 string arguments', () => {
    const arg1 = 'arg1';
    const arg2 = 'arg2';
    const arg3 = 'arg3';
    const denormalizationOption = new DenormalizationOption(arg1, arg2, arg3);

    expect(denormalizationOption.collectionName).toBe(arg1);
    expect(denormalizationOption.referencingKey).toBe(arg2);
    expect(denormalizationOption.qualifier).toBe(arg3);
  });

  it('3rd argument defaults to == if left empty in constructor', () => {
    const arg1 = 'arg1';
    const arg2 = 'arg2';
    const denormalizationOption = new DenormalizationOption(arg1, arg2);

    expect(denormalizationOption.collectionName).toBe(arg1);
    expect(denormalizationOption.referencingKey).toBe(arg2);
    expect(denormalizationOption.qualifier).toBe('==');
  });
});
