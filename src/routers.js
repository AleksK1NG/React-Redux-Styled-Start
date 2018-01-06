import React from 'react';
import { Route, Switch } from 'react-router';

import Welcome from './containers/Welcome';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="*" component={NotFound} />
  </Switch>
);
