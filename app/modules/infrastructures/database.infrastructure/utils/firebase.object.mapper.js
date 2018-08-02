export const fromFirebaseObj = (object: Object) => {
  const keys = Object.keys(object);

  return keys.map((key: string) => {
    const element = object[key];

    if (Reflect.has(element, 'deleted')) {
      Reflect.deleteProperty(element, 'deleted');
    }

    return element;
  });
};

export const toFirebaseObj = (array: Array<any>) => {
  if (!Array.isArray(array)) {
    return array;
  }

  const obj = {};

  array.forEach((element: Object) => {
    obj[element.id] = { ...element, deleted: false };
  });

  return obj;
};
