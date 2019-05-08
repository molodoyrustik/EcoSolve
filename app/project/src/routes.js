import React from 'react';
import { Redirect } from 'react-router-dom';

import Index from './components/templates/pages/Index';
import Detail from './components/templates/pages/Detail';

import NotFound from './components/templates/pages/NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Index,
  },
  {
    path: '/detail/:code',
    exact: true,
    component: Detail,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default Routes;
