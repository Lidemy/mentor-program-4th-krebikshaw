import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_COMPLETE, UPDATE_TODO } from '../actionTypes';

let todoId = 1;
let todoData = JSON.parse(window.localStorage.getItem('todos')) || '';
let initialState = {
  todos: [
    {
      id: 0,
      content: 'new todo',
      isDone: false
    }
  ]
}

if (todoData && todoData.length !== 0) {
  initialState = { todos: todoData }
  todoId = todoData[todoData.length - 1].id + 1
}

export default function todoReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false
          }
        ],
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone
          }
        })
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
    case CLEAR_COMPLETE:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.isDone)
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload.id) return todo
          return {
            ...todo,
            content: action.payload.value
          }
        })
      }
    default:
      return state;
  }
}