import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';

import Routers from './routers';

import { store, history } from './store/configureStore';

import StyleConfig from './styled-components/theme';

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={StyleConfig}>
        <Routers />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);
