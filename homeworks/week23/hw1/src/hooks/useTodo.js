import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, selectTodos } from '../redux/selectors';
import { addTodo, toggleTodoState, deleteTodo, clearComplete, updateTodo, changeFilter } from '../redux/actions';

const writeTodosToLocalStorage = ( todos ) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodo() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const [value, setValue] = useState('');
  const handleInputChange = e => setValue(e.target.value);
  const handleChangeFilter = type => dispatch(changeFilter(type));

  useEffect(() => writeTodosToLocalStorage(todos), [todos]);
  
  const handleCreateTodo = () => {
    dispatch(addTodo(value));
    setValue('');
  }
  const handleToggleIsDone = id => dispatch(toggleTodoState(id));
  const handleDeleteTodo = id => dispatch(deleteTodo(id));
  const handleClearComplete = () => dispatch(clearComplete());
  const handleUpdateTodo = (id, value) => dispatch(updateTodo(id, value));

  return {
    value,
    todos,
    filter,
    handleInputChange,
    handleToggleIsDone,
    handleCreateTodo,
    handleDeleteTodo,
    handleUpdateTodo,
    handleClearComplete,
    handleChangeFilter
  }
}