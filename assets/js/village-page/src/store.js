import allReducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {apiMiddleware} from 'redux-api-middleware';

const middleware = [apiMiddleware];

if (process.env.NODE_ENV === 'development') { // Only enable the logger in development
  middleware.push(createLogger());
}

const store = createStore(
  allReducers,
  applyMiddleware(...middleware)
);

export default store;
