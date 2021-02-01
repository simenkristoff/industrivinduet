import { applyMiddleware, createStore, compose, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Persistor, persistStore } from 'redux-persist';

import { rootSaga, persistentReducer } from './ducks';
import sagaMiddleware from './middlewares/sagas';
import { IApplicationState } from './interface';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

interface IStore {
  store: Store<IApplicationState>;
  persistor: Persistor;
}

export default function configureStore(initialState: IApplicationState): IStore {
  const middlewares = [thunk, sagaMiddleware, logger];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(persistentReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  return { store, persistor };
}
