import {combineReducers} from 'redux';
import {types} from './types';

export const reducer = combineReducers(
  {
    style: function (state = {}, action) {
      switch (action.type) {
        case types.CHANGE:
          console.log({...state, themeColor: action.themeColor});
          return {
            ...state, themeColor: action.themeColor,
          };
        default:
          return state;
      }
    },
  },
);