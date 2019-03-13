import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducer';
import {state} from './state';
import thunk from 'redux-thunk';

let enhancer = applyMiddleware(thunk);

const store = createStore(
  reducer,
  state,
  enhancer,
);

export default store;