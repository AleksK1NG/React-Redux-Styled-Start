// @flow
import types from '../actions/types';

export default (errorCode: Number) => (dispatch: Function) => (
  dispatch({
    type: types.SERVER_STATUS_CODE,
    payload: errorCode,
  })
);
