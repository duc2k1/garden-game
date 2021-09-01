export const objectToArray = (object, nameKey = "key") => {
  const objectArr = [];
  for (const key in object) {
    const newObject = { ...object[key], [nameKey]: key };
    if (Object.prototype.hasOwnProperty.call(object, key))
      objectArr.push(newObject);
  }
  return objectArr;
};

export const isEmptyObject = (obj) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};
