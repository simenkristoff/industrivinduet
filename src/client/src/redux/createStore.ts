import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, sagaMiddleware, logger];

export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
