export default class CollectionDenormalizationOption {
  collectionName: string;

  referencingKey: string;

  qualifier: string;

  constructor(
    collectionName: string,
    referencingKey: string,
    qualifier: string = '==',
  ) {
    this.collectionName = collectionName;
    this.referencingKey = referencingKey;
    this.qualifier = qualifier;
  }
}
