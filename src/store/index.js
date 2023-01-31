import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loaderReducer } from '../models/loaderModel';
import { fileReducer, fileUploadRootSaga } from '../models/fileUploadModel';

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'development') {
    composeEnhancers = compose;
}

export const store = createStore(
    combineReducers({
      file: fileReducer,
      loader: loaderReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  const rootSagas = [fileUploadRootSaga];
  rootSagas.forEach(sagaMiddleware.run);