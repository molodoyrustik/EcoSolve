import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dataReducer from './dataReducer';

export default combineReducers({
  router: routerReducer,
  data: dataReducer,
});
