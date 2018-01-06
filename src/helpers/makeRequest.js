// @flow
import { set } from 'lodash';
import shortid from 'shortid';
import axios from 'axios';
import types from '../actions/types';

import payloadHandler from '../helpers/payloadHandler';
import getUserToken from '../helpers/getUserToken';

const responsePosition = {};

type Actions = { type: string; payload?: Object | string };
type Dispatch = (action: Actions) => void;

export default (
  api: string, cb?: Function, inputObject: Object = {}, inputFiels: Object,
) => async (dispatch: Dispatch, getState: Function) => {
  try {
    const sortID = shortid.generate();
    const requestReducer = getState().request;

    dispatch({ type: types.REQUEST_PROCESSING_ID, payload: sortID });

    let body = JSON.stringify({ sessionKey: getUserToken(), ...inputObject });

    if (inputFiels) {
      const formData = new FormData();
      for (let i = 0; i < inputFiels.length; i++) { //eslint-disable-line
        formData.append('file', inputFiels[i]);
      }

      formData.append('body', encodeURIComponent(body));
      body = formData;
    }

    const resp = await axios({
      url: api,
      method: 'POST',
      headers: inputFiels || { 'Content-type': 'Application/json' },
      data: body,
    });

    const payload = resp.data;

    // ----- add object payload
    if (payload) set(responsePosition, sortID, payload);
    // ----- add object payload

    const { activeRequest } = requestReducer;

    while (responsePosition[activeRequest[0]]) {
      const processID = activeRequest[0];
      dispatch({ type: types.REQUEST_PROCESSING_ID_SHIFT });

      const response = responsePosition[processID];
      delete responsePosition[processID];

      // TODO: проверить ероркод с бэка
      if (response.errorCode === 0) {
        dispatch({ type: types.UPDATE_DB, payload: response });
      } else {
        payloadHandler(response.errorCode)(dispatch);
      }

      if (cb) cb(response);
    }
  } catch (error) {
    console.warn('@@makeRequest', error);
  }
};
