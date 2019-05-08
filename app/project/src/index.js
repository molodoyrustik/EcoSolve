import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { routerMiddleware } from 'react-router-redux';

import DevTools from './components/DevTools';
import Client from './client';

import history from './history';
import configureStore from './store';
import { getObjects } from './actions';

const store = configureStore(window.REDUX_INITIAL_STATE, 'browser', routerMiddleware(history));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    document.getElementById('root'),
  );
};

store.dispatch(getObjects())
  .then(() => {
    return render(<Client store={store} history={history}/>);
  });

if (process.env.NODE_ENV !== 'production') {
  ReactDOM.render(<DevTools store={store} />, document.getElementById('dev-tools'));
}

if (module.hot) {
  module.hot.accept();
}
