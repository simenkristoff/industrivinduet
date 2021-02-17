import { applyMiddleware, createStore, compose, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { IApplicationState } from '@/types';

import { rootSaga, persistentReducer } from './ducks';
import sagaMiddleware from './middlewares/sagas';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(initialState: IApplicationState): Store<IApplicationState> {
  const middlewares = [thunk, sagaMiddleware, logger];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(persistentReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
