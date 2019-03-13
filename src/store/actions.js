import {types} from './types';

export function changeStyle(style) {
  return {type: types.CHANGE, ...style};
}