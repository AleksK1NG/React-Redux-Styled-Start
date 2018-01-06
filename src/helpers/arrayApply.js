import isObject from 'lodash/isObject';

/* eslint-disable */
export default function (storage, response) {
  const keys = Object.keys(response);
  for (const key of keys) {
    if (storage[key] === undefined) storage[key] = {};
    const newStorageData = {};
    if (isObject(response[key])) {
      for (const element of response[key].data) {
        newStorageData[element[response[key].meta.key]] = { ...element };
      }
      storage[key] = { ...storage[key], ...newStorageData };
    }
  }
  return storage;
};
