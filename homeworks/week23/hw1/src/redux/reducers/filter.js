import { CHANGE_FILTER } from '../actionTypes';

let initialState = { filter: 'all' };

export default function filterReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload.type
      }
    default:
      return state
  }
}