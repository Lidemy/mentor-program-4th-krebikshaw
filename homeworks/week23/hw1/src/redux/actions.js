import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_COMPLETE, UPDATE_TODO, CHANGE_FILTER } from './actionTypes';

export function addTodo(value) {
  return {
    type: ADD_TODO,
    payload: {
      content: value
    }
  };
};

export function toggleTodoState(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    }
  };
};

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    }
  };
};

export function clearComplete() {
  return {
    type: CLEAR_COMPLETE
  };
};

export function updateTodo(id, value) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      value
    }
  };
};

export function changeFilter(type) {
  return {
    type: CHANGE_FILTER,
    payload: {
      type
    }
  };
};