import {
  GET_OBJECTS,
  GET_ELEMENTS,
  SUCCESS,
} from '../actions/constants';

const defautState = {
  objects: [],
  elements: {},
};

export default (dataState = defautState, action) => {
  const { type, response } = action;
  switch (type) {
    case GET_OBJECTS + SUCCESS:
      return { ...dataState, objects: response };
    case GET_ELEMENTS + SUCCESS:
      return { ...dataState, elements: response };
    default:
      return dataState;
  }
};
