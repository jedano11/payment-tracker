import CollectionDenormalizationOption from './collection.denormalization.option';

export default class CollectionOption {
  subCollectionKeys: Array<string>;

  denormalizationOptions: Array<CollectionDenormalizationOption>;

  constructor(
    subCollectionKeys: Array<string> = [],
    denormalizationOptions: Array<CollectionDenormalizationOption> = [],
  ) {
    this.subCollectionKeys = subCollectionKeys;
    this.denormalizationOptions = denormalizationOptions;
  }
}
