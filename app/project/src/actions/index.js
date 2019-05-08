import axios from 'axios';
import { push } from 'react-router-redux';

import {
  GET_OBJECTS,
  GET_ELEMENTS,
  START, SUCCESS, FAIL,
} from './constants';


const mainApi = 'http://localhost:3000/api/';

export function getObjects(data = {}) {
  const apiUrl = 'objects/';
  return (dispatch, getState) => {
    dispatch({
      type: GET_OBJECTS + START,
      payload: { data },
    });

    return (axios.get(`${mainApi}${apiUrl}`)
      .then((response) => {
        dispatch({
          type: GET_OBJECTS + SUCCESS,
          payload: { data },
          response: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_OBJECTS + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}

export function getElements(data = {}) {
  const apiUrl = 'elements/';
  return (dispatch, getState) => {
    dispatch({
      type: GET_ELEMENTS + START,
      payload: { data },
    });

    return (axios.get(`${mainApi}${apiUrl}`)
      .then((response) => {
        dispatch({
          type: GET_ELEMENTS + SUCCESS,
          payload: { data },
          response: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ELEMENTS + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}
