import { mapValues } from 'lodash';

const types = mapValues({
  REQUEST_PROCESSING_ID: 1,
  REQUEST_PROCESSING_ID_SHIFT: 1,
}, (value, key) => key);

export default types;
