import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const logger = createLogger();
  let store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, logger)));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers'); // eslint-disable-line
      store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

export const store = configureStore();
export const history = createHistory();
