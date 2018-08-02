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

      const resolutions = await this.resolveReferences(refObject);

      return resolve(resolutions);
    });

    return denormalizationPromise;
  };

  resolveReferences = (refObject: Object): Promise<any> => {
    const resolvePromise = new Promise(async (resolve: Function) => {
      const references = Object.keys(refObject);
      const resolvedReferences = await references.map(async (key: string) => {
        const doc = await refObject[key].get();
        const docData = doc.data();
        const extraRef = await this.getReferencedData(docData);
        const { id } = doc;

        if (docData) {
          docData.id = id;
        }

        return { ...extraRef, [key]: docData };
      });

      const promisedDenormalizations = await Promise.all(resolvedReferences);
      const denormalized = Object.assign({}, ...promisedDenormalizations);

      return resolve(denormalized);
    });

    return resolvePromise;
  };
}

export default new ReferenceResolver();
