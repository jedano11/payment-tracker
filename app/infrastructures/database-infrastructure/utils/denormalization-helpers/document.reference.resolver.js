class ReferenceResolver {
  getReferencedData = (data: Object): Promise<any> => {
    const denormalizationPromise = new Promise(async (resolve: Function) => {
      if (typeof data === 'undefined') {
        return resolve({});
      }
      const refObject = data.refs;

      if (typeof refObject === 'undefined' || refObject === null) {
        return resolve({});
      }

      const references = Object.keys(refObject);
      const resolutions = await this.resolveReferences(refObject, references);

      return resolve(resolutions);
    });

    return denormalizationPromise;
  };

  resolveReferences = (
    data: Object,
    references: Array<string>,
  ): Promise<any> => {
    const resolvePromise = new Promise(async (resolve: Function) => {
      const resolvedReferences = await references.map(async (key: string) => {
        const field = await data[key].get();
        const fieldData = await field.data();
        const extraRef = await this.getReferencedData(fieldData);
        const { id } = field;

        if (fieldData) {
          fieldData.id = id;
        }

        return { ...extraRef, [key]: fieldData };
      });

      const promisedDenormalizations = await Promise.all(resolvedReferences);
      const denormalized = Object.assign({}, ...promisedDenormalizations);

      return resolve(denormalized);
    });

    return resolvePromise;
  };
}

export default new ReferenceResolver();
